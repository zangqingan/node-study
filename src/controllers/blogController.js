// 操作数据库
const Blog = require('../models/blogModel')

// blog控制器
class BlogController{
  async getList(){
    const result = await Blog.find()
    return result
  }
  async getDetailById(id){
    const result = await Blog.findById(id)
    return result
  }
  async newBlog(data){
    // const data = {
    //   title:'还有梦吗',
    //   content:'每一个不曾起舞的日子，都是对生命的辜负',
    //   auther:'wanggeng'
    // }
    const result = await Blog.insertMany(data)
    return result

  }
  async updateBlog(id,data){
    const result = await Blog.findByIdAndUpdate(id,data,{new:true})
    return result
  }
  async delBlog(id){
    const result = await Blog.findByIdAndDelete(id)
    return result
  }
}

// 导出实例对象
module.exports = new BlogController()