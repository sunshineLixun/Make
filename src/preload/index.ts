import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

const videoDownloadKey = "download:ytDlp";
const videoInfoKey = "download:video:info";
const videoResultKey = "download:result";

export interface CustomApi {
  downloadYtubeVideo: (videoUrl: string) => void;
  downloadYtVideoProgress: (callback: (event: IpcRendererEvent, result: Record<string, any>) => void) => void;
  downloadYtVideoInfo: (callback: (event: IpcRendererEvent, result: Record<string, any>) => void) => void;
}

// 这里是为渲染线程做的api
// Custom APIs for renderer
const api: CustomApi = {
  downloadYtubeVideo: (videoUrl: string) => ipcRenderer.send(videoDownloadKey, videoUrl),
  downloadYtVideoProgress: callback => ipcRenderer.on(videoResultKey, callback),
  downloadYtVideoInfo: callback => ipcRenderer.on(videoInfoKey, callback)
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
