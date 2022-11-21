// 操作数据库
const Product = require('../models/productModel')

// 产品类
class ProductController {
  // 1.获取产品列表
  async getProductList(){
    const result = await Product.find()
    return result
  }
  // 2.获取指定id的产品信息
  async getProductById(id){
    const result = await Product.findById(id)
    return result
  }
  // 3.更新信息
  async updateProductById(id,data){
    const result = await Product.findByIdAndUpdate(id,data,{new:true})
    return result
  }
  // 4.新建产品
  async newProduct(data){
    const result = await Product.insertMany(data)
    return result
  }
  // 5.删除产品
  async delProductById(id){
    const result = await Product.findByIdAndDelete(id)
    return result
  }





}

module.exports = new ProductController()