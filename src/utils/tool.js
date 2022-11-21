// 封装处理postdata数据的函数为promise对象
const getPostData = (req) => {
  // 创建一个 promise
  const promise = new Promise((resolve,reject) => {
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
  // 返回promise
  return promise
}

// 定义一个函数用来设置cookie的过期时间
const getCookieExpires = () =>{
    const d = new Date()
    d.setTime(d.getTime() + (24*60*60*1000))
    return d.toGMTString()
}


module.exports = {
    getPostData,
    getCookieExpires
}