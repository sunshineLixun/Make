export function stringToArray(str: string): string[] {
  return str
    .trim()
    .split(" ")
    .filter(n => n);
}

export function stringToArrayWithNewLine(str: string): string[] {
  return str.trim().split("\n");
}
