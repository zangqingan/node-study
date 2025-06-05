// const os = require("node:os");
// const { exec } = require("child_process");

import os from "node:os";
import { exec } from "child_process";

console.log(os.arch()); // 系统架构
console.log(os.platform()); // 系统平台
console.log(os.release()); // 系统版本
console.log(os.cpus()); // 系统CPU信息
console.log(os.freemem()); // 系统空闲内存
console.log(os.totalmem()); // 系统总内存
console.log(os.homedir()); // 系统用户的主目录
console.log(os.hostname()); // 系统主机名
console.log(os.tmpdir()); // 系统临时目录
console.log(os.type()); // 系统类型名
console.log(os.networkInterfaces()); // 系统网络接口信息

// 例子根据系统类型执行对应脚本
function openBrowser(url) {
  if (os.platform() === "darwin") {
    // macOS
    exec(`open ${url}`); //执行shell脚本
  } else if (os.platform() === "win32") {
    // Windows
    exec(`start ${url}`); //执行shell脚本
  } else {
    // Linux, Unix-like
    exec(`xdg-open ${url}`); //执行shell脚本
  }
}

// Example usage
openBrowser("https://www.juejin.cn");
