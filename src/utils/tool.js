const fs = require('node:fs')


/**
 * 处理postdata数据的函数为promise对象
 * @param {*} req http请求对象request
 * @returns 返回一个promise
 */
const getPostData = (req) => {
  // 创建并返回一个 promise
  return new Promise((resolve,reject) => {
      // 如果不是POST请求返回空
      if(req.method !== 'POST'){
          resolve({})
          return
      }
      // 如果数据格式不是json也返回空
      if(req.headers['content-type'] !== 'application/json'){
          resolve({})
          return
      }
      //post请求时处理数据
      let postData = ''
      req.on('data', chunk => {
          postData += chunk.toString()
      })
      req.on('end',() => {
          // 如果没有数据
          if(!postData){
              resolve({})
              return
          }
          //有数据就发送
          resolve(
              JSON.parse(postData)
          )
      })

  })
}

/**
 * 定义一个函数用来设置cookie的过期时间
 * @returns cookie过期时间
 */
const getCookieExpires = () =>{
    const d = new Date()
    d.setTime(d.getTime() + (24*60*60*1000))
    return d.toGMTString()
}

/** 
 * 定义一个读取某个目录下所有文件的函数
 * path - 读取的路径
*/
const readAllFileInDir = async (path) => {
    return new Promise((resolve,reject) => {
        fs.readdir(path,{encoding:'utf-8',withFileTypes:true},(err,data) =>{
            //判断是否成功,返回结果在回调函数的第二个参数里
            if(err == null&& err ==undefined){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}













// 导出
module.exports = {
    getPostData,
    getCookieExpires,
    readAllFileInDir
}