import path from "node:path";
import fs from "node:fs";
import { execFile, ChildProcess } from "node:child_process";

export let PyExecChild: ChildProcess;

export async function execPy() {
  const pyPath = getPyPath();
  fs.stat(pyPath, err => {
    if (err) {
      console.log(err.message);
    } else {
      PyExecChild = execFile(pyPath, (err, stdout, stderr) => {
        if (err) {
          console.log("执行python文件错误:", err);
        }
        if (stderr) {
          console.log("执行python文件错误:", stderr);
        }

        console.log(stdout);
      });
    }
  });
}

function getPyPath() {
  return path.join(process.cwd(), "/resources", "yt");
}
