import { ipcMain } from "electron";
import { downloadVideoInfo, downloadYt } from "../yt-dlp/yt-dlp";

const videoDownloadKey = "download:ytDlp";
const videoInfoKey = "download:video:info";
const videoResultKey = "download:result";

export function registerDownloadYt() {
  // 主线程监听下载事件
  ipcMain.on(videoDownloadKey, async (event, videoUrl: string) => {
    const videoInfo = await downloadVideoInfo(videoUrl);

    event.sender.send(videoInfoKey, videoInfo);

    await downloadYt(videoUrl, result => {
      // 向渲染线程发送result
      event.sender.send(videoResultKey, result);
    });
  });
}
