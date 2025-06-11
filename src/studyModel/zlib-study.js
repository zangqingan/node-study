// const zlib = require("node:zlib");
// const fs = require("node:fs");
// const path = require("node:path");
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

// 获取 __filename 的 ESM 写法
const __filename = fileURLToPath(import.meta.url);
// 获取 __dirname 的 ESM 写法
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// gzip压缩
// const gzip = zlib.createGzip()
// const fullFileName = path.join(__dirname,'../','../','public','readfiletest.txt')
// const gFullFileName = path.join(__dirname,'../','../','public','readfiletest.txt.gz')
// const inFile = fs.createReadStream(fullFileName)
// const out = fs.createWriteStream(gFullFileName)

// inFile.pipe(gzip).pipe(out)

// gzip解压
// gunzip = zlib.createGunzip()
// const gFullFileName = path.join(__dirname,'../','../','public','readfiletest.txt.gz')
// const otherFullFileName = path.join(__dirname,'../','../','public','jieya.txt')
// var gInFile = fs.createReadStream(gFullFileName);
// var outFile = fs.createWriteStream(otherFullFileName);

// gInFile.pipe(gunzip).pipe(outFile);

// 无损压缩 deflate
const readStream = fs.createReadStream("index.txt"); // 创建可读流，读取名为 index.txt 的文件
const writeStream = fs.createWriteStream("index.txt.deflate"); // 创建可写流，将压缩后的数据写入 index.txt.deflate 文件
readStream.pipe(zlib.createDeflate()).pipe(writeStream);
// 解压
const readStream2 = fs.createReadStream("index.txt.deflate"); // 创建可读流，读取名为 index.txt.deflate 的文件
const writeStream2 = fs.createWriteStream("index.txt.deflate2"); // 创建可写流，将解压后的数据写入 index.txt.deflate2 文件
readStream2.pipe(zlib.createInflate()).pipe(writeStream2);

// http请求压缩
const server = http.createServer((req, res) => {
  const txt = "hello".repeat(1000);

  //res.setHeader('Content-Encoding','gzip')
  res.setHeader("Content-Encoding", "deflate");
  res.setHeader("Content-type", "text/plan;charset=utf-8");

  // const result = zlib.gzipSync(txt);
  const result = zlib.deflateSync(txt);
  res.end(result);
});

server.listen(3000);
