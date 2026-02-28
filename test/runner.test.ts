import assert from "node:assert/strict";
import { resolve } from "node:path";
import test from "node:test";
import { executeCli, CliExecutionError } from "../src/lib/runner";

const nodeBinary = process.execPath;
const fixturesDir = resolve(process.cwd(), "test/fixtures");

test("cli runner parses json stdout", async () => {
  const result = await executeCli({
    cliPath: nodeBinary,
    args: [resolve(fixturesDir, "emit-json.mjs")],
    timeoutMs: 5_000,
  });

  assert.deepEqual(result, { balance_sats: 123 });
});

test("cli runner maps error envelope on non-zero exit", async () => {
  await assert.rejects(
    () =>
      executeCli({
        cliPath: nodeBinary,
        args: [resolve(fixturesDir, "emit-error-envelope.mjs")],
        timeoutMs: 5_000,
      }),
    (error: unknown) => {
      assert.equal(error instanceof CliExecutionError, true);
      const typed = error as CliExecutionError;
      assert.equal(typed.code, "invalid_api_key");
      assert.equal(typed.message, "API key rejected by ZBD API");
      assert.equal(typed.exitCode, 1);
      return true;
    },
  );
});

test("cli runner rejects invalid json", async () => {
  await assert.rejects(
    () =>
      executeCli({
        cliPath: nodeBinary,
        args: [resolve(fixturesDir, "emit-invalid-json.mjs")],
        timeoutMs: 5_000,
      }),
    (error: unknown) => {
      assert.equal(error instanceof CliExecutionError, true);
      const typed = error as CliExecutionError;
      assert.equal(typed.code, "invalid_json");
      return true;
    },
  );
});
