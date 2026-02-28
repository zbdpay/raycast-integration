import { Action, ActionPanel, Detail } from "@raycast/api";
import { CliExecutionError } from "../lib/runner";
import { toJsonMarkdown } from "../lib/display";

interface ErrorViewProps {
  title: string;
  error: unknown;
  onBack: () => void;
}

export function ErrorView(props: ErrorViewProps) {
  const payload =
    props.error instanceof CliExecutionError
      ? {
          error: props.error.code,
          message: props.error.message,
          details: props.error.details,
        }
      : {
          error: "unknown_error",
          message: props.error instanceof Error ? props.error.message : String(props.error),
        };

  return (
    <Detail
      markdown={toJsonMarkdown(payload)}
      navigationTitle={props.title}
      actions={
        <ActionPanel>
          <Action title="Back" onAction={props.onBack} />
          <Action.CopyToClipboard title="Copy Error JSON" content={JSON.stringify(payload, null, 2)} />
        </ActionPanel>
      }
    />
  );
}
