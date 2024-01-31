// 复制文件
const fs = require('fs')
const path = require('path')

//获取文件路径
const fileName1 = path.resolve(__dirname,'../','../','public','readfiletest.txt')
const fileName2 = path.resolve(__dirname,'../','../','public','writefiletest.txt')


// 读写文件以流的类型
// 创建一个读取流(输入流)对象，第一个水桶
// 调用fs.createReadStream(path,{这里的options就是fs模块中的})
const readStream = fs.createReadStream(fileName1)

let data = ''
// 处理流事件 --> data, end, and error
readStream.on('data', function(chunk) {
    data += chunk;
    console.log('正在读物流数据...')
 });
readStream.on('end',function(){
    console.log('读取数据完毕：',data);

});
readStream.on('error', function(err){
    console.log(err.stack);
});
 
// 定义一个写入流(接收流）对象，另一个水桶，用来接收第一个水桶的水即流数据
// 调用fs.createWriteStream(path,{这里的options就是fs模块中的})
const writeStream = fs.createWriteStream(fileName2)

// 管道 pipe 将可写流绑定到可读流即从一个水桶拷贝复制到另一个水桶，一点一点读取的。
readStream.pipe(writeStream)

 // 处理流事件 --> data, finish, and error
 writeStream.on('finish', function() {
    console.log("写入完成...");
    // 记得关闭读写流
    writeStream.close()
});

writeStream.on('error', function(err){
   console.log(err.stack);
});

