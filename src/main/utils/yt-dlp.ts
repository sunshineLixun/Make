import youtubedl from "youtube-dl-exec";
import createLogger from "progress-estimator";

const logger = createLogger();

export function downloadYt() {
  const promise = youtubedl("https://www.youtube.com/watch?v=ISnxs-NlRYg", {
    writeAutoSub: true,
    writeSub: true,
    convertSubs: "srt",
    output: process.cwd() + "/resources/subtitle",
    format: "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best"
  });

  logger(promise, "下载中...", {
    estimate: 1000 * 60 * 5
  }).then(res => {
    console.log(res);
  });
}
