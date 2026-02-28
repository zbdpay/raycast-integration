import { ActionPanel, Action, Detail } from "@raycast/api";
import { toJsonMarkdown } from "../lib/display";

interface ResultViewProps {
  title: string;
  data: unknown;
  onBack: () => void;
}

export function ResultView(props: ResultViewProps) {
  return (
    <Detail
      markdown={toJsonMarkdown(props.data)}
      navigationTitle={props.title}
      actions={
        <ActionPanel>
          <Action title="Run Again" onAction={props.onBack} />
          <Action.CopyToClipboard title="Copy JSON" content={JSON.stringify(props.data, null, 2)} />
        </ActionPanel>
      }
    />
  );
}
