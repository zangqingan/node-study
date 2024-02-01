const fs = require('node:fs')
const crypto = require('node:crypto')

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

/**
 * sha256 hash加密
 * @param {string, an instance of Buffer, TypedArray, or DataView} data 要加密的内容
 * @returns 返回经过sha256加密后的内容
 */
const createSha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex')
}

/**
 * sha256 Hmac加盐hash加密
 * @param {string, an instance of Buffer, TypedArray, or DataView} data 要加密的内容
 * @param {string,an instance of ArrayBuffer, Buffer, TypedArray, DataView, KeyObject, or CryptoKey} key 盐值
 * @returns 返回经过Hmac加盐sha256加密后的内容
 */
// hmac 加密hash的加盐运算。
const createSaltSha256 = (data,key='1qaz') => {
  return crypto.createHmac('sha256',key).update(data).digest('hex')
}


// signature 数字签名
function sign(data,priKey){
  return crypto.createSign('RSA-SHA256').update(data).sign(priKey, 'hex');  //生成签名（私钥加密）
}

// signature 数字签名验证
function verify(data,pubKey,signature){
  return crypto.createVerify('RSA-SHA256').update(data).verify(pubKey,signature,'hex'); //验证签名（公钥解密）
}




// 导出
module.exports = {
    getPostData,
    getCookieExpires,
    readAllFileInDir,
    createSha256,
    createSaltSha256
}