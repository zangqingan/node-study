// controller
const {getList,getDetailById,newBlog,updateBlog,delBlog} = require('../controllers/blogController')
// 获取请求体数据
const {getPostData} = require('../utils/tool')
// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
      return '尚未登录'
  }
}

// 定义处理路由的函数，也可以写成class的形式。
const handleBlogRouter = (req,res) => {
  const method = req.method
  // 从query中获取id
  const id = req.query.id 

  // 1.获取产品列表
  if(method === 'GET' && req.path === '/api/blog/list'){
    const result = getList()
    return result
  }
  // 2.获取指定id的产品
  if(method === 'GET' && req.path === '/api/blog/detail'){

    const result = getDetailById(id)
    return result
  }
  // 3.更新产品信息
  if(method === 'POST' && req.path === '/api/blog/update'){
    //post请求时处理数据
  const resultData =  getPostData(req).then(postData => {
      const result = updateBlog(id,postData)
      return result
    })
    return resultData
  }
  // 4.新建产品
  if(method === 'POST' && req.path === '/api/blog/new'){  
    //post请求时处理数据
    const resultData =  getPostData(req).then(postData => {
      const result = newBlog(postData)
      return result
    })
    return resultData

  }
  // 5.删除一个产品
  if(method === 'DELETE' && req.path === '/api/blog/del'){ 
    const result = delBlog(id)
    return result
  }

  

}

module.exports =  {
  handleBlogRouter
}