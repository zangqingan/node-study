// EJS：一款强大的JavaScript模板引擎，它可以帮助我们在HTML中嵌入动态内容。使用EJS，您可以轻松地将Markdown转换为美观的HTML页面。
// Marked：一个流行的Markdown解析器和编译器，它可以将Markdown语法转换为HTML标记。Marked是一个功能强大且易于使用的库，它为您提供了丰富的选项和扩展功能，以满足各种转换需求。
// BrowserSync：一个强大的开发工具，它可以帮助您实时预览和同步您的网页更改。当您对Markdown文件进行编辑并将其转换为HTML时，BrowserSync可以自动刷新您的浏览器，使您能够即时查看转换后的结果。
// const ejs = require("ejs"); // 导入ejs库，用于渲染模板
// const fs = require("node:fs"); // 导入fs模块，用于文件系统操作
// const marked = require("marked"); // 导入marked库，用于将Markdown转换为HTML
// const readme = fs.readFileSync("README.md"); // 读取README.md文件的内容
// const browserSync = require("browser-sync"); // 导入browser-sync库，用于实时预览和同步浏览器
import ejs from "ejs";
import fs from "node:fs";
import path from "node:path";
import browserSync from "browser-sync";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

// 获取 __filename 的 ESM 写法
// const __filename = fileURLToPath(import.meta.url);
// 获取 __dirname 的 ESM 写法
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const fullFileName1 = path.resolve(__dirname, "../", "../", "read.md");
const fullFileName2 = path.resolve(__dirname, "../", "../", "public", "files", "template.ejs");
const readme = fs.readFileSync(fullFileName1); // 读取README.md文件的内容

const openBrowser = () => {
  const browser = browserSync.create();
  browser.init({
    server: {
      baseDir: "./",
      index: "index.html",
    },
  });
  return browser;
};
ejs.renderFile(
  fullFileName2,
  {
    content: marked.parse(readme.toString()),
    title: "markdown to html",
  },
  (err, data) => {
    if (err) {
      console.log(err);
    }
    let writeStream = fs.createWriteStream("index.html");
    writeStream.write(data);
    writeStream.close();
    writeStream.on("finish", () => {
      openBrowser();
    });
  },
);
