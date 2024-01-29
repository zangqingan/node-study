# 一、概述
2024.1.26 重新梳理node知识体系、开始深入学习。
目前node稳定版本已经是 20.11.0 比我刚开始学时可以说是变化非常大的。 
同时node本身知识点又是比较松散、所以这次重新梳理旨在构建一个自己掌握知识的知识体系。

# 二、准备工作

## 2.1 windows系统常用命令
window+r:  快速打开命令运行窗口。
常用命令:  
| 名称      | 含义 |
| --------- | -----------    |
| cmd       | 打开命令行窗口  |
| notepad   | 打开记事本      | 
| calc      | 计算器         | 
| mspaint   | 打开画图工具。  | 
| write     | 写字板         | 
| notepad   | 打开记事本      | 

切换盘符:  盘符号: 点击回车即可。


## 2.2 linux系统常用命令
常用命令:  
| 名称      | 含义 |
| --------- | -----------               |
| touch     | 新建一个文件               |
| ls        | 列举当前目录下所有资源等等。 |
| mkdir     | 要创建的目录名。            |
| cd        | 切换目录。                  |
| cls/clear | 清屏                       |

## 2.3 node环境安装
在[node官网](https://nodejs.org)下载稳定版本双击运行安装即可、安装成功之后在命令窗口中输入以下命令可以查看安装的node版本。

`
  $ node -v
`

但是在windows系统里一般是使用 [nvm](https://github.com/coreybutler/nvm-windows)全称是 Node Version Manager(node版本管理工具)来管理多个node版本。好处是node版本切换方便、nvm常用命令如下:
| 命令名      | 含义 |
| ----------- | ----------- |
| nvm -v      | 查看nvm的版本       |
| nvm list   | 列举所有已安装的node版本(带*的表示当前用的版本)        | 
| nvm list available   | 查看所有node可安装版本        | 
| nvm current   | 显示node当前使用版本        | 
| nvm use 版本号   | 使用指定版本的node        | 
| nvm install 版本号  | 安装指定版本的node        | 
| nvm uninstall 版本号  | 卸载指定版本的node        | 
| nvm -h   | 查看帮助        | 

现在用的基本上最低都是 8.x 以上的版本了因为它们都支持 ES6 特性、v12版本之后node开始支持es6的模块化语法。个人在用v14、v16、v18这3个偶数主版本、社区最新版已经到v21了、LTS版也已经更新到v20.11.0。




# 三、Node.js基础
nodejs基础的学习可以说是很简单的、因为它的真正用途或者说一般实际用途是: 运行在服务端作为web server存在。也就是说对于我们前端工程师而言就是用来提供api接口的、它学习的难处在于服务器端的开发思路和套路与前端开发是不一样的、同时原生node是比较繁杂的。我们主要要学习的就是这些思路和套路。
[官方网站](https://nodejs.org) 主要用来查询相关api
[Nodejs学习指南](https://blog.poetries.top/node-learning-notes)社区学习网址
[Nodejs技术栈](https://www.nodejs.red)
## 3.1 服务端和前端的概念和区别

前端:  主要和用户肉眼所看到的页面打交道、主要工作就是写页面（HTML）、美化页面（css）、调用后端提供的 api接口去请求或提交数据等。

server端也就是服务器端、主要进行业务逻辑的操作如:  数据的增删改查、数据库的操作、对外暴露api接口等。

后端开发思维是和前端不一样的、在开发过程中要考虑以下多个方面的问题:  
1. **服务的稳定性:**  server端可能会遭受各种恶意攻击、但是服务不能挂掉。--> 通过PM2进行进程守候在服务挂掉后能自动重启。
2. **要考虑服务器性能如内存和cpu:**  在客户端只有一个浏览器内存不是问题、而对于服务端来说cpu和内存都是稀缺资源。--> 通过stream写日志、使用redis存session 优化内存和cpu。
3. **日志管理:**  前端也参与日志但是只是发送不关心后续、server端则要纪录、存储、以及分析日志。
4. **安全问题:**  server会时刻遭受各种网络恶意攻击、而前端较少。--> 通过登陆验证、预防常见的xss攻击和sql注入。
5. **集群和服务拆分:**  当产品发展速度快、流量可能会迅速增加、项目变得很大时、就需要考虑集群和拆分服务了。

记住重点在于切换思路、记住对应的解决方案就行。

## 3.2 nodejs基础介绍
nodejs是一个开源的、跨平台的JavaScript运行时环境(更进一步的说是在服务端的运行环境),并不是一门新的编程语言。它的作者是 Ryan Dahl、底层是使用c++编写的。
它是运行谷歌v8引擎上的、单线程的、基于事件驱动的、异步的、非阻塞式 I/O 的JavaScript运行时。
1. **单线程:** Node.js 使用单线程来运行、而不是向 Apache HTTP 之类的其它服务器、每个请求将生产一个线程、这种方法避免了 CPU 上下文切换和内存中的大量执行堆栈
2. **事件驱动:**
3. **异步的:**
4. **非阻塞式 I/O:** Node.js 避免了由于需要等待输入或者输出（数据库、文件系统、Web服务器...）响应而造成的 CPU 时间损失、这得益于 Libuv 强大的异步 I/O。
5. **跨平台:** 起初 Node.js 只能运行于 Linux 平台、在 v0.6.0 版本后得益于 Libuv 的支持可以在 Windows 平台运行。

根据它的特点可以知道它适用在哪些方面:
1. **I/O 密集型场景:** Node.js 的优势主要在于事件循环、非阻塞异步 I/O、只开一个线程、不会每个请求过来我都去创建一个线程、从而产生资源开销。
2. **RESTful API:** 通常我们可以使用 Node.js 来做为中间层、负责组装数据提供 API 接口给到前端调用、这些数据源可能来自第三方接口或者数据库、例如、以前可能我们通过后端 Java、PHP 等其它语言来做、现在我们前端工程师通过 Node.js 即可完成、后端则可以更专注于业务开发。
3. **基础工具:** 可以做为基础工具、前端领域中的编译器、构建工具、搭建脚手架等。比较出名的例如 Webpack、Gulp 
4. **论坛社区:**  小型的业务不复杂的应用可以直接使用node全栈、如Nodeclub 就是使用 Node.js 和 MongoDB 开发的社区系统
5. **等等:**

简单地理解就是nodejs提供了一种简单安全的方法在 JavaScript 中构建高性能和可扩展的网络应用程序即JavaScript可以当作后端语言使用了。


## 3.3 nodejs和JavaScript的区别

1. ecmascript定义了语法、无论是写JavaScript还是nodejs都必须遵守的、但是nodejs不能操作DON、不能监听页面事件、不能发送Ajax、不能处理http请求。
2. JavaScript使用了ecmascript语法规范还外加浏览器提供的web api (web api主要包括用来操作DOM、BOM、监听事件、发送Ajax请求等一系列的api。)
3. nodejs也使用了ecmascript语法规范还外加node api (node api主要包括Node.js 标准库、对外提供的 JavaScript 接口、例如模块 http、buffer、fs、stream 等。Libuv一个跨平台的支持事件驱动的 I/O 库。V8-Google 开源的高性能 JavaScript 引擎、使用 C++ 开发、并且应用于谷歌浏览器。)


## 3.4 nodejs的基本使用
在安装好node之后、环境就配置好了此时就可以在一个js文件里编写JavaScript代码并使用如下命令运行一个js文件、同时会一起安装nodejs的包管理器NPM。

`$ node example.js`

当然Nodejs最简单最常见的例子是作为一个web服务器。
使用以下命令就可以运行这个web服务器:

`$ node myHttp.js `

**myHttp.js**
```javascript
const http = require('node:http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

```

## 3.5 nodejs的模块系统

### 3.5.1 概述
在编写稍大一点的应用程序时一般都会将代码按照功能拆分成不同的文件也就是所谓的模块化、好处是:
1. 避免变量污染、命名冲突
2. 提高代码复用率
3. 提高维护性
4. 依赖关系的管理。

使用模块化开发也比较符合设计原则中的单一置换原则、开放封闭原则。

而在node.js中就是以模块为基本单位来划分功能的、一个模块本质上就是一个 .js 文件。
为了让node模块之间可以相互调用、Node.js提供了一个完整的模块加载系统-->即CommonJS规范。在v12版本之前、nodejs只使用Commonjs 规范。在v12之后也支持了ESM、这样就和前端一样了、但是这里还是介绍一下Commonjs 规范。

**注意:**  这里 .js文件 和模块是一一对应的、即:  一个 Node.js 文件就是一个模块、这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。所以创建一个模块是很简单的就是新建一个.js文件。

### 3.5.2 分类

可以简单地分为两类:  
1. 系统模块: nodejs原生提供的模块、调用时只写模块名称即可。
2. 第三方模块: 非 Node.js 自带的模块统称、调用时要写清楚路径地址。

### 3.5.3 使用

nodejs模块系统是基于commonjs规范的、一个单独的js文件就是一个模块、每一个模块都是一个单独的作用域、也就是说、在该模块内部定义的变量函数、对象等都运行在模块作用域中、无法被其他模块读取、除非为global对象的属性。这样不会污染到全局作用域、同时Node.js 采用了延迟加载的策略、即只有用到时模块才会被加载、且加载完成后会放到binding_cache中进行缓存、所以在第二次再引入相同的模块时不会重新加载。同时在编写或使用每个node 模块时、都有require()、exports、module这三个nodejs预先定义好的变量可供使用。

#### 1.模块引入 require()函数 

nodejs对所有模块的加载方法都是通过调用 require() 函数来加载和使用别的模块、这个函数接收一个字符串类型的模块名(原生和文件模块直接使用模块名、自定义模块要指定模块所在的位置)。

**注意:**  模块名中的.js扩展名可以省略、require() 函数的返回值是一个 node 模块导出对象 --> module.exports === {}、这个对象拥有加载模块向外暴露的所有属性和方法。可以定义一个变量接收这个对象返回值、这样就可以通过这个变量来调用模块向外导出的所有属性和方法。也可以直接解构需要的属性或方法。

```JavaScript

导入语法:  const 变量对象名 =  require('原生/文件模块名/自定义模块位置');
导入语法:  const {解构变量名} =  require('原生/文件模块名/自定义模块位置');


```
原生和文件模块不做路径解析、直接返回内部模块的导出对象。自定义模块做路径解析。
1. 以 '/' 为前缀的模块是文件的绝对路径。
2. 以 './' 为前缀的模块是相对于当前调用 require() 文件的同级目录。
3. 以 '../' 为前缀的模块是相对于当前调用 require() 文件的上一级目录。
4. 当没有以 '/'、 './' 或 '../' 开头来表示文件时、这个模块必须是一个核心模块或加载自 node_modules 目录的文件模块。

#### 2.模块的导出 module和exports对象

每个nodejs模块都有一个全局对象module、同时module对象中有一个属性exports(它本身又是一个对象)。
我们需要把模块希望暴露导出的属性和方法放入 module.exports 对象中、它是node模块真正的向外暴露属性和方法的出口、每个模块只能有一个多个时后面的覆盖前面的。

```JavaScript
例如: a.js
function FunA(){
    return 'Tom';
}
const result = [1,2]
module.exports = {
    FunA,
    result,
    要导出的函数、
    .....对象等等
}
使用export 导出
语法:  exports.导出变量名/导出方法名=模块内定义的变量名/方法名。
exports.FunA = FunA
exports.result = result

在 b.js里导入、这里假设他俩在同一层级
b.js
const total = require('./a.js')
total.FunA
total.result
也可以解构出来
const {FunA,result} = require('./a.js')

另一种导出时就是exports对象、而exports对象的值本质上指向的是module对象。
const total = require('./a.js')
同样可以解构出来
const {FunA,result} = require('./a.js')


```

exports对象:  在模块中也使用这个对象向外暴露东西、它本身又是一个对象并且nodejs将一个指向module.exports的引用赋值给了exports、即exports的值(地址值)指向的就是module.exports对象。exports对象、可以理解为它是一个副本(简写形式)。

`const exports = modules.exports`


**注意:**  module.exports和exports的区别
module.exports才是node模块真正的导出接口、即在使用require()方法引入时得到的返回值就是这个
module.exports、一个模块文件中可以有多个exports输出、但只能有一个module.exports输出。
所有exports对象最终都是通过module.exports导出的。
建议都使用module.exports就行避免矛盾。

### 3.5.4 node模块加载机制
在Nodejs中模块加载一般会经历:  路径分析、文件定位、编译执行这3个步骤。
按照模块的分类、在Nodejs中模块加载会按照以下顺序进行优先加载:  
1. **系统缓存:**  首先是先进行系统缓存binding_cache加载(因为模块被执行之后会在这里进行缓存)、判断缓存中是否有值。有不再加载直接使用之前加载过的、没有进行下一步检查。

2. **系统模块:**  然后查找定义在Node.js源码的lib目录下的系统模块也就是原生模块、这个优先级仅次于缓存加载、部分核心模块已经被编译成二进制、省略了路径分析、文件定位直接加载到了内存中。有直接加载使用、没有进行下一步检查。

3. **文件模块:**  优先加载 ./、../、/开头的文件模块、如果文件没有加上扩展名、会依次按照.js、.json、.node进行扩展名补足尝试、那么在尝试的过程中也是以同步阻塞模式来判断文件是否存在、从性能优化的角度来看待、
.json、.node最好还是加上文件的扩展名。有直接加载使用、没有进行下一步检查。

4. **目录做为模块:**  这种情况发生在文件模块加载过程中、也没有找到、但是发现是一个目录的情况、这个时候会将这个目录当作一个包来处理、Node这块采用了Commonjs规范、先会在项目根目录查找package.json文件、取出文件中定义的main属性("main": "lib/hello.js")描述的入口文件进行加载、也没加载到、则会抛出默认错误: Error: Cannot find module 'lib/hello.js'。有直接加载使用、没有进行下一步检查。

5. **node_modules 目录加载:** 对于系统模块、路径文件模块都找不到时、Node.js会从当前项目的node_modules目录里进行查找、没有则往上一级父目录的node_modules进行查找、直到系统的根目录的node_modules。有直接加载使用、没有进行下一步检查。

6. **最终** 如果查找的模块还是没有找到、则 require() 会抛出一个 code 属性为 'MODULE_NOT_FOUND' 的 Error 即找不到要加载的模块的错误。

### 3.5.5 node项目一般目录结构
对于原生nodejs没有脚手架等工具时可根据个人编程爱好和模块分类生成一般如下:  

```javaScript

项目名称
    -node_modules  项目安装依赖存放目录初始化node项目时自动生成
    -public 存放静态文件、图片、音频、视频等资源目录
        -images 图片
        -logs 日志
        -music 音乐
        -.....其它静态资源
    -src 项目代码的实际存放位置
        -config 项目全局相关的配置
        -doc 存放项目说明文档、接口文档等
        -controllers 控制器
        -models 数据库表定义文件目录
        -middleware  自定义模块第三方中间件 
        -routers 项目路由
        -utils 自定义工具类
        -index.js 项目入口文件

```

## 3.6 nodejs包管理工具NPM
包管理器又称软件包管理系统、它是在电脑中自动安装、配制、卸载和升级软件包的工具组合、在各种系统软件和应用软件的安装管理中均有广泛应用。而在我们安装node的同时也会自动把npm也安装上、npm(全称node package manager)node包管理工具的简称、它是一个命令行工具、用于下载和管理node开发中需要到的各种模块/包/插件。
可以在[官网](https://www.npmjs.com/) 上搜索你想要安装的模块。

常用命令如下:  
```javaScript
npm -v === npm --version 查看当前安装的 npm 版本信息
npm install 模块名   在本目录下增加一个node_modules并在这个目录里安装指定模块
npm install 模块名@版本 安装指定版本的包
npm uninstall 模块名   删除或者说卸载指定模块
npm list 查看当前目录安装了哪些模块。
npm config list 查看当前电脑主机安装了哪些全局模块。
npm show 模块名 、显示指定模块的详情
npm update  升级当前目录下的项目的所有模块、也可在后面指定模块名升级。
npm config get registry 查看当前 npm 源
npm config set registry=https://registry.npm.taobao.org  切换为 taobao 源
npm run 运行node项目。

```

**node项目从零开发一般流程如下:**
1. <strong> 先初始化为node项目</strong>
   
```javaScript
方法:  使用 npm init / npm init -y 初始化为node项目(-y 表示快速初始化node项目包管理文件package.json)。
将来要安装的模块/包的信息都会纪录在这个package.json文件中且包含有描述当前node项目的其它各种信息。它是当前项目相关信息的json格式配置文件
常见属性如下:
{
    "name" : "包名/当前项目名称",
    "version" : "包的版本号/项目的版本号",
    "description" : "包的描述信息/项目的描述信息",
    "keywords" : "描述当前项目的关键字",
    "main" :"index.js", "main 字段指定了node项目程序的主入口文件、即使用node命令启动项目时的入口文件、使用require('moduleName') 就会加载这个文件、这个字段的默认值是模块根目录下面的 index.js、也可以自定义指定位置的文件作为入口文件。主要负责调度组成整个程序的其它模块完成工作"
    "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "serve": "cross-env NODE_ENV=dev nodemon 入口文件位置",
       "prd": "cross-env NODE_ENV=production pm2 start 入口文件位置"
    },
    这个选项叫npm脚本指定了node项目运行脚本命令的npm命令行缩写、即启动node项目的自定义命令、用来代替 node 运行文件名 这样启动js文件的方式。可以通过npm run 查看定义了哪些脚本命令。
    语法:  npm run 自定义的命令。(自定义的命令是scripts中的键、如果定义为start时则run可以省略)。上面开发环境就是:  npm run serve、生产环境就是:  npm run prd
    "author" : "包的作者/项目的作者",
    "license": "ISC","项目使用的开源协议"
    "contributors" : "包/项目的其他贡献者",
    "repository": {
       "type": "git",
       "url": "git+https://github.com/zangqingan/nodeStudy.git"
    },
    包/项目代码的远程仓库信息、包括type和URL、type可以是git或svn、URL则是远程的仓库地址。
    "homepage": "https://github.com/zangqingan/nodeStudy#readme",当前项目远程仓库的readme.md 文件地址。
    "dependencies": {
       "mongoose": "^5.8.3"
    }、
    生产环境依赖、指定了项目运行时（即生产环境所依赖的模块列表）所依赖的模块、不装项目运行不了。
   它们将会被安装在当前目录的 node_modules 目录下。
    "devDependencies": {
       "cross-env": "^7.0.3"
    }
    开发环境依赖 指定了项目开发时所依赖的模块、发布时用不到它。
}

```

2. <strong>安装开发中实际用到的各种模块</strong>

```javaScript
安装/卸载语法:  npm install/uninstall 包名/模块名@version   --sava / --save-dev / -g。
后面没有参数时默认会把模块直接安装到当前目录的node_modules目录中、同时模块相关的版本信息会放到包管理文件 package.json 的 dependencies 生产依赖选项中。
     @version 指定模块的版本可选。
    --save === -S 模块安装到生产依赖dependencies中、即:  模块信息自动写入package.json中的 "dependencies" 节点选项中。项目发布上线之后还会依赖用到的模块、没有这些模块、项目不能运行。
    --save-dev === -D 模块安装到开发依赖中、即:  模块信息自动写入package.json中的 "devDependencies" 节点选项。项目上线之后不会用到的模块、例如'babel-loader'等。
    -g,表示全局安装、就可以在任何项目的目录下使用。一般如 nodemon pm2等常用和项目无关的模块会全局安装。

注意:  模块信息由模块名、模块版本信息组成。而版本号的格式如下:  
如 "模块名": "可升级版本符号主版本号.次版本号.修改版本号" 
--> "cross-env": "^7.0.3"

版本格式:  主版本号.次版本号.修改版本号。
主版本号:  功能模块有大的变动、比如增加多个模块或者整体架构发生变化。
次版本:  模块局部的变动。
修改版本:  bug修复或者增加一些小功能。
可升级版本符号主版本号有如下三种:  
~、用户使用当前版本后、最多升级到修改版的最新版本
^,用户使用当前版本后、最多升级到次版本的最新版本
*,用户使用当前版本后、可以升级到最新版本即最新主版本


```

3. <strong>正式使用各种模块</strong>
根据项目的实际需求在 .js 文件中编写具体的代码即可、具体使用查看对象包文档提供的api接口即可。

## 3.7 nodejs程序Debug调试
调试是每一个开发人员都要遇到的问题、选择一个合适的调试工具也尤为重要。 在 Node.js 开发过程中除了万能的 console.log 之外、还可以通过编辑器的调试工具或者其它的工具。











# 四、nodejs 常见系统模块
node系统模块也是比较多的、对应的api也很多不过主要学一些常见的模块及对应的api即可。
Node.js最常见的例子是作为web服务器、这也是我们只要基础时主要学习的东西。
就是写一个后端服务给自己提供接口。所以第一个模块我们学习 http 网络服务模块。

## 4.1 http 网络服务模块

### 4.1.1 概述

http模块可以说是nodejs最核心的模块、同时也是比较复杂的一个模块。可以很方便地创建作为web server的HTTP服务器和客户端。上手很简单、但一旦深入学习也很难因为它要学习网络协议等其它相关的知识。

1. 服务器server:  接收来自客户端(浏览器)的请求、并将客户端请求的地址返回给客户端。
2. 客户端client:  向服务器发起请求、并将服务器返回的内容打印到控制台。

**例子**

```javaScript

const http = require('http');

// http server 例子-http.Server实例、用来提供服务、处理客户端发起的http请求
const server = http.createServer(function(serverReq, serverRes){
    const url = serverReq.url
    serverRes.end( '您访问的地址是:  ' + url )
})

server.listen(3000);

// http client 例子-http.ClientReques实例、用来向其它服务端发起请求。
const client = http.get('http://127.0.0.1:3000', function(clientRes){
    clientRes.pipe(process.stdout)
})

// serverReq/clientRes：其实都是 http.IncomingMessage实例。serverReq 用来获取客户端请求的相关信息，如请求头信息-request header；而clientRes用来获取服务端返回的相关信息，比如响应头信息-response header


// serverRes：http.ServerResponse实例

```

### 4.1.2 HTTP协议学习拓展
HTTP协议是计算机分层体系中应用层的网络协议(全称:hyper transfer protocol)超文本传输协议的缩写、用来从万维网服务器传输超文本到本地浏览器的传输协议。

它是基于TCP/IP通信协议来传递数据(HTML文件、图片等)、它工作于客户端-服务器架构上、浏览器作为客户端通过url向服务器发送HTTP请求、服务器接收到请求经过处理后将结果返回给客户端。

**特点:**  简单快速、灵活、无状态。

HTTP协议和url的关系:  
http就是通过使用统一资源表示符(uri)来传输数据和建立连接的、而网络地址url(统一资源定位符)是一种特殊的uri、每一个都对应了唯一的请求资源、url的组成和js中一样。

而对于现阶段而言就是使用浏览器输入网址浏览页面而已、那么在浏览器输入网址到显示页面的过程是什么？或者说发生了哪些事情?
1. 客户端进行dns解析(查找网址对应的ip地址)、建立tcp连接(三次握手)、发送http请求。
2. server端接收到http请求、处理并将结果返回。而server端怎么接收http请求、怎么返回结果在node里就是使用http模块操作的。
3. 客户端接收到返回的数据并进行处理、渲染页面、执行js等


> HTTP请求本质上是一个数据流、由请求头（headers）和请求体（body）2部分组成。
```javaScript
HTTP请求信息:  一般用request表示-即客户端发送一个HTTP请求时传递给服务器的信息。
由以下四部分组成:
   请求行:
   请求头:  放置本次请求的相关信息、是键值对的格式。
   请求体:  post请求时向后端传递的数据、
   空行:

可视化的请求报文类似如下: 指明HTTP版本、请求方法、请求地址、请求头部等信息。
GET /hello HTTP/1.1
Host: 127.0.0.1:3000
Connection: keep-alive
Cache-Control: no-cache
```

> HTTP响应本质上也是一个数据流、由响应头（headers）和响应体（body）组成。
```javaScript
HTTP响应信息:  response即服务器端返回给客户端的信息。
由以下四部分
   响应状态行:
   响应头:  放置本次响应的相关信息、是键值对的格式。
   响应正文:  服务器端返回给客户端的数据
   空行:
```

在node作为web server时、每次客户端发送请求时就会触发http.createServer函数的参数回调函数中的两个对象request、response。

### 4.1.2 request对象
request一般也缩写成req: 表示请求对象用来获取一些客户端请求发送给服务器的信息、即客户端传过来的东西。它是http.IncomingMessage类的实例、比较常用的实例属性和方法如下:

```javaScript 
   req.headers 获取请求头信息(是一个对象)、通常用JSON.stringify转成json字符串。
   req.httpVersion 获取http协议的版本
   req.method 获取http请求的方法类型名、大写。如GET
   req.url 获取整个请求路径path,注意它是包括查询字符串。

例如: 浏览器访问如下地址
// http://127.0.0.1:3000/hello?nick=chyingp&hello=world
req.httpVersion = 'http'
req.url = '/hello?name=david&hello=world'
req.method = 'GET'
   
   req.url的值可以通过 '?' 进行拆分、前面为路由、后面为查询字符串
      req.path = req.url.split('?')[0] ,自定义路由路径
      req.query = req.url.split('?')[1]、自定义查询字符串对象
        query此时时一个使用&符号连接的字符串、可以再通过这个符号拆分或者使用原生的URLSearchParams对象对其进行处理。
注意这里的path和query都是我们自己加给req对象的属性、本身是没有的。

处理get请求、即客户端向服务端获取数据、
    要使用req.url截取?前面部分、和req.method结合以此来做路由接口、
    再使用req.url截取?后面部分、就可以解析查询字符串。
处理post请求、客户端向服务器端传递数据、
    在node中通过req.on方法监听data chunk事件、数据是像水流一样一点点传递、传递过程中会一直触发data事件并执行对应的回调函数。
    let result 
    req.on('data',(chunk) => {
        result += chunk
        // chunk就是一块块数据、可以定义一个变量接受。
    }) 
     
    在所有数据传递完成会触发end事件、并执行回调函数。
    这样就可以获取到前端传递的请求体数据了。
    req.on('end',() => {
        console.log( 'post body is: ' + result );
    }) 

HTTP请求常见的请求方法类型及对应的 req.method 值:  
| HTTP方法名 | 对应req.method 值 |
| --------- | ------------- |
|   get     |    GET        |
|   post    |    POST       |
|   put     |    PUT        |
|   patch   |    PATH       |
|   update  |    UPDATE     |
|   delete  |    DELETE     |
```


### 4.1.3 response对象
response一般也缩写成res: 表示响应对象是服务器端响应给浏览器数据或其它信息时使用的对象。需要程序猿编写指明返回的是什么。即: 我们设置返回给浏览器的信息。
一般来说返回的内容包括：状态代码/状态描述信息、响应头部、响应主体

它是http.ServerResponse类的实例、常见实例方法如下:
```javaScript 
设置状态代码/状态描述信息、响应头部
   res.statusCode = 404 设置响应的状态码
   res.statusMessage = 'Not Found' 设置响应信息文本
   这两个可以通过 res.writeHead(statusCode,statusMessage,headers) 方法同时设置
      res.writeHead(404,'Not Found',{
          'Content-Type': 'text/plain',
          'Set-Cookie': ['type=ninja', 'language=javascript']
      })
   响应头也可以单独设置响应头的相关信息、如下设置数据编码格式。这两个方法都必须再res.end方法之前执行。
      res.setHeader('Content-Type','text/html;charset=utf-8') 
      res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript'])
设置响应主体
   res.write(写数据) 设置响应返回的数据、直接写到HTML页面上所以一般不用。
   res.end(JSON.stringify(data)) 结束响应并将json格式的字符串数据返回


HTTP状态码: 即服务器端返回给客户端用来描述http请求状态的提示信息
由三位数字组成、第一位数字定义了响应的类型
   1xx:表示服务器端已经接收到请求、正在处理
   2xx:表示服务器端已经成功的正确的理解和接收请求
   3xx:表示要完成对请求的响应必须进行进一步的的操作
   4xx:客户端错误、即客户端发送的请求语法有问题或者无法实现
   5xx:服务器端错误、即服务器端不能实现、

常见有:  
   200 OK 请求成功
   400 bad request 客户端请求有语法错误、不能被服务器理解
   401 unauthorized 请求未经过授权
   403 forbidden 服务器收到了请求、但是拒绝提供服务
   500 internal server error 服务器发生了不可预测的错误
   503 server unavailable 服务器当前不能处理客户端的请求、过会儿可能恢复。

```







# 五、常用第三方包

## 5.1 cross-env 
因为Windows平台无法直接设置环境变量、所以使用这个包。
在包管理文件的脚本选项中如下设置、之后在node系统模块-进程模块process.end.NODE_ENV 就可以访问到当前变量值。
```javaScript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "cross-env NODE_ENV=dev nodemon ./src/test.js",
    "prd": "cross-env NODE_ENV=production pm2 start ./src/test.js"
  },

```

## 5.2 nodemon
它是一种工具，可在检测到目录中的文件更改时通过自动重新启动节点应用程序来帮助开发基于 node.js 的应用程序。不然像之前node 文件名运行时无法做到实时监听修改了的文件。但是这个一般是开发环境使用
全局安装:

`$npm install -g nodemon`

**使用**
```javaScript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "cross-env NODE_ENV=dev nodemon ./src/test.js",
    "prd": "cross-env NODE_ENV=production pm2 start ./src/test.js"
  },

```

## 5.3 pm2
PM2 是一个守护进程管理工具，帮助您管理和守护您的应用程序。生产环境使用是用来替代nodemon的。更多功能可上[官网](https://pm2.keymetrics.io/)查看。
全局安装:

`$npm install pm2@latest -g`

**使用**
```javaScript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "cross-env NODE_ENV=dev nodemon ./src/test.js",
    "prd": "cross-env NODE_ENV=production pm2 start ./src/test.js"
  },

```
它常用命令如下:
```javaScript
$ pm2 start app.js 启动、守护和监控应用程序
$ pm2 restart app_name 重启
$ pm2 reload app_name 重载
$ pm2 stop app_name 停止
$ pm2 delete app_name 删除当前任务进程

pm2 stop 0             # 停止指定进程id
pm2 restart 0          # 重启指定进程id
pm2 delete 0           # 将进程从pm2列表中删除

$ pm2 list/ls 查看所有进程
$ pm2 logs 查看日志、 --lines 100 可以指定行数
$ pm2 monit 查看监控信息
$ pm2 startup 设置开机自启动
```

### 2.5.2 nodejs原生核心模块学习


#### 2. fs模块
fs(文件系统)模块提供了用于以模仿标准 POSIX 函数的方式与文件系统进行交互的API。
提供的API基本上可以分为以下三类:  
    1、文件属性的读写:  其中常用的有fs.stat、fs.chmod、fs.chown等等。
    2、文件内容的读写:  其中常用的有fs.readdir、fs.readFile、fs.writeFile、fs.createWriteStream、fs.mkdir等等。
    3、底层文件操作:  其中常用的有fs.open、fs.read、fs.write、fs.close等等。
所有文件系统中的操作都具有以下三种形式:  
    1、同步方法、区别在于同步方法名是在异步回调函数方法名后面多加了Sync --> fs.异步回调函数名Sync
    2、异步回调函数方法、异步的形式将完成回调作为其最后一个参数,且该回调函数的第一个参数始终预留用于有错误或异常发生时的error对象、第二个参数则始终用于返回API方法的执行结果。
    3、基于promise的方法,基于promise在异步回调函数名前加promises --> fs.promises.回调异步函数名
注意:  1.在15.x版本之后语法有所改变 2.原则上都不使用同步的方法。
#### 3. path模块
path(路径)模块提供用于处理文件和目录路径的实用api、这个模块一般是要和url、fs等模块一起使用的。
#### 4. url模块
url 模块用于处理与解析URL、跟原生js的url接口组成基本一样。常与querystring,path等模块一起使用实现nodejs原生的路由。
注意:  在v11.0版本之后url.parse方法已经被移除、使用其它的方法解析url了。现在使用的是和Web 浏览器使用的相同的 WHATWG URL 标准的更新的 API。也就是直接使用URL类即可而不用再使用url模块了,本质上可以看作是url模块的一个属性 URL === require('url').URL --> true
#### 5. querystring模块
querystring 模块提供用于解析和格式化 URL查询字符串的实用api,常与url,path等模块一起使用。
所谓查询字符串、就是url网址 ?后面的内容。
#### 6. stream模块
#### 7. events模块
node事件模块events、node是事件驱动的模型(事件轮询机制)本质都是设计模式中的观察者模式实现的。
即nodejs会将每一个异步事件生成一个事件观察者、并统一存放到事件队列里、当有事件触发了就会执行对应的回调函数、不断轮流询问事件队列直到没有了事件才停止这就是事件轮询机制。
通过events的EventEmitter类实现对事件的绑定监听和触发
// 创建eventEmitter对象
const eventEmitter = new events.EventEmitter()

// 绑定事件和对应的回调函数
eventEmitter.on('eventname',eventHandler)

// 触发定义的事件
eventEmitter.emit('eventname')
http模块的req参数实现了这个接口、通过req.on('eventname',eventHandler)可以监听node定义的事件。
#### 8. os模块
os（操作系统）模块提供了一些操作电脑系统的相关api、了解就行。

### 2.5.3 nodejs常用第三方模块学习

#### 1. nodejs操作数据库模块
主要学习操作MySQL、mongodb、redis这三种数据库即可。在学习node-blog那里有笔记和实例。
##### 1.1 node操作MySQL数据库
通过第三方模块 mysql模块操作MySQL数据库实现数据的增删改查(CRUD)。
实际上学习的主要是sql语句、因为node连接MySQL数据是很简单的。
##### 1.2 node操作Mongodb数据库
使用 mongoose模块、它是一个MongoDB对象建模工具、设计用于异步环境支持promise和回调函数两个形式。
好处是不用在一数据库是否连接上就可以设计模型或者进行数据的curd操作。
安装:  npm install mongoose。
使用步骤:  
1. 引入 mongoose 模块:  const mongoose = require('mongoose')
2. 创建连接对象、mongoose.connect()方法只创建一个数据库连接,mongoose.createConnection()方法可以创建多个数据库连接。这两个方法接收的形参是一样的、一般我们使用一个数据库所以使用mongoose.connect()。
如:  连接本地的express-test 数据库写法如下、注意如果localhost不起作用使用127.0.0.1代替。线上远程服务器地址就写远程的、本质是一样的。
await mongoose.connect('mongodb://localhost:27017/express-test',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
},err => {
    if(err){
        console.log("数据库连接失败",err)
        return
    }
    console.log("数据库连接成功!")
})
3. 定义模型、对数据库中的数据进行curd操作。
如此这样只要在入口文件中引入这个文件就连接上数据库并能操作数据了、但是定义模型这一步一般抽离到另外的js文件中书写。所以我们一般是会封装一个只负责连接数据库的异步函数导出、然后在入口文件中引入执行这个异步函数即可、具体如下。
module.exports = async app => {
  // 1. 引入 mongoose 模块
  const mongoose = require('mongoose')
  // 2. 创建一个连接
  await mongoose.connect('mongodb://localhost:27017/express-test', 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    },err => {
      if(err){
        console.log("数据库连接失败",err)
        return
      }
      console.log("数据库连接成功!")
    }
  )
}
4. 在models文件夹中定义模型字段,类似mysql中定义表及表的字段和字段约束。
通过mongoose模块的 Schema接口定义文档结构包含的字段名、字段约束以及存储数据的类型、通过model方法创建模型。
//引入mongoose模块
const mongoose = require('mongoose')
// 定义一个约束条件schema(集合里字段(field)的数据类型,默认值等)
const schema = new mongoose.Schema({
    name:{type:String,default:''},
    items:[{image:{type:String},url:{type:String},}]    
})
// 创建一个模型(集合对象模型)并导出
module.exports = mongoose.model('Ad',schema)
//上面实际上是下面的简写
// 注:  在定义schema那里其实可以分成两步写的
//1先获取schema对象
const Schema = moogoose.Schema
//2 new出规范实例
const Adschema = new Schema({
    name:{type:String},
    items:[{image:{type:String},url:{type:String},}]    
})
//3使用model方法创建数据模型
const Ad = mongoose.model('Ad', Adschema)
//4导出Ad、这样就可以通过Ad这个变量对象来操作“广告”这个集合(表)了
module.exports = Ad
// 明显的这种写法过于麻烦作用记住前面那种即可。

5. 在controller中引入模型实现对数据库的curd操作
// 引入数据库集合
const Product = require('../models/productModel')
//使用 集合名.各种方法名 集合实现对mongodb数据库的各种操作。
Product.find()



##### 1.3 node操作Redis数据库
redis模块


#### 2. lodash模块
Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。
用来处理字符串、遍历数组(里面是对象的)、对象时都可以考虑使用
安装:  npm install lodash
引入:  const _ = reuqire('lodash')

#### 3. inflection模块
安装:  npm install inflection
转化英文单复数、转化为驼峰格式的类名等可以考虑使用inflection库

#### 4. dayjs模块
Day.js 是一个轻量的处理时间和日期的 JavaScript 库、和 Moment.js 的 API 设计保持完全一样。
特点:  有很多 API 来解析、处理、校验、增减、展示时间和日期。
    和 Moment.js 相同的 API 和用法
    不可变数据 (Immutable)
    支持链式操作 (Chainable)
    国际化 I18n
    仅 2kb 大小的微型库
    全浏览器兼容

安装:  npm install dayjs --save

























## 2.6 nodejs登陆功能的实现
登陆功能业界已有成熟的解决方案、学习即可。
核心是登陆信息怎么校验以及登陆信息怎么存储。
### 2.6.1 cookie
1.  cookie
在开始之前要回到之前学习的http协议是无状态的、也就是说这次发起了http请求在连接关闭后、服务端不会记录用户的信息、下次你再发起http请求时、服务器还是无法判断你是谁、这也就是无状态的含义。这时就需要一种技术让服务器能记住我是谁、即解决 "如何记录客户端的用户信息"的问题。
Cookie 就是用于存储 web 页面当前用户信息的一小段的文本信息、本质是以名/值对形式（key-value格式）存储在浏览器端(客户端)的一段字符串(最大5kb)。

cookie的机制:  
客户端第一次发送一个请求到服务器 --》 这时由于是第一次肯定是没有cookie的
服务器在接收到前端发送的请求时、会生成一个唯一的信息(如用户id)其实也就是cookie、并通过http响应头的Set-Cookie字段把cookie返回给客户端、 --》
客户端在接收到响应头后取出cookie并保存在浏览器中、之后再向服务器发送http请求时、都将这个Cookie放在http请求头中一起发送给服务器端 --》
服务器再次接收到请求时、检查请求头中是否存在cookie、存在则返回响应数据给前端即可。如此整个流程也就走完了一次。

cookie的属性项
属性项 	属性项介绍
形式:  NAME=VALUE 键值对、可以设置要保存的 Key/Value、注意这里的 NAME 不能和其他属性项的名字一样
Expires 	过期时间、在设置的某个时间点后该 Cookie 就会失效,不设置则关闭浏览器窗口时消失。
Domain 	生成该 Cookie 的域名、如 domain="www.baidu.com"
Path 	该 Cookie 是在当前的哪个路径下生成的、如 path=/wp-admin/
Secure 	如果设置了这个属性、那么只会在 SSL 连接时才会回传该 Cookie

特点:  
    跨域不共享:  浏览器为每一个不同的域名存储一段cookie
    格式如 key=value; k1=v1;k2=v2;k3=v3; 可以结构化存储数据了、
    每次发送http请求、都会把请求域(向谁请求)中的cookie一起发送给后端(server端)。
    server端可以修改cookie的值并返回给浏览器(res)。
    浏览器也可以通过js修改cookie但是有限制、一般只能设置过期时间等
    支持设置为 HttpOnly、防止 Cookie 被客户端的 JavaScript 访问。

在浏览器端是可以直接操作cookie的、通过document.cookie 属性来创建 、读取、及删除 cookie。
读取:  const x = document.cookie;
设置/修改:  document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
删除 cookie 非常简单。只需要设置 expires 参数为以前的时间即可。但是一般不这样操作。

前端在接收到服务器端返回的cookie信息时一般是存储在浏览器localStorage和sessionStorage中、这就又是另外的知识了。

2. localStorage本地存储
一种持久化的存储方式、也就是说如果不手动清除、数据就永远不会过期。
它是采用键值对的方式存储数据、按域名将数据分别保存到对应数据库文件里。
相比 Cookie 来说、它能保存更大的数据。
localStorage 的特点:  
    大小限制为 5MB ~10MB；
    在同源的所有标签页和窗口之间共享数据；
    数据仅保存在客户端、不与服务器进行通信；
    数据持久存在且不会过期、重启浏览器后仍然存在；
    对数据的操作是同步的。
常用api:  
    // 通过setItem()增加一个数据项
    localStorage.setItem('myName', 'Semlinker');
    // 通过getItem()获取某个数据项
    let me = localStorage.getItem('myName');
    // 通过removeItem()移除某个数据项
    localStorage.removeItem('myName');
    // 移除所有数据项
    localStorage.clear();

3. sessionStorage会话存储
与服务端的 session 类似、sessionStorage 是一种会话级别的缓存、关闭浏览器时数据会被清除。
需要注意的是 sessionStorage 的作用域是窗口级别的、也就是说不同窗口之间保存的 sessionStorage 数据是不能共享的。

sessionStorage 的特点:  
    sessionStorage 的数据只存在于当前浏览器的标签页；
    数据在页面刷新后依然存在、但在关闭浏览器标签页之后数据就会被清除；
    与 localStorage 拥有统一的 API 接口；对数据的操作是同步的。
常用api:  
    // 通过setItem()增加一个数据项
    sessionStorage.setItem('myName', 'Semlinker');
    // 通过getItem()获取某个数据项
    let me = sessionStorage.getItem('myName');
    // 通过removeItem()移除某个数据项
    sessionStorage.removeItem('myName');
    // 移除所有数据项
    sessionStorage.clear();
这上面是浏览器端也就是前端操作cookie。

node后端操作cookie、进而实现登陆验证。
通过 req.headers.cookie 可以获取前端请求头中携带的cookie数据。

通过 res.setHeader('Set-Cookie',`username=${data.username};path=/;httpOnly;expires=${getCookieExpires()};Secure`)、服务器端可以设置响应头信息返回cookie。

### 2.6.2 session
事实上使用上面的cookie已经可以实现用户的登陆验证了、不过使用cookie存储会暴露username(用户名、手机号、邮箱名等)等个人重要信息所以是很危险的。
解决方法:  cookie中存储userId,后端保存对应的敏感信息如username。
这样只要后端的username与userId唯一对应就好。
本质上session是服务器端内存中的一个内存区域也就是一个对象、它存储了userId与真正用户名对应的信息。
它是一种解决cookie存储缺点的方法



session写入redis










# 四、其它后端知识 
## 3.1 nginx的使用
## 3.2 线上环境部署