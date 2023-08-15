import { ipcMain } from "electron";
import { downloadYt } from "../utils/yt-dlp";

// TODO: send
export function registerDownloadYt() {
  ipcMain.on("download:ytDlp", async (_, videoUrl: string) => {
    const result = await downloadYt(videoUrl);
    console.log("result", result);
    return result;
  });
}
