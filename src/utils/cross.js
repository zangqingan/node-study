// 定义一个跨域处理函数
module.exports = (req,res) => {
  // 解决跨域开发环境设置，生产环境谨慎使用
  res.setHeader('Content-Type','application/json;charset=utf8')
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Credentials',true)
  res.setHeader('Access-Control-Allow-Headers','Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.setHeader('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('X-Powered-By','3.2.1')
  if(req.method === "OPTIONS"){
      res.statusCode = 204;
      res.end()
  }
  
}