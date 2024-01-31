const { Buffer } = require('node:buffer');

const buff1 = Buffer.from([1,4,'df'])
console.log('buff1',buff1) //buff1 <Buffer 01 04 00>

const bAlloc1 = Buffer.alloc(10); // 创建一个大小为 10 个字节的缓冲区
console.log(bAlloc1); // <Buffer 00 00 00 00 00 00 00 00 00 00>