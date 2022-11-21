/**
 * 对node原生模块http进行一个简单的封装，就像express一样
 */
const http = require('http')
const url = require('url')
const path = require('path')
// 定义类
class myHttp{
    constructor(){
        // 创建服务
        this.server = http.createServer()
        // 定义一个对象用来接收use注册的内容
        this.eventList = {}
        // 监听原生的request事件
        this.server.on('request',(req,res) => {
            // 解析路径
            const pathObj = url.parse(req.url)
            // 判断是否已经注册
            if(pathObj.pathname in this.eventList){
                // 存在执行对应的回调
                this.eventList[pathObj.pathname](req,res)
            }else{
                res.setHeader('Content-Type','text/html;charset=utf-8')
                res.end('<h1>404 not found</h1>')
            }
        })

    }
    // 实现路由功能
    use(url,fn){
        // 注册即将其存入对象eventList中
        this.eventList[url] = fn
    }
    // 监听端口
    listen(port,callback){
        this.server.listen(port,callback)
    }
   

}
// 导出
module.exports = myHttp