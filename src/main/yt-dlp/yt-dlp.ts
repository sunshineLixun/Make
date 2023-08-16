import youtubedl from "youtube-dl-exec";
import { whisper } from "../whisper/whisper";
import { isExistSubtitle } from "../utils/is";
import { stringToArray, stringToArrayWithNewLine } from "../utils/string";
import { ytVideoPath } from "../utils/constants";

interface DownloadVideoInfo {
  type: "info";
  title: string;
  thumbnail: string;
}

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

export async function downloadVideoInfo(videoUrl: string): Promise<DownloadVideoInfo> {
  const ytRe = await youtubedl(videoUrl, {
    getThumbnail: true,
    getTitle: true,
    skipDownload: true
  });

  // 这里的ytRe 是 string
  const output = stringToArrayWithNewLine(ytRe as any);

  return {
    type: "info",
    title: output[0],
    thumbnail: output[1]
  };
}

export async function downloadYt(
  videoUrl: string,
  progressFn: (result: DownloadSuccessResult | DownloadProgress | DownloadErrorResult) => void
) {
  const ytDownload = youtubedl.exec(videoUrl, {
    writeAutoSub: true,
    writeSub: true,
    convertSubs: "srt",
    output: ytVideoPath,
    format: "mp4/bestvideo/best"
  });

  ytDownload.stdout?.on("data", data => {
    try {
      const buffer = Buffer.from(data, "utf-8");

      let output = stringToArray(buffer.toString());

      if (output.length >= 5) {
        if (output[0] === "[download]" && output[1].includes("%") && parseFloat(output[1]) && output[4] === "at") {
          const result: DownloadProgress = {
            type: "progress",
            progress: parseFloat(output[1])
          };
          progressFn(result);
        }
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
    const isExistSub = isExistSubtitle();

    if (!isExistSub) {
      whisper();
    }

    const result: DownloadSuccessResult = {
      type: "finished",
      isExistSubtitle: isExistSub
    };

    console.log("end", result);

    progressFn(result);
  });

  ytDownload.stdout?.on("close", data => {
    console.log("close", data);
  });
}
