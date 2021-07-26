// controller
const {getList,getDetail} = require('../controller/blogController')

// 定义处理路由的函数
const handleBlogRouter = (req,res) => {
  const method = req.method

  // 开始判断路由
  if(method === 'GET' && req.path === '/api/blog/list'){
    const result = getList()
    return result
  }
  //获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail'){
    const result = getDetail()
    return result
  }

  

}

module.exports =  {
  handleBlogRouter
}