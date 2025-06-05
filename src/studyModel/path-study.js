// 1 引入
// const path = require("node:path");
import path from "node:path";

// 2 使用
/**
 * path.extname() 方法返回文件的扩展名
 * path.basename() 方法返回 path 的最后一部分,即取最后一层(取文件名)。
 * path.dirname() 方法返回 path 的目录名，去掉最后一层(去掉文件名)
 * path.parse() 方法将一个路径解析为对象格式
 */
const testpath1 = "W:/VSCodeProjects/nodeStudy/readme.md";
console.log("取到文件的扩展名", path.extname(testpath1)); // .md
console.log("取到的是文件名", path.basename(testpath1)); //readme.md
console.log("取到的是文件目录名", path.dirname(testpath1)); //W:/VSCodeProjects/nodeStudy
console.log("将一个路径解析为对象格式", path.parse(testpath1)); //{root: 'W:/',dir: 'W:/VSCodeProjects/nodeStudy', base: 'readme.md',ext: '.md', name: 'readme'}
const testpath2 = "http://img.doutula.com/production/uploads/image/2020/05/21/20200521045427_yIPwpZ.jpg";
console.log("取到文件的扩展名", path.extname(testpath2)); // .jpg
console.log("取到的是文件名", path.basename(testpath2)); // 20200521045427_yIPwpZ.jpg
console.log("取到的是文件目录名", path.dirname(testpath2)); // http://img.doutula.com/production/uploads/image/2020/05/21
console.log("将一个路径解析为对象格式", path.parse(testpath2)); //{root: '',dir: 'http://img.doutula.com/production/uploads/image/2020/05/21', base: '20200521045427_yIPwpZ.jpg',ext: '.jpg', name: '20200521045427_yIPwpZ'}

/**
 * path.resolve() 方法用来拼接路径,将给定的路径序列从右到左进行处理，后面的每个 path 会被追加到前面，直到构造出绝对路径。
 * 如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。
 *
 * path.join() 方法使用平台特定的分隔符作为定界符 Windows系统下是\，而在Linux系统下是/。
 * 将所有给定的 path 片段连接在一起，然后规范化生成的路径。
 *
 * resolve()和join()方法两者是差不多的。
 * __dirname当前文件所在系统的绝对路径
 * __filename 当前文件所在系统的绝对路径加上文件名
 */

const fullFileName1 = path.resolve(__dirname, "../", "../", "public", "readfiletest.txt");
const fullFileName2 = path.join(__dirname, "../", "../", "public", "readfiletest.txt");
console.log("resolve：", fullFileName1);
console.log("join：", fullFileName2);
// 当前文件所在的文件名
console.log("__dirname", __dirname); // E:\Full-stack-Engineer\studyNotes\node-study\src\studyModel
console.log("__filename", __filename); // E:\Full-stack-Engineer\studyNotes\node-study\src\studyModel\path-study.js
