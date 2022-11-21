const {userLogin,createUser} = require('../controllers/userController')
// 获取请求体数据
const {getPostData} = require('../utils/tool')
const handleUserRouter = (req,res) => {
  // 获取请求的 method，
  const method = req.method
  // 1。登陆接口
  if(method === 'POST' && req.path === '/api/user/login'){
    
    const result = getPostData(req).then(postData => {
      const result = userLogin(postData,req)
      return result
    })
    return result
  }
  // 2。新建用户接口
  if(method === 'POST' && req.path === '/api/user/createUser'){
    const result = getPostData(req).then(postData => {
      const result = createUser(postData)
      return result
    })
    return result
  }

}

module.exports = {
  handleUserRouter
}