// 1，引入内置的核心fs模块
// const fs = require("node:fs");
// const asyncFs = require("node:fs/promises");
// const path = require("node:path");
import fs from "node:fs";
import asyncFs from "node:fs/promises";
import path from "node:path";

// 2,引入之后就可以直接使用这个模块提供的api了。
// 目录的读取增删改
// try{
//   fs.mkdirSync('./hello')
//   console.log('创建目录成功');
// }catch(err){
//   console.log(err,'新建目录失败')
//   throw err;
// }
// fs.mkdir('./async',(err) => {
//   if(err) {
//     console.log(err,'新建目录失败')
//     throw err;
//   }
// })
// asyncFs.mkdir('/').then(res => {
//   console.log('res',res)
// })
// try {
//   fs.rmdirSync('./hello')
//   console.log(err,'删除目录成功')
// } catch (err) {
//   console.log(err,'删除目录失败')
//   throw err;
// }
// fs.rmdir('./dd',(err) => {
//   if(err) {
//     console.log(err,'删除目录失败')
//     throw err;
//   }
// })
// asyncFs.rmdir('./async').then(res => {
//   console.log(res,'删除目录成功')
// }).catch(err => {
//   console.log(err,'删除目录失败')
//   throw err;
// })

/**
 * 之后的方法都只学习异步的
 *  fs.readdir('./',{encoding:'buffer',withFileTypes:true},callback)
 * 注意第二个参数是一个对象encoding默认是utf-8可以设置成其它数据输出类型如buffer
 * withFileTypes默认是false，输出结果不填充fs.Dirent对象。
 * return 返回的结果是一个文件名字符串数组
 */
// fs.readdir('./',(err,data) =>{
//     //判断是否读取成功,成功返回结果在回调函数的第二个参数里
//     if(err == null && err ==undefined){
//         console.log(err,'读取成功', data)
//     }else{
//         console.log('read fail!')
//         throw err;
//     }
// })

/**读取文件里的内容，node会缓存整个文件。
 * fs.readFile(path, [options], callback)
 * path:要读取的文件名或者文件描述
 * [options]：可选配置对象，{encoding:"utf-8",flag:"a"}
 * encoding指定读取内容的编码格式字符串格式值，没有指定时默认为null即返回原始的 buffer对象。
 * flag指定读取文件的行为，默认'r'即读取文件内容,'w':即写入内容会覆盖原内容,'a':即追加内容而不是覆盖，如果文件不存在，则创建该文件并写入内容。
 * callback：异步读取文件内容要执行的回调函数，传入两个参数，err读取出错的一个 错误对象，data则是读取文件成功的数据。
 * 经常和path模块一起使用
 */
// const fullFileName1 = path.resolve(__dirname,'../','../','public','files','a.json')
// const fullFileName2 = path.join(__dirname,'../','../','public','files','a.json')
// console.log(fullFileName1)
// console.log(fullFileName2)
// fs.readFile(fullFileName1,{encoding:'utf-8'},(err,data) => {
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log(data.toString())
// })

/**
 * 封装到一个普通函数中（callback方式）获取一个文件的内容  对调地狱  -  callback-hell
 */
// function getFileContent(fileName,callback){
//     const fullFileName = path.resolve(__dirname,'../','../','public','files',fileName)
//     fs.readFile(fullFileName,{encoding:'utf-8'},(err,data) => {
//         if(err){
//             console.error(err)
//             return
//         }
//         // 使用callback调用
//         callback(JSON.parse(data.toString()))
//     })
// }
// getFileContent('a.json',aData =>{
//     console.log('callback:a data',aData)
//     getFileContent(aData.next,bData =>{
//         console.log('callback:b data',bData)
//         getFileContent(bData.next,cData =>{
//             console.log('callback:c data',cData)
//         })
//     })
// })

/**
 * 封装promise 获取文件内容
 */
// function getFileContent(fileName){
//     return new Promise( (resolve,reject) => {
//         const fullFileName = path.resolve(__dirname,'../','../','public','files',fileName)
//         fs.readFile(fullFileName,{encoding:'utf-8'},(err,data) => {
//             if(err){
//                 // 失败执行reject函数
//                 reject(err)
//                 return
//             }
//             // 成功执行resolve
//             resolve(
//                 JSON.parse(data.toString())
//             )
//         })
//     })
// }
// getFileContent('a.json').then( aData => {
//     console.log('promise:a data',aData)
//     return getFileContent(aData.next)
// }).then(bData => {
//     console.log('promise:b.json',bData)
//     return getFileContent(bData.next)
// }).then(cData => {
//     console.log('promise:c.json',cData)
// })

/**
 * fs.writeFile(file,data,[options],callback)
 * 写文件,把新的内容写入文件中，没有返回值或者说返回值是undefined。
 * file:要写入文件的路径位置
 * data:要写入的数据,如果写入文件不存在，先创建再写入数据。
 * [options] ：可选和读取文件的函数一样，默认'w'即写入内容会覆盖原内容。
 * callback：和读取文件的函数一样
 */
// const fullFileName = path.join(__dirname,'../','../','public','readfiletest.txt')
// fs.writeFile(fullFileName,'我是用异步方法新写入的内容它会追加到之前文件内容的后面',{encoding:'utf-8',flag:'a'},(err,data)=>{
//     if(err)throw err
//     console.log('异步方法data写入成功：',data)//undefined
// })

/**
 * fs.appendFile: fs.writeFile的别名
 * 将数据追加到文件，如果文件尚不存在则创建该文件。
 */
// const fullFileName = path.join(__dirname,'../','../','public','readfiletest.txt')
// const data = '/n 我是用appendFile方法新写入的内容它不会覆盖之前文件所有的内容'
// fs.appendFile(
//   fullFileName,
//   data,
//   {encoding:'utf-8'},
//   (err,data) => {
//     if (err) throw err;
//     console.log('数据已追加到文件',data);
// })

/**
 * 文件拷贝的原理是通过fs.readFile从一个文件读取内容，然后通过fs.writeFile将其写入另一个文件。
 * readFile会默认将文件内容全部读取到内存中，然后再写入另一个文件。
 * 但是这种拷贝文件的方式，适用是文件较小时（小于64k）。当大于64k时，会出现性能问题。
 * 通常会希望文件边读取边写入而不是全部读取完到内存中再写入 ，这就需要文件流。
 * 也就是文件较大时应该使用文件流、如读写日志时使用。
 * 步骤是先创建可读流、然后通过管道一点点写入目标文件。
 */
// 定义一个可读流
const fullFileName = path.join(__dirname, "../", "../", "public", "readfiletest.txt");
const readStream = fs.createReadStream(fullFileName, { encoding: "utf-8" });
let data = "";
readStream.on("data", (chunk) => {
  data += chunk;
});
readStream.on("end", () => {
  console.log("data读取结束");
  // 直接写入流
  writeLog(accessLog, data);
});
readStream.on("error", (err) => {
  console.log(err);
});
// 定义一个写入流函数
function createWriteStream(filename) {
  const fullFileName = path.join(__dirname, "../", "../", "public/logs", filename);
  // 写入流
  const writeStream = fs.createWriteStream(fullFileName, { flags: "a", encoding: "utf-8" });
  return writeStream;
}
// 访问日志
const accessLog = createWriteStream("access.log");
// 错误日志
const errorLog = createWriteStream("error.log");

// 定义一个写入函数
function writeLog(writeLogStream, log) {
  writeLogStream.write(`${log}\n`);
}
// 管道写入流
readStream.pipe(errorLog);
