import { ipcMain } from "electron";
import { downloadYt } from "../utils/yt-dlp";

export function registerDownloadYt() {
  // 主线程监听下载事件
  ipcMain.on("download:ytDlp", async (event, videoUrl: string) => {
    downloadYt(videoUrl, result => {
      // 向渲染线程发送result
      event.sender.send("download:result", result);
    });
  });
}
