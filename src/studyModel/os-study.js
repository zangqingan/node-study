// 1 引用os模块
const os = require('os')

// 2 使用提供的方法获取系统相关数据
console.log(os.EOL )//一个字符串常量，换行。定义操作系统相关的行末标志：\r\n 在 Windows 系统上。
console.log('主机名:' + os.hostname())
console.log('cpu信息:' + os.cpus())
console.log('操作系统名:' + os.type())
console.log('操作系统平台:' + os.platform())
console.log('内存总量:' + os.totalmem() + '字节')
console.log('空闲总量:' + os.freemem() + '字节')