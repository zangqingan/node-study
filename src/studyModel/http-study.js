//1, 引入http模块 为浏览器web浏览服务功能
const http = require('http')

//2, 调用内置api createServer()方法创建一个web服务器对象 server(定义这个变量接收)
// const server = http.createServer((req,res) => {
      // 本质上是每当服务器被请求时就会触发request事件函数。
      // 也就是说客户端发送请求时这个回调函数就会被执行，且每次执行都能获得当次请求的相关信息，
      // request客户端请求的信息，response则是服务器返回给客户端的信息
// })

//3, 开启http服务，并监听指定端口
// listen方法有三个参数，第一个为端口号，第二个为主机地址，第三个为回调函数。
// server.listen(3000,'127.0.0.1',()=>{
//     console.log('server is run at port 3000')
// })

// 2，3两步可以串联写创建服务器
http.createServer((req,res)=>{
    console.log(req)
    console.log(res)
    res.write('hello world')
    res.end()


}).listen(5000,'127.0.0.1',(err)=>{
    // 控制台会输出以下信息
    if(err){console.log('服务器出错了，请联系系统管理员',err);}
    console.log('Server running at http://127.0.0.1:5000/');
});

