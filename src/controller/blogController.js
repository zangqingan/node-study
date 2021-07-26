// 操作数据库


// blog控制器
class Blog{
  getList(){
     return [
        {
            id:1,
            title:'标题A',
            content:'内容A',
            createTime:1563869172016,
            auther:'wanggeng'
        },
        {
            id:2,
            title:'标题B',
            content:'内容B',
            createTime:1563869209662,
            auther:'zangqingan'
        }
    ]
  }
  getDetail(){
    return {
        id:1,
        title:'标题A',
        content:'内容A',
        createTime:1563869172016,
        auther:'wanggeng'
    }
  }
  newBlog(){
    return{
        id:3  //表示新建博客的插入到数据表中的唯一表示

    }
  }
  updateBlog(){
     // 测试
    console.log('update blog')
    return true 
  }
  delBlog(){
    return true 
  }
}

// 导出实例对象
module.exports = new Blog()