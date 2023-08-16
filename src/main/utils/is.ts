import fs from "node:fs";
import { downloadPath } from "./constants";

function getFilePathSubFiles() {
  return fs.readdirSync(downloadPath, "utf-8");
}

export function isExistSubtitle() {
  const files = getFilePathSubFiles();

  if (!files.length) return false;

  return files.filter(filePath => filePath.includes(".srt")).length > 0;
}
