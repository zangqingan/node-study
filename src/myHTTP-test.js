// 自己封装的一个http服务器
const myHttp = require('./http-study2')
// 初始化
const app = new myHttp()


// 路由
app.use('/product',(req,res) => {
  res.setHeader('Content-Type','text/html;charset=utf-8')
  res.end('这是产品页')
})
app.use('/index',(req,res) => {
  res.setHeader('Content-Type','text/html;charset=utf-8')
  res.end("<h1>这是首页</h1>")
})


app.listen(3000,()=>{console.log('server is running on port 3000')})



