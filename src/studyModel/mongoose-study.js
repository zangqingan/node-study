// 1. 引入 mongoose 模块
const mongoose = require('mongoose')
// 2. 创建一个连接
mongoose.connect('mongodb://127.0.0.1:27017/express-test')

/**
 * 一般封装成一个函数
 */
// async function createConnection() {
    // try {
    //     await mongoose.connect('mongodb://127.0.0.1:27017/express-test')
    // } catch (error) {
    //     console.log(error)
    // }
// }
// createConnection()

// 3. 创建模型，这一步抽离写到另外的js文件中，所以这个文件只负责连接数据库
const schema = new mongoose.Schema({
    username:{
      type:String
    },
    password:{
        type:String,
        // 密码不能查
        // select:false,
        // set(val){
        //     // 密码散列
        //     return require('bcrypt').hashSync(val,10)
        // }
    }
  
})
const User = mongoose.model('User',schema)

// 1.创建
// 创建一个新对象(插入一条数据)
// const newUser = new User({username:'zhangsan',password:'123456'})
// newUser.save()
// 另一种创建方法
// await User.create({username:'创建',password:'12wsxqaz'})
// 一次创建多个
// await User.insertMany([
//     {username:'很多1',password:'fdsgsa112'},
//     {username:'很多2',password:'12wsxqaz'},
// ])


// 2.查找
// async function findUser() {
//     const result = await User.find().exec()
//     return result
// }
// const result = findUser()
// result.then(res => {
//     console.log('res',res)
// })
// // 
// async function findUserById() {
//     const result = await User.findById('65bda504c3c9bd575506babe').exec()
//     return result
// }
// findUserById().then(res => {
//     console.log('findUserById',res)
// })

// 3.更新
// async function updateUser(){
//     const result = await User.updateOne({username:'张三'},{username:'张三更新'})
//     return result
// }
// updateUser().then(res => {
//     console.log('updateUser',res)
// })
// async function updateManyUser(){
//     const result = await User.updateMany({username:'修改'},{username:'多个'})
// }
// updateManyUser().then(res => {
//     console.log('updateManyUser',res)
// })
// async function findAndUpdateUser(){
//     const result = await User.findByIdAndUpdate('65bdde1e2ca35331532577d7',{username:'ddd'})
//     // const result = await User.findOneAndUpdate({username:'很多1'},{username:'我是第一个找到的'})
//     return result
// }
// findAndUpdateUser().then(res => {
//     console.log('findAndUpdateUser',res)
// })

// 4.删除操作
async function deleteUser() {
    const result = await User.deleteOne({username:'我是第一个找到的'})
    return result
}
deleteUser().then(res => {
    console.log('deleteUser',res)
})






/**
 * 一般封装成一个函数导出-专门用来连接数据库而已。
 * @param {*} app 传入参数、node应用实例
 */
// module.exports = async (app) => {
//     // 1. 引入 mongoose 模块
//     const mongoose = require('mongoose')
//     // 2. 创建一个连接
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/express-test')
//     } catch (error) {
//         console.log("数据库连接失败",error)
//         throw error
//     }
// }
