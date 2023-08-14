import youtubedl from "youtube-dl-exec";

export function downloadYt() {
  youtubedl("https://www.youtube.com/watch?v=ISnxs-NlRYg", {
    writeAutoSub: true,
    writeSub: true,
    convertSubs: "srt",
    output: process.cwd(),
    skipDownload: true
  })
    .then(output => console.log(output))
    .catch(err => console.log(err));
}
