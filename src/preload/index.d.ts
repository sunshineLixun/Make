import { ElectronAPI } from "@electron-toolkit/preload";
import { CustomApi } from "./index";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: CustomApi;
  }
}
