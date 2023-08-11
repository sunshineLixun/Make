import { ExecException, exec } from "child_process";

function downloadHandle(error: ExecException | null, stdout: string, stderr: string) {
  if (error) {
    console.error(`执行命令时出错：${error}`);
    return;
  }
  if (stderr) {
    console.error(`yt-dlp 错误信息：${stderr}`);
    return;
  }

  console.log(`下载完成：${stdout}`);
}

/**下载ty-dlp */
export function downloadYtDlp() {
  if (process.platform === "darwin") {
    exec("homebrew install yt-dlp", downloadHandle);
  }
}
