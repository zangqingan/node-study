// const process = require("node:process");
// import process from "node:process";

// 获取环境变量、根据不同的变量值使用不同的配置
if (process.env.NODE_ENV === "production") {
  console.log("生产环境", process.env.NODE_ENV);
} else {
  console.log("非生产环境", process.env);
}
console.log(process.env); // 环境变量
console.log(process.cwd()); // 返回当前工作目录
console.log(process.arch); // 返回操作系统 CPU 架构 跟os.arch 一样
console.log(process.execPath); // 执行的二进制文件路径
console.log(process.pid); // 进程ID
console.log(process.versions); // Node.js版本信息
console.log(process.memoryUsage()); // 用于获取当前进程的内存使用情况。该方法返回一个对象，其中包含了各种内存使用指标，如 rss（Resident Set Size，常驻集大小）、heapTotal（堆区总大小）、heapUsed（已用堆大小）和 external（外部内存使用量）等
console.log(process.argv); // 获取执行进程后面的命令行参数 返回是一个数组
