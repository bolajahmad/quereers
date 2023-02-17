export function createFileFromJSON(data: string, name: string) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const file = new File([blob], name);
  return file;
}
