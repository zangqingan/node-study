// 1. 引入 mongoose 模块
const mongoose = require('mongoose')
// 2. 创建一个连接
//  //  "mongoose": "^5.12.14" 低版本的
// mongoose.connect('mongodb://localhost:27017/express-test', 
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   },err => {
//     if(err){
//       console.log("数据库连接失败",err)
//       return
//     }
//     console.log("数据库连接成功!")
//   }
// );

// // 新版本
mongoose.connect('mongodb://localhost:27017/express-test').then(() => console.log('Connected!'))

// 3. 创建模型，这一步抽离写到另外的js文件中，所以这个文件只负责连接数据库

// // 一般封装成一个函数-专门用来连接数据库而已。
// module.exports = async app => {
//     // 1. 引入 mongoose 模块
//     const mongoose = require('mongoose')
//     // 2. 创建一个连接
//     await mongoose.connect('mongodb://localhost:27017/express-test', 
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true
//       },err => {
//         if(err){
//           console.log("数据库连接失败",err)
//           return
//         }
//         console.log("数据库连接成功!")
//       }
//     )
// }
