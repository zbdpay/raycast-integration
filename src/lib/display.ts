export function toJsonMarkdown(value: unknown): string {
  return ["```json", JSON.stringify(value, null, 2), "```"].join("\n");
}
