// 1.引入
const querystring = require('querystring')
const result = new URL('http://www.zangqingan.com:3000/foo?name=wanggeng&age=24#student').searchParams
console.log('result:',result)
//querystring.parse() 它的别名是 querystring.decode() 方法将 URL 查询字符串 str 解析为一个对象(键值对的集合)。
console.log('querystring.parse result:',querystring.parse(result))
// querystring.stringify() 它的别名是 querystring.encode() 方法通过迭代对象的自身属性从给定的 obj 生成 URL 查询字符串。
console.log('querystring.stringify result:', querystring.stringify(querystring.parse(result)))