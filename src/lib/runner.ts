import { spawn } from "node:child_process";
import type { SpawnOptions } from "node:child_process";

export interface CliErrorEnvelope {
  error: string;
  message: string;
  details?: Record<string, unknown>;
}

export class CliExecutionError extends Error {
  readonly code: string;
  readonly details?: Record<string, unknown>;
  readonly exitCode: number;

  constructor(code: string, message: string, exitCode = 1, details?: Record<string, unknown>) {
    super(message);
    this.name = "CliExecutionError";
    this.code = code;
    this.exitCode = exitCode;
    this.details = details;
  }
}

export interface ExecuteCliOptions {
  cliPath: string;
  args: string[];
  env?: NodeJS.ProcessEnv;
  timeoutMs?: number;
  cwd?: string;
}

export async function runZbdw(args: string[], timeoutMs = 30_000): Promise<unknown> {
  const { readPreferences } = await import("./preferences");
  const prefs = readPreferences();
  const cliPath = prefs.cliPath ?? "zbdw";
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    ZBD_API_KEY: prefs.apiKey,
  };

  if (prefs.apiBaseUrl) {
    env.ZBD_API_BASE_URL = prefs.apiBaseUrl;
  }

  if (prefs.aiBaseUrl) {
    env.ZBD_AI_BASE_URL = prefs.aiBaseUrl;
  }

  return executeCli({
    cliPath,
    args,
    env,
    timeoutMs,
  });
}

export function executeCli(options: ExecuteCliOptions): Promise<unknown> {
  const timeoutMs = options.timeoutMs ?? 30_000;

  return new Promise((resolve, reject) => {
    const spawnOptions: SpawnOptions = {
      env: options.env,
      cwd: options.cwd,
      stdio: ["ignore", "pipe", "pipe"],
      shell: false,
    };

    const child = spawn(options.cliPath, options.args, spawnOptions);
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
    }, timeoutMs);

    if (!child.stdout || !child.stderr) {
      clearTimeout(timeout);
      reject(new CliExecutionError("spawn_failed", "CLI process streams are unavailable", 1));
      return;
    }

    child.stdout.on("data", (chunk: Buffer) => {
      stdoutChunks.push(chunk);
    });

    child.stderr.on("data", (chunk: Buffer) => {
      stderrChunks.push(chunk);
    });

    child.on("error", (error) => {
      clearTimeout(timeout);
      reject(new CliExecutionError("spawn_failed", error.message, 1));
    });

    child.on("close", (code, signal) => {
      clearTimeout(timeout);

      if (signal) {
        reject(new CliExecutionError("cli_signal", `CLI terminated by signal: ${signal}`, 1));
        return;
      }

      const stdout = Buffer.concat(stdoutChunks).toString("utf8").trim();
      const stderr = Buffer.concat(stderrChunks).toString("utf8").trim();

      let parsed: unknown;
      if (stdout.length > 0) {
        try {
          parsed = JSON.parse(stdout) as unknown;
        } catch {
          reject(
            new CliExecutionError("invalid_json", "CLI returned non-JSON stdout", code ?? 1, {
              stdout,
              stderr,
            }),
          );
          return;
        }
      } else {
        parsed = null;
      }

      const exitCode = typeof code === "number" ? code : 1;
      if (exitCode === 0) {
        resolve(parsed);
        return;
      }

      const envelope = normalizeEnvelope(parsed);
      if (envelope) {
        reject(new CliExecutionError(envelope.error, envelope.message, exitCode, envelope.details));
        return;
      }

      reject(
        new CliExecutionError("cli_nonzero", "CLI exited with non-zero status", exitCode, {
          stdout,
          stderr,
        }),
      );
    });
  });
}

function normalizeEnvelope(value: unknown): CliErrorEnvelope | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  if (typeof record.error !== "string" || typeof record.message !== "string") {
    return null;
  }

  const details =
    record.details && typeof record.details === "object" ? (record.details as Record<string, unknown>) : undefined;

  return {
    error: record.error,
    message: record.message,
    details,
  };
}
