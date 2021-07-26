//引入redis
const redis = require('redis')
// 创建客户端
const redisClient = redis.createClient(6379,'127.0.0.1')
redisClient.on('error',err => {
    console.error(err)
})
// 定义set函数，写入redis
function set(key,val){
    // 如果是对象先转成json格式
    if(typeof val === 'object'){
        val=JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
}
// get是异步的形式使用promise封装
function get(key){
    const promise = new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            // 如果value为空
            if(val == null){
                resolve(null)
                return
            }
            // 兼容json转换格式
            try{
                resolve(
                    // 尝试变成一个json格式返回
                    JSON.parse(val)
                )
            }catch(ex){
                resolve(val)
            }
            
        })        
    })
    return promise
}
module.exports={
    set,
    get
}

