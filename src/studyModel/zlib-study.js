const zlib = require('node:zlib')
const fs = require('node:fs')
const path = require('node:path')

// 压缩
// const gzip = zlib.createGzip()
// const fullFileName = path.join(__dirname,'../','../','public','readfiletest.txt')
// const gFullFileName = path.join(__dirname,'../','../','public','readfiletest.txt.gz')
// const inFile = fs.createReadStream(fullFileName)
// const out = fs.createWriteStream(gFullFileName)

// inFile.pipe(gzip).pipe(out)

// 解压
// gunzip = zlib.createGunzip()
// const gFullFileName = path.join(__dirname,'../','../','public','readfiletest.txt.gz')
// const otherFullFileName = path.join(__dirname,'../','../','public','jieya.txt')
// var gInFile = fs.createReadStream(gFullFileName);
// var outFile = fs.createWriteStream(otherFullFileName);

// gInFile.pipe(gunzip).pipe(outFile);


// 服务端开启gzip压缩

