import { app } from "electron";
import fs from "node:fs";
import youtubedl from "youtube-dl-exec";
import { whisper } from "./whisper";

const downloadPath = app.getAppPath() + "/download/" + "%(id)s.%(ext)s";

interface DownloadErrorResult {
  type: "failed";
}

interface DownloadSuccessResult {
  type: "finished";
  // 是否存在字幕
  isExistSubtitle: boolean;
}

interface DownloadProgress {
  type: "progress";
  // 下载进度
  progress: number;
}

export function downloadYt(
  videoUrl: string,
  progressFn: (result: DownloadSuccessResult | DownloadProgress | DownloadErrorResult) => void
) {
  const ytDownload = youtubedl.exec(videoUrl, {
    writeAutoSub: true,
    writeSub: true,
    convertSubs: "srt",
    output: downloadPath,
    format: "mp4/bestvideo/best"
  });

  ytDownload.stdout?.on("data", data => {
    try {
      const buffer = Buffer.from(data, "utf-8");

      console.log(buffer.toString());

      let output = buffer
        .toString()
        .trim()
        .split(" ")
        .filter(n => n);

      // console.log(output);

      if (output[0] === "[download]" && parseFloat(output[1])) {
        const result: DownloadProgress = {
          type: "progress",
          progress: parseFloat(output[1])
        };
        progressFn(result);
      }
    } catch (err) {
      console.log("parse error", err);
      const result: DownloadErrorResult = {
        type: "failed"
      };
      progressFn(result);
    }
  });

  ytDownload.stdout?.on("end", () => {
    const isExistSub = existSubtitle();

    if (!isExistSub) {
      whisper();
    }

    const result: DownloadSuccessResult = {
      type: "finished",
      isExistSubtitle: isExistSub
    };
    progressFn(result);
  });

  ytDownload.stdout?.on("close", data => {
    console.log("close", data);
  });
}

function existSubtitle() {
  return fs.existsSync(downloadPath);
}
