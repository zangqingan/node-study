/**
 * Stream模块 是一个抽象接口，Nodejs有四种流类型：
 *  Readable - 可读操作。Writable - 可写操作。Duplex - 可读可写操作。Transform - 操作被写入数据，然后读出结果。
 *  Nodejs中有很多模块对象实现了这个接口，例如，对http 服务器发起请求的request，response 对象就都是一个 Stream，还有stdout（标准输出）。 
 * 所有的 Stream 对象又都是 EventEmitter 的实例，常用的事件有：
 * end - 没有更多的数据可读时触发。
 * error - 在接收和写入过程中发生错误时触发。
 * data - 当有数据可读时持续触发。
 * finish - 所有数据已被写入到底层系统时触发。
 * 
 * 
 */

// IO包括网络IO和文件IO，相比于cpu计算和内存的读写，IO操作速度很慢，
//当要操作的数据很大时应该使用stream 即数据流的意思

//标准输入输出流即当一个流是可读写的时就可以通过 pipe()方法即管道方法将读取流通过管道像水流一样流到写入流中。
//即从一个流中获取数据并将这个流的数据传递到另外一个流中。
//process.stdin获取数据输入，通过pipe管道传递给process.stdout输出。
// process.stdin.pipe(process.stdout)

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

// 从一个水桶拷贝复制到另一个水桶，一点一点读取的。
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

