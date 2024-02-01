const crypto = require('node:crypto')

// // 散列算法(信息摘要算法)
// // hash
// const hash = crypto.createHash('sha256')
// const msg = 'hello'
// // 更新内容
// hash.update(msg)
// const result =  hash.digest('hex')
// console.log(result) // 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

// // 链式调用
// const msg = 'hello'
// const result = crypto.createHash('sha256').update(msg).digest('hex')
// console.log(result) // 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

// 封装成一个函数
// const msg = 'hello'
// function createSha256(data) {
//     return crypto.createHash('sha256').update(data).digest('hex')
// }
// const otherResult = createSha256(msg)
// console.log(otherResult) // 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

// 加盐哈希
const msg = 'hello'
function createSaltSha256(data,key='1qaz') {
    return crypto.createHmac('sha256',key).update(data).digest('hex')
}
const result = createSaltSha256(msg)
console.log(result)// c930f048e252abf8cda7fe936da95fa73f01b742fd5f3b618cf9f29fda229f22
const result2 = createSaltSha256(msg,'123')
console.log(result2) // 0ce62924a2ed57b5af99840366b2db54b5057a3d12e943bfcae51a6d04bac6f5



