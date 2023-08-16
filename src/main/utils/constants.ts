import { app } from "electron";

export const downloadPath = app.getAppPath() + "/download/";

export const ytVideoPath = downloadPath + "%(id)s.%(ext)s";
