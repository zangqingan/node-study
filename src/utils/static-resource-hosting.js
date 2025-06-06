const http = require("http");
const fs = require("fs");
const path = require("path");

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 获取请求的URL、请求方法
  const { url, method } = req;

  // 解析请求的文件路径
  // 文件夹路径，这里假设是 'public'
  // const filePath = path.join('./public', url);
  const filePath = path.join(process.cwd(), "../", url); // 获取文件路径
  console.log(process.cwd()); // 这个目录是相对于node启动目录的。
  console.log(url);
  console.log(filePath);

  // 请求静态资源
  if (method === "GET" && url.startsWith("/public")) {
    // 检查文件是否存在
    fs.access(filePath, (err) => {
      if (err) {
        // 如果文件不存在，返回404错误
        res.statusCode = 404;
        res.end(`File ${url} not found!`);
        return;
      }

      // 打开文件
      fs.readFile(filePath, (fileErr, data) => {
        if (fileErr) {
          // 如果读取文件时出错，返回500错误
          res.statusCode = 500;
          res.end(`Error reading file from ${filePath}`);
          return;
        }

        // 设置响应头，例如类型为文本HTML
        const contentType = getContentType(filePath);
        res.setHeader("Content-Type", contentType);

        // 发送文件内容
        res.end(data);
      });
    });
  }
});

//
// 根据文件扩展名获取Content-Type - 可以适合用 mime 这个库来实现。
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
    case ".htm":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

// 启动服务器
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
