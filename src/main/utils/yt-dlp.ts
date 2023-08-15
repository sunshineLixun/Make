import youtubedl from "youtube-dl-exec";

interface DownloadResult {
  type: "finished";
}

interface DownloadProgress {
  type: "progress";
  // 下载进度
  progress: number;
  // 总文件大小
  size: string;
  // 下载速度
  speed: string;
  // 预估下载需要的时间
  estimated: string;
}

export function downloadYt(videoUrl: string): Promise<DownloadResult | DownloadProgress> {
  return new Promise((resolve, reject) => {
    const ytDownload = youtubedl.exec(videoUrl, {
      writeAutoSub: true,
      writeSub: true,
      convertSubs: "srt",
      output: process.cwd() + "/resources/subtitle",
      format: "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best"
    });

    ytDownload.stdout?.on("data", data => {
      try {
        const buffer = Buffer.from(data, "utf-8");

        let output = buffer
          .toString()
          .trim()
          .split(" ")
          .filter(n => n);

        // console.log(output);

        if (output[0] === "[download]" && parseFloat(output[1])) {
          const result: DownloadProgress = {
            type: "progress",
            progress: parseFloat(output[1]),
            size: output[4],
            speed: output[6],
            estimated: output[8]
          };
          resolve(result);
        }
      } catch (err) {
        console.log("parse error", err);
        reject(err);
      }
    });

    ytDownload.stdout?.on("end", () => {
      const result: DownloadResult = {
        type: "finished"
      };
      resolve(result);
    });

    ytDownload.stdout?.on("close", data => {
      console.log("close", data);
    });
  });
}
