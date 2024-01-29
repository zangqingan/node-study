const http = require('http')


const server = http.createServer((req,res) => {
    console.log('httpVersion',req.httpVersion)
    console.log('method',req.method)
    console.log('headers',req.headers)
    console.log('url',req.url)
    req.path = req.url.split('?')[0]
    req.query = req.url.split('?')[1]
    const obj = new URLSearchParams(req.query)
    console.log('obj',obj)
    console.log('obj.name',obj.get('name'))
    console.log('path',req.path)
    console.log('query',req.query)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
})

server.listen(3000,'localhost',err => {
    if(err){console.log(`服务器出错，请联系系统管理员${err}`)}
    console.log(`Server running at http://localhost:3000/`)
})