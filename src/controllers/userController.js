const User = require('../models/userModel')


class UserController{
  // 1.登陆
  async userLogin(data,req){
    // 获取用户名和密码查找数据库中是否存在存在则返回信息表示登陆成功。
    // 从postData中获取username和password
    const {username,password} = data
    // 保证创建用户的唯一性，先获取新建的用户名和数据库中的数据比对，是否存在
    const unioneUser = await User.findOne({username,password})
    if(!unioneUser){ return {code:401,msg:'用户名或密码不正确'}}
    //返回查找到的用户
    if(unioneUser.username){
      // 直接设置session
      req.session.username = unioneUser.username
      req.session.password = unioneUser.password
    }
    // return unioneUser 
    return {code:200,msg:'登陆成功',data:req.session}

  }
  // 2.新建用户
  async createUser(data){
    // 从postData中获取username和password
    const {username} = data
    // 保证创建用户的唯一性，先获取新建的用户名和数据库中的数据比对，是否存在
    const repeateUser = await User.findOne({username})
    if(repeateUser){ return {code:409,msg:'用户名已存在'}}
    // 存入User集合中
    const result = await User.insertMany(data)
    return result
  }



}

module.exports = new UserController()