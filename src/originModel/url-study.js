// 1 引入
// const url = require('url')

// 2 旧API的使用（废弃）
// var urlTest = 'http://www.zangqingan.com:3000/foo?name=王耿&age=24#student'
// console.log(urlTest)//http://www.zangqingan.com:3000/foo?name=王耿&age=24#student
// url.parse(url,true)方法,用来解析网址的。
//url 网址，true表示查询字符串存储在query对象内以对象的形式返回
// console.log(url.parse(urlTest,true))
// Url {
//     protocol: 'http:',//协议
//     slashes: true,//是否有双反斜杠  //
//     auth: null,//作者
//     host: 'www.zangqingan.com:3000',//域名+端口
//     port: '3000',//端口
//     hostname: 'www.zangqingan.com',//主机名
//     hash: '#student',//哈希
//     search: '?name=王耿&age=24',//包含？的查询参数字符串
//     query: 'name=王耿&age=24',//不包含？的查询参数字符串
//     query: [Object: null prototype] { name: '王耿', age: '24' },//第二个参数为true时
//     pathname: '/foo',//路径地址名
//     path: '/foo?name=王耿&age=24',//包含查询字符串的路径
//     href: 'http://www.zangqingan.com:3000/foo?name=王耿&age=24#student'//完整网址
//   }

// url.resolve(a,b)，将a路径和b路径拼接到一起

// 3. 新API的使用
const urlTest = new URL('http://www.zangqingan.com:3000/foo?username=王耿&password=24#student')
console.log(urlTest)//输出如下
// URL {
//   href: 'http://www.zangqingan.com:3000/foo?username=%E7%8E%8B%E8%80%BF&password=24#student'
//   origin: 'http://www.zangqingan.com:3000',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'www.zangqingan.com:3000',
//   hostname: 'www.zangqingan.com',
//   port: '3000',
//   pathname: '/foo',
//   search: '?username=%E7%8E%8B%E8%80%BF&password=24',
//   searchParams: URLSearchParams { 'username' => '王耿', 'password' => '24' },
//   hash: '#student'
// }

console.log(urlTest.href)
console.log(urlTest.origin)
console.log(urlTest.protocol)
console.log(urlTest.host)
console.log(urlTest.hostname)
console.log(urlTest.pathname)
console.log(urlTest.search)
console.log(urlTest.hash)







