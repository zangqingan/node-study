// 引入MySQL模块
// const mysql = require('mysql')
// //调用createConnection方法创建一个数据库链接对象,传入的是一个配置对象
// 这个配置对象可抽离出来区分开发和生产环境。
// const con = mysql.createConnection({
//     // 域，线上环境就是线上的数据库地址，本地是localhost
//     host:'localhost',
//     // 数据库的用户
//     user:'root',
//     password:'123456',
//     port:'3306',//默认也是3306
//     database:'myblog'//指定要连接的数据库
// })
// // 开启连接
// con.connect()
// // 定义要执行的sql语句，实际这里会封装成一个promise
// const sql = 'select * from blogs;'
// // 使用query()方法执行sql语句，结果传到第二个参数callback中。
// con.query(sql,(err,result) => {
//     // 查询出错
//     if(err){
//         console.log(err)
//         return
//     }
//     //返回查询结果
//     console.log(result)
// })

// // 关闭连接，实际会一直连接而不是关闭
// con.end()



// 实际开发封装的版本
const mysql = require('mysql')

const con = mysql.createConnection({
    // 域，线上环境就是线上的数据库地址，本地是localhost
    host:'localhost',
    // 数据库的用户
    user:'root',
    password:'123456',
    port:'3306',
    database:'myblog'//指定要连接的数据库
})
// 开启连接
con.connect( err => {
    if(err){
        console.error(err)
    }else{
        console.log('数据库连接成功!')
    }
})
//封装一个基于promise的统一执行sql语句的函数
//参数sql 调用时传入的sql查询语句
function exec(sql){
    return new Promise((resolve,reject) => {
        con.query(sql,(err,result) => {
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}
// 暴露处理sql函数
module.exports = {
    exec
}
