// 1 引入
const path = require('path')

// 2 使用
// var testpath = 'W:/VSCodeProjects/nodeStudy/readme.md'
var testpath = 'http://img.doutula.com/production/uploads/image/2020/05/21/20200521045427_yIPwpZ.jpg'

// path.extname() 方法返回文件的扩展名
// path.basename() 方法返回 path 的最后一部分,即取最后一层(取文件名)。
// path.dirname() 方法返回 path 的目录名，去掉最后一层(去掉文件名)

console.log('取到文件的扩展名',path.extname(testpath))// .md
console.log('取到的是文件名',path.basename(testpath))//readme.md
console.log('取到的是文件目录名',path.dirname(testpath))//W:/VSCodeProjects/nodeStudy
console.log('将一个路径解析为对象格式',path.parse(testpath))//{root: 'W:/',dir: 'W:/VSCodeProjects/nodeStudy', base: 'readme.md',ext: '.md', name: 'readme'}

// path.resolve() 方法用来拼接路径,将给定的路径序列从右到左进行处理，后面的每个 path 会被追加到前面，直到构造出绝对路径。
//如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。
//path.join() 方法使用平台特定的分隔符作为定界符 Windows系统下是\，而在Linux系统下是/。将所有给定的 path 片段连接在一起，然后规范化生成的路径。
//resolve()和join()方法差不多
const fullFileName1 = path.resolve(__dirname,'../','../','public','readfiletest.txt')
const fullFileName2 = path.join(__dirname,'../','../','public','readfiletest.txt')
console.log('resolve：',fullFileName1)
console.log('join：',fullFileName2)
// 当前文件所在的文件名
console.log('__dirname',__dirname)
console.log('__filename',__filename)