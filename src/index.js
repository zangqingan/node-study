const http = require('http')

// 引入配置
const {PORT,HOSTNAME} = require('./config/config')

// 引入路由
const {handleBlogRouter }= require('./router/blogRouter')
const {handleProductRouter }= require('./router/productRouter')
const {handleUserRouter }= require('./router/userRouter')
const {getCookieExpires }= require('./utils/tool')

// 查询字符串
const querystring = require('querystring')

// 数据库连接
require('./config/mongoConnect')()

http.createServer( (req,res) => {
  // 设置数据返回格式为json
  // 解决跨域开发环境设置，生产环境谨慎使用
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3001"); // 设置可访问的源
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"); 
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("content-type", "application/json")
  // 拆分前端路由和查询字符串
  const url = req.url
  req.path = url.split('?')[0]
  // 获取查询字符串并解析为对象格式
  req.query = querystring.parse(url.split('?')[1])

  // 获取和解析cookie，判断登陆状态。
  req.cookie = {} //设置cookie为对象模式
  const cookieStr = req.headers.cookie || '' //cookie格式：k1=v1;k2=v2;
  cookieStr.split(';').forEach(item => {//按 ;号拆分cookie并遍历得到每一次项 k1=v1
      // 判断item有没有即判断cookie有没有
      if(!item){return}
      const arr = item.split('=') //对每一项按=号继续拆分取得key和value
      const key = arr[0].trim()//trim()去除空格
      const val = arr[1].trim()
      // 设置cookie挂载到req.cookie上
      req.cookie[key] = val
  })

  // console.log('req.cookie is',req.cookie) 打印测试
  // 判断cookie是否存在
  let needSetCookie = false
  let userId = req.cookie.userid
  // 加上 session
  const SESSION_DATA = {}
  // 先判断有没有cookie
  if (userId) {
    //检查session中是否存在cookie中的userid
    if(!SESSION_DATA[userId]){
      //不存在初始化一下
      SESSION_DATA[userId] = {}
    }
  }else{
  // 没有userId说明需要设置session，并修改needSetCookie的状态，并设置userId
    needSetCookie=true
    //如果没有userId，则随机生成
    userId =`${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]//赋值挂载到req.session上


  // 处理博客路由
  const data = handleBlogRouter(req,res)
  if(data){
    res.end(JSON.stringify(data))
    return
  }

  // 处理产品路由需登陆
  const result = handleProductRouter(req,res)
  if(result){
    result.then(data => {
       // 判断是否需要设置cookie
       if(needSetCookie){
        // 操作cookie,httpOnly设置浏览器不能修改cookie
        res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
      }
      res.end(JSON.stringify(data))
    })
    return
  }

  // 用户登陆路由
  const checkMsg = handleUserRouter(req,res)
  if(checkMsg){
    checkMsg.then(data => {
      // 判断是否需要设置cookie
      if(needSetCookie){
        // 操作cookie,httpOnly设置浏览器不能修改cookie
        res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
      }
      res.end(JSON.stringify(data))
    })
    return
  }


  // 错误处理，在都没命中路由时返回404
  res.writeHead(404,{"Content-Type":"text/plain"})
  res.write("404 not found")
  res.end()

}).listen(PORT,HOSTNAME,err => {
  if(err){console.log(`服务器出错，请联系系统管理员${err}`)}
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
})









