// controller
const {getProductList,getProductById,updateProductById,newProduct,delProductById} = require('../controller/productController')
// 获取请求体数据
const {getPostData} = require('../utils/tool')
const handleProductRouter = (req,res) => {
  const method = req.method
  // 从query中获取id
  const id = req.query.id 

  // 1.获取产品列表
  if(method === 'GET' && req.path === '/api/product/list'){
    const result = getProductList()
    return result
  }
  // 2.获取指定id的产品
  if(method === 'GET' && req.path === '/api/product/detail'){
    const result = getProductById(id)
    return result
  }
  // 3.更新产品信息
  if(method === 'POST' && req.path === '/api/product/update'){
    //post请求时处理数据
   const resultData =  getPostData(req).then(postData => {
      const result = updateProductById(id,postData)
      return result
    })
    return resultData
  }
  // 4.新建产品
  if(method === 'POST' && req.path === '/api/product/new'){  
    //post请求时处理数据
    const resultData =  getPostData(req).then(postData => {
      const result = newProduct(postData)
      return result
    })
    return resultData

  }
  // 5.删除一个产品
  if(method === 'DELETE' && req.path === '/api/product/del'){ 
    const result = delProductById(id)
    return result
  }




}

module.exports = {
  handleProductRouter
}
