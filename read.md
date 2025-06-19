# 一、概述

1. 2024.1.26 重新梳理node知识体系、开始深入学习。目前node稳定版本已经是 v20.11.0 比我刚开始学时可以说是变化非常大的。 同时node本身知识点又是比较松散、所以这次重新梳理旨在构建一个自己掌握知识的知识体系。

2. 2024.5.24 nodejs官网更新版本已经更新到 v20.13.1、要尝试写文章输出了。 last dance。

3. 2025.6.4 增加eslint+commitlint，包管理器换为pnpm，同时再一次梳理node知识体系。nodejs官网稳定版本已经是 v22.16.0，同时启用了[新官网](https://nodejs.org/)。可以说变化巨大。我们的目标还是一样理解后端思维争取做一个全栈前端。

# 二、准备工作

**node环境安装**
在[node官网](https://nodejs.org)下载稳定版本双击运行安装即可、安装成功之后在命令窗口中输入以下命令可以查看安装的node版本。在安装之后 node 和 包管理工具 npm 都已经安装完成。

**查看node和npm的版本信息**
安装完成之后可以通过以下命令查看node和npm的版本信息。
```bash
$ node -v
$ npm -v
$ npx -v
```

**node版本管理工具**
需要其它版本时只能卸载后重新安装、为此一般会使用版本管理工具这样可以管理多个node版本。在windows系统里一般是使用 [nvm](https://github.com/coreybutler/nvm-windows) 全称是 Node Version Manager(node版本管理工具)来管理多个node版本。好处是node版本切换方便。

**nvm常用命令如下:**
现在用的基本上最低都是 v8.x 以上的版本了因为它们都支持 ES6 特性、v12版本之后node开始支持ESM的模块化语法。个人在用v14、v16、v18等偶数主版本、社区最新版已经到v24.1.0了、LTS版也已经更新到v22.16.0(20250604)。

| 命令名               | 含义                                            |
| -------------------- | ----------------------------------------------- |
| nvm -v               | 查看nvm是否已正确安装及其版本。                 |
| nvm list             | 列举所有已安装的node版本(带*的表示当前用的版本) |
| nvm list available   | 查看所有node可安装版本                          |
| nvm current          | 显示node当前使用版本                            |
| nvm use 版本号       | 使用指定版本的node                              |
| nvm install 版本号   | 安装指定版本的node                              |
| nvm uninstall 版本号 | 卸载指定版本的node                              |
| nvm -h               | 查看帮助                                        |

**注意：**在linux系统里同样可以使用nvm来管理多个node版本。[nvm](https://github.com/nvm-sh/nvm)、跟着步骤安装即可。使用命令上是共同的。

# 三、Node.js 入门基础

**常用网址:**
1. [官方网站](https://nodejs.org) 主要用来查询相关api、
2. [中文网站](https://nodejs.cn) 主要用来查询相关api、
3. [npm中文网](https://www.npmjs.cn/)
4. [Nodejs学习指南](https://blog.poetries.top/node-learning-notes)社区学习网址

正如官方介绍的: Node.js 是一个免费、开源、跨平台的JavaScript运行时环境，允许开发人员创建服务器、web应用程序、命令行工具和脚本。目标是在任何地方运行JavaScript。

Node.js 真正用途或者说一般实际用途是: 运行在服务端作为web server(服务器)存在。也就是说对于我们前端工程师而言就是用来提供api接口的、它学习的难处在于服务器端的开发思路和套路与前端开发是不一样的、同时原生node是比较繁杂的。

我们主要要学习的就是这些思路和套路。

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
Node.js 是一个免费、开源、跨平台的JavaScript运行时环境(更进一步的说是在服务端的运行环境),并不是一门新的编程语言。它的作者是 Ryan Dahl、底层是使用c/c++编写的。

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

简单地理解就是 nodejs 提供了一种简单安全的方法在 JavaScript 中构建高性能和可扩展的网络应用程序即JavaScript可以当作后端语言使用了。


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
const { createServer } = require('node:http')

const hostname = '127.0.0.1'
const port = 3000

const server = createServer((req, res) => {
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
为了让node模块之间可以相互调用、Node.js提供了一个完整的模块加载系统-->即CommonJS规范。在v12版本之前、nodejs只使用Commonjs 规范。在 v12 版本之后也支持了ESM、这样就和前端一样了、但是这里还是介绍一下Commonjs 规范。

**注意:**  这里 .js文件 和模块是一一对应的、即:  一个 Node.js 文件就是一个模块、这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。所以创建一个模块是很简单的就是新建一个.js文件。

### 3.5.2 分类

可以简单地分为两类:  
1. 系统模块: nodejs原生提供的模块、调用时只写模块名称即可。
2. 第三方模块: 非 Node.js 自带的模块统称、调用时要写清楚路径地址。

### 3.5.3 使用

nodejs模块系统是基于 commonjs 规范的、一个单独的js文件就是一个模块、每一个模块都是一个单独的作用域、也就是说、在该模块内部定义的变量函数、对象等都运行在模块作用域中、无法被其他模块读取、除非为global对象的属性。这样不会污染到全局作用域、同时Node.js 采用了延迟加载的策略、即只有用到时模块才会被加载、且加载完成后会放到 binding_cache 中进行缓存、所以在第二次再引入相同的模块时不会重新加载。同时在编写或使用每个 node 模块时、都有 require()、exports、module 这三个nodejs预先定义好的变量可供使用。

#### 1. 模块引入 require()函数 

nodejs对所有模块的加载方法都是通过调用 require() 函数来加载和使用别的模块、这个函数接收一个字符串类型的模块名(原生和文件模块直接使用模块名、自定义模块要指定模块所在的位置)。
有四种使用格式:
1. 支持引入内置模块例如 http os fs child_process 等nodejs内置模块
2. 支持引入第三方模块express md5 koa 等
3. 支持引入自己编写的模块 ./ ../ 等
4. 支持引入addon C++扩展模块 .node文件


**注意:**  模块名中的.js扩展名可以省略、require() 函数的返回值是一个 node 模块导出对象 --> module.exports === {}、这个对象拥有加载模块向外暴露的所有属性和方法。可以定义一个变量接收这个对象返回值、这样就可以通过这个变量来调用模块向外导出的所有属性和方法。也可以直接解构需要的属性或方法。

```JavaScript

导入语法:  const 变量对象名 =  require('原生/文件模块名/自定义模块位置');
导入语法:  const {解构变量名} =  require('原生/文件模块名/自定义模块位置');
const fs = require('node:fs');  // 导入原生内置模块
const express = require('express');  // 导入安装到 node_modules 目录下的第三方模块
const myModule = require('./myModule.js');  // 导入相对路径下自己定义的模块
const nodeModule = require('./myModule.node');  // 导入扩展模块

```
原生和文件模块不做路径解析、直接返回内部模块的导出对象。自定义模块做路径解析。
1. 以 '/' 为前缀的模块是文件的绝对路径。
2. 以 './' 为前缀的模块是相对于当前调用 require() 文件的同级目录。
3. 以 '../' 为前缀的模块是相对于当前调用 require() 文件的上一级目录。
4. 当没有以 '/'、 './' 或 '../' 开头来表示文件时、这个模块必须是一个核心模块或加载自 node_modules 目录的文件模块。

#### 2.模块的导出 module 和 exports对象

每个 nodejs 模块都有一个全局对象 module、同时 module 对象中有一个属性exports(它本身又是一个对象)。
我们需要把模块希望暴露导出的属性和方法放入 module.exports 对象中、它是node模块真正的向外暴露属性和方法的出口、每个模块只能有一个、多个时后面的覆盖前面的。

```JavaScript
例如: a.js
function FunA(){
    return 'Tom';
}
const result = [1,2]

// 只能有一个
module.exports = {
    FunA,
    result,
    // 要导出的函数、
    // .....对象等等
}
// 使用export 导出、可以有多个
// 语法:  exports.导出变量名/导出方法名=模块内定义的变量名/方法名。
exports.FunA = FunA
exports.result = result

// 在 b.js里导入、这里假设他俩在同一层级
// b.js
const total = require('./a.js')
total.FunA
total.result
// 也可以解构出来
const {FunA,result} = require('./a.js')

// 另一种导出时就是 exports 对象、而exports对象的值本质上指向的是module对象。
const total = require('./a.js')
// 同样可以解构出来
const {FunA,result} = require('./a.js')


```

exports对象:  在模块中也使用这个对象向外暴露东西、它本身又是一个对象并且nodejs将一个指向module.exports的引用赋值给了exports、即exports的值(地址值)指向的就是module.exports对象。exports对象、可以理解为它是一个副本(简写形式)。

`const exports = modules.exports`


**注意:**  module.exports 和 exports 的区别
module.exports 才是node模块真正的导出接口、即在使用require()方法引入时得到的返回值就是这个
module.exports。一个模块文件中可以有多个exports输出、但只能有一个module.exports输出。
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

包管理器又称软件包管理系统、它是在电脑中自动安装、配制、卸载和升级软件包的工具组合、在各种系统软件和应用软件的安装管理中均有广泛应用。而在我们安装node的同时也会自动把npm也安装上、npm(全称node package manager)Node.js的标准包管理器的简称、它是一个命令行工具、用于下载和管理node开发中需要到的各种模块/包/插件。可以在[官网](https://www.npmjs.com/) 上搜索你想要安装的模块。目前社区也有 yarn and pnpm 两种工具作为替代品也是可以使用的。

常用命令如下:  
```bash
$ npm -v === npm --version # 查看当前安装的 npm 版本信息
$ npm init -y # 快速初始化一个node项目
$ npm install # 安装一个包或一组包，并且会在当前目录存放一个node_modules。
$ npm install package-name   #  在本目录下增加一个node_modules并在这个目录里安装指定模块
$ npm install package-name@version # 安装指定版本的包
$ npm uninstall package-name   # 删除或者说卸载指定模块
$ npm list # 查看当前目录安装了哪些模块。
$ npm config list # 查看当前电脑主机安装了哪些全局模块。
$ npm show package-name # 显示指定模块的详情
$ npm update package-name # 升级当前目录下的项目的所有模块、也可在后面指定模块名升级。
$ npm config get registry # 查看当前 npm 源即npm 包的下载地址。
$ npm config set registry=https://registry.npm.taobao.org  # 切换为 taobao 源
$ npm run script-name # 执行 package.json 文件中定义的脚本命令启动node项目。
$ npm config list # 用于列出所有的 npm 配置信息。
$ npm run script-name # 执行 package.json 文件中定义的脚本命令。
$ npm outdated # 列出当前项目中需要更新的包。
$ npm publish # 发布自己开发的包到 npm 库中。
$ npm login # 登录到 npm 账户。
$ npm logout # 注销当前 npm 账户。
```

**node项目从零开发一般流程如下:**

1. <strong> 先初始化为node项目</strong>

方法:  使用`$ npm init / npm init -y `初始化为node项目(-y 表示快速初始化node项目包管理文件 package.json)。将来要安装的模块/包的信息都会记录在这个 package.json 文件中且包含有描述当前node项目的其它各种信息。它是一个包含当前项目相关信息的 json 格式配置文件。
常见属性如下:
```json
{
    "name" : "包名/当前项目名称",
    "version" : "包的版本号/项目的版本号",
    "description" : "包的描述信息/项目的描述信息",
    "keywords" : "描述当前项目的关键字",
    "main" :"index.js", // main 字段指定了node项目程序的主入口文件、即使用node命令启动项目时的入口文件、使用require('moduleName') 就会加载这个文件、这个字段的默认值是模块根目录下面的 index.js、也可以自定义指定位置的文件作为入口文件。主要负责调度组成整个程序的其它模块完成工作
    "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "serve": "cross-env NODE_ENV=dev nodemon 入口文件位置",
       "prd": "cross-env NODE_ENV=production pm2 start 入口文件位置"
    },
    // 这个选项叫npm脚本指定了node项目运行脚本命令的npm命令行缩写、即启动node项目的自定义命令、用来代替 node 运行文件名 这样启动js文件的方式。可以通过npm run 查看定义了哪些脚本命令。
    // 语法:  npm run 自定义的命令。(自定义的命令是scripts中的键、如果定义为start时则run可以省略)。上面开发环境就是:  npm run serve、生产环境就是:  npm run prd
    "author" : "包的作者/项目的作者",
    "license": "ISC","项目使用的开源协议"
    "contributors" : "包/项目的其他贡献者",
    "repository": {
       "type": "git",
       "url": "git+https://github.com/zangqingan/nodeStudy.git"
    },
    // 包/项目代码的远程仓库信息、包括type和URL、type可以是git或svn、URL则是远程的仓库地址。
    "homepage": "https://github.com/zangqingan/nodeStudy#readme", // 当前项目远程仓库的readme.md 文件地址。
    "dependencies": {
       "mongoose": "^5.8.3"
    }、
    // 生产环境依赖、指定了项目运行时（即生产环境所依赖的模块列表）所依赖的模块、不装项目运行不了。
   // 它们将会被安装在当前目录的 node_modules 目录下。
    "devDependencies": {
       "cross-env": "^7.0.3"
    }
    // 开发环境依赖 指定了项目开发时所依赖的模块、发布时用不到它。
}

```

2. <strong>安装开发中实际用到的各种模块</strong>

安装/卸载语法: 
` npm install/uninstall 包名/模块名@version   --sava / --save-dev / -g。`

后面没有参数时默认会把模块直接安装到当前目录的node_modules目录中、同时模块相关的版本信息会放到包管理文件 package.json 的 dependencies 生产依赖选项中。
    @version 指定模块的版本可选。
    --save === -S 模块安装到生产依赖dependencies中、即: 模块信息自动写入package.json中的。"dependencies" 节点选项中。项目发布上线之后还会依赖用到的模块、没有这些模块、项目不能运行。
    --save-dev === -D 模块安装到开发依赖中、即:  模块信息自动写入package.json中的 "devDependencies" 节点选项。项目上线之后不会用到的模块、例如'babel-loader'等。
    -g,表示全局安装、就可以在任何项目的目录下使用。一般如 nodemon pm2等常用和项目无关的模块会全局安装。
在 v5版本之前需要显性声明 --save、之后不带参数时默认就是放到 "dependencies"中。

**注意:**  模块信息由模块名、模块版本信息组成。而版本号的格式如下:  
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

3. <strong>正式使用各种模块</strong>
根据项目的实际需求在 .js 文件中编写具体的代码即可、具体使用查看对象包文档提供的api接口即可。

## 3.7 npx 命令
npx是一个命令行工具，它是npm 5.2.0版本中新增的功能。它允许用户在不安装全局包的情况下，运行已安装在本地项目中的包或者远程仓库中的包。npx的作用是在命令行中运行node包中的可执行文件，而不需要全局安装这些包。这可以使开发人员更轻松地管理包的依赖关系，并且可以避免全局污染的问题。它还可以帮助开发人员在项目中使用不同版本的包，而不会出现版本冲突的问题。

**npm 和 npx 区别**
1. npx侧重于执行命令的，执行某个模块命令。虽然会自动安装模块，但是重在执行某个命令
2. npm侧重于安装或者卸载某个模块的。重在安装，并不具备执行某个模块的功能。

npx 的运行规则和npm 是一样的 本地目录查找.bin 看有没有 如果没有就去全局的node_moduels 查找，如果还没有就去下载这个包然后运行命令，然后删除这个包。

## 3.8 nodejs程序Debug调试

调试是每一个开发人员都要遇到的问题、选择一个合适的调试工具也尤为重要。 在 Node.js 开发过程中除了万能的 console.log 之外、还可以通过编辑器的调试工具或者其它的工具。


## 3.9 node常见全局变量
在nodejs中使用 global 变量定义，ECMAscriptAPI基本都能用。
process对象是一个全局对象，可以在任何模块中直接访问，无需导入或定义。


# 四、Node.js 内置核心模块

node系统模块也是比较多的、对应的api也很多不过主要学一些常见的模块及对应的api即可。
Node.js 最常见的例子是作为web服务器、这也是我们只要基础时主要学习的东西。
就是写一个后端服务给自己提供接口。所以第一个模块我们学习 http 网络服务模块。

## 4.1 http 网络服务模块

### 4.1.1 概述

http模块可以说是nodejs最核心的模块、同时也是比较复杂的一个模块。可以很方便地创建作为web server的HTTP服务器和客户端。上手很简单、但一旦深入学习也很难因为它要学习网络协议等其它相关的知识。

1. 服务器server:  接收来自客户端(浏览器)的请求、并将客户端请求的地址返回给客户端。
2. 客户端client:  向服务器发起请求、并将服务器返回的内容打印到控制台。
   

**常见应用**
1. 创建 Web 服务器：你可以使用 "http" 模块创建一个 HTTP 服务器，用于提供 Web 应用程序或网站。通过监听特定的端口，服务器可以接收客户端的请求，并生成响应。你可以处理不同的路由、请求方法和参数，实现自定义的业务逻辑。
2. 构建 RESTful API："http" 模块使得构建 RESTful API 变得简单。你可以使用 HTTP 请求方法（如 GET、POST、PUT、DELETE 等）和路径来定义 API 的不同端点。通过解析请求参数、验证身份和权限，以及生成相应的 JSON 或其他数据格式，你可以构建强大的 API 服务。
3. 代理服务器："http" 模块还可以用于创建代理服务器，用于转发客户端的请求到其他服务器。代理服务器可以用于负载均衡、缓存、安全过滤或跨域请求等场景。通过在代理服务器上添加逻辑，你可以对请求和响应进行修改、记录或过滤。
4. 文件服务器："http" 模块可以用于创建一个简单的文件服务器，用于提供静态文件（如 HTML、CSS、JavaScript、图像等）。通过读取文件并将其作为响应发送给客户端，你可以轻松地构建一个基本的文件服务器。


**例子**

```js

// const http = require('http');
import http from 'http';

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
```js
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
```js
HTTP响应信息:  response即服务器端返回给客户端的信息。
由以下四部分
   响应状态行:
   响应头:  放置本次响应的相关信息、是键值对的格式。
   响应正文:  服务器端返回给客户端的数据
   空行:
```

在node作为web server时、每次客户端发送请求时就会触发http.createServer函数的参数回调函数中的两个对象request、response。本质上是每当服务器被请求时就会触发request事件函数。

### 4.1.3 request对象
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
| ---------- | ----------------- |
| get        | GET               |
| post       | POST              |
| put        | PUT               |
| patch      | PATH              |
| update     | UPDATE            |
| delete     | DELETE            |
```


### 4.1.4 response对象
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


## 4.2 fs 文件系统操作模块

文件是否存在判断、新建、写入、读取、更改文件权限等是比较常用的功能。然后api一般都有同步、回调函数(异步)、基于promise(从fs/promises导出)三种。常见是读取文件、写入日志等。**注意路径问题!**

### 4.2.1 文件夹(目录)相关操作
常见读取某一个文件夹内所有文件的文件名进而批量注册路由或者中间件是比较常用的、或者创建删除一个新的目录。
目录已存在新建会报错、删除不存在的目录也会报错。

```js
// const fs = require('node:fs')//现在最新已经是这样引入了、同步和异步版本
// const fs = require('node:fs/promises') // 引入promise版本
import fs from "node:fs";
import asyncFs from "node:fs/promises";

// 同步-创建目录
try{
  fs.mkdirSync('./hello')
  console.log('创建目录成功');
}catch(err){
  console.log(err,'新建目录失败')
  throw err;
}
// 异步回调-创建目录
fs.mkdir('./async',(err) => {
  if(err) {
    console.log(err,'新建目录失败')
    throw err;
  }
})
// 基于promise-创建目录
asyncFs.mkdir('/promise').then(res => {
  console.log('res',res)
})

// 同步-删除目录
try {
  fs.rmdirSync('./hello')
} catch (err) {
  console.log(err,'删除目录失败')
  throw err;
}
// 异步-删除目录
fs.rmdir('./async',(err) => {
  if(err) {
    console.log(err,'删除目录失败')
    throw err;
  }
})
// 基于promise-删除目录
asyncFs.rmdir('./async').then(res => {
  console.log(res,'删除目录成功')
}).catch(err => {
  console.log(err,'删除目录失败')
  throw err;
})

// 读取文件夹内的所有文件
fs.readdir('./',(err,data) =>{
    //判断是否读取成功,成功返回结果在回调函数的第二个参数里
    if(err == null && err ==undefined){
        console.log(err,'读取成功', data)
    }else{
        console.log('read fail!')
        throw err;
    }
})

```

### 4.2.2 文件相关操作
文件主要是读取或写入文件内容、一般会和path、流等知识点一起使用。

```js
import fs from "node:fs";
import path from "node:path";
// 读取文件内容
const fullFileName1 = path.resolve(__dirname,'../','../','public','files','a.json')
const fullFileName2 = path.join(__dirname,'../','../','public','files','a.json')
console.log(fullFileName1)
console.log(fullFileName2)
fs.readFile(fullFileName1,{encoding:'utf-8'},(err,data) => {
    if(err){
        console.error(err)
        return
    }
    console.log(data.toString())
})
// 写入方法有两个
const fullFileName = path.join(__dirname,'../','../','public','readfiletest.txt')
fs.writeFile(
  fullFileName,
  '我是用异步方法新写入的内容它会追加到之前文件内容的后面',
  {encoding:'utf-8',flag:'a'},
  (err,data)=>{
    if(err)throw err
    console.log('异步方法data写入成功：',data)//undefined
})
const data = '/n 我是用appendFile方法新写入的内容它不会覆盖之前文件所有的内容'
fs.appendFile(
  fullFileName,
  data,
  {encoding:'utf-8'},
  (err,data) => {
    if (err) throw err;
    console.log('数据已追加到文件',data);
})

// 流操作
const fullFileName = path.join(__dirname,'../','../','public','readfiletest.txt')
const readStream =  fs.createReadStream(fullFileName,{encoding:'utf-8'})
let data = ''
readStream.on('data',chunk => {
  data += chunk
})
readStream.on('end', () => {
  console.log('data读取结束')
  // 直接写入流
  writeLog(accessLog,data)
})
readStream.on('error', err => {
  console.log(err)
})
// 定义一个写入流函数
function createWriteStream(filename){
  const fullFileName = path.join(__dirname,'../','../','public/logs',filename)
  // 写入流
  const writeStream = fs.createWriteStream(fullFileName,{flags:'a',encoding:'utf-8'})
  return writeStream
}
// 访问日志
const accessLog = createWriteStream('access.log')
// 错误日志
const errorLog = createWriteStream('error.log')

// 定义一个写入函数
function writeLog(writeLogStream,log){
  writeLogStream.write(`${log}\n`)
}
// 管道写入流
readStream.pipe(errorLog)


```


## 4.3 path 路径处理模块
系统中的每个文件都有一个路径,path模块在不同的操作系统是有差异的(windows | posix)。
在Linux和macOS上，路径可能看起来像:/users/joe/file.txt，
而Windows计算机则不同，并且具有如下结构:C:\users\joe\file.txt
path模块是nodejs中提供的一个处理路径的模块、在nodejs中这个模块使用频率也是比较高的、主要是路径的获取、拼接、解析。

```javaScript
const path = require('node:path');

/**
 * path.extname() 方法返回文件的扩展名
 * path.basename() 方法返回 path 的最后一部分,即取最后一层(取文件名)。
 * path.dirname() 方法返回 path 的目录名，去掉最后一层(去掉文件名)
 * path.parse() 方法将一个路径解析为对象格式
 * path.format() 方法将一个路径对象格式解析为路径字符串
 */
const testpath1 = 'W:/VSCodeProjects/nodeStudy/readme.md'
console.log('取到文件的扩展名',path.extname(testpath1))// .md
console.log('取到的是文件名',path.basename(testpath1))//readme.md
console.log('取到的是文件目录名',path.dirname(testpath1))//W:/VSCodeProjects/nodeStudy
console.log('将一个路径解析为对象格式',path.parse(testpath1))//{root: 'W:/',dir: 'W:/VSCodeProjects/nodeStudy', base: 'readme.md',ext: '.md', name: 'readme'}
console.log('将一个对象格式的路径转为字符串格式',path.format(path.parse(testpath1)))//W:/VSCodeProjects/nodeStudy/readme.md
const testpath2 = 'http://img.doutula.com/production/uploads/image/2020/05/21/20200521045427_yIPwpZ.jpg'
console.log('取到文件的扩展名',path.extname(testpath2))// .jpg
console.log('取到的是文件名',path.basename(testpath2))// 20200521045427_yIPwpZ.jpg
console.log('取到的是文件目录名',path.dirname(testpath2))// http://img.doutula.com/production/uploads/image/2020/05/21
console.log('将一个路径解析为对象格式',path.parse(testpath2))//{root: '',dir: 'http://img.doutula.com/production/uploads/image/2020/05/21', base: '20200521045427_yIPwpZ.jpg',ext: '.jpg', name: '20200521045427_yIPwpZ'}

/**
 * path.resolve() 方法用来拼接路径,将给定的路径序列从右到左进行处理，后面的每个 path 会被追加到前面，直到构造出绝对路径。
 * 如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。
 * 
 * path.join() 方法使用平台特定的分隔符作为定界符 Windows系统下是\，而在Linux系统下是/。
 * 将所有给定的 path 片段连接在一起，然后规范化生成的路径。
 * 
 * resolve()和join()方法两者是差不多的。
 * __dirname 当前文件所在系统的绝对路径
 * __filename 当前文件所在系统的绝对路径加上文件名
 */
const fullFileName1 = path.resolve(__dirname,'../','../','public','readfiletest.txt')
const fullFileName2 = path.join(__dirname,'../','../','public','readfiletest.txt')
console.log('resolve：',fullFileName1)
console.log('join：',fullFileName2)
// 当前文件所在的文件名
console.log('__dirname',__dirname)// E:\Full-stack-Engineer\studyNotes\node-study\src\studyModel
console.log('__filename',__filename) // E:\Full-stack-Engineer\studyNotes\node-study\src\studyModel\path-study.js
```

## 4.4 events 事件处理模块
node中的模块很多都继承了events模块(使用对象冒充的方式)，比如http、fs等使用的on()方法就是继承的api。
它是通过其中的 EventEmitter类 来定义和触发事件、本质是观察者模式的实现、类似发布/订阅模式。
一定是先注册后触发、同一事件多个事件触发器按顺序执行。监听数量默认十个，

```js

/**
 * node原生事件模块events
 * 通过events的EventEmitter类实现对事件的绑定监听和触发
 */
const events = require('node:events')
import events from "node:events";

// 创建eventEmitter实例对象
const myEventEmitter = new events.EventEmitter()


// 定义事件名并绑定对应的回调函数
myEventEmitter.on('eventname',(msg) => {
    console.log(`事件触发时传入的信息: ${msg}`)
})

// 在想触发事件的地方写上就会触发定义的事件
myEventEmitter.emit('eventname','事件触发了')

/**
 * 如果想要自定义的话，es5之前时通过原型链的继承实现
 * 而es6之后可以直接通过类实现
 */
// es5
function SelfEmitter() {
    events.EventEmitter.call(this)
}
const self = new SelfEmitter()
Object.setPrototypeOf(SelfEmitter.prototype, events.EventEmitter.prototype);
Object.setPrototypeOf(SelfEmitter, events.EventEmitter)
self.on('self',(msg) => {
    console.log('自定义es5类继承',msg)
})
self.emit('self','11')

// es6
class MyEmitter extends events.EventEmitter {}
const man = new MyEmitter()
function wakeup(){
    console.log('man has woken up')
}
man.on('wakeup', wakeup)
man.emit('wakeup')
man.removeListener('wakeup', wakeup);

```

## 4.5 stream 流模块
流是Node.js中处理流数据的抽象接口、stream模块提供了实现流接口的API。
平常一般不会直接用到stream模块这是因为很多其它模块都实现了这个接口、例如: 对http 服务器发起请求的request，response 对象就都是一个 Stream实例，还有stdout（标准输出）。同时所有的 Stream 对象又都是 EventEmitter 的实例、所以也继承了事件相关的属性和方法。
常用的事件有：
1. end - 没有更多的数据可读时触发。
2. error - 在接收和写入过程中发生错误时触发。
3. data - 当有数据可读时持续触发。
4. finish - 所有数据已被写入到底层系统时触发。


**Nodejs有四种流类型：**
1. Writable - 可以写入数据的流、比如fs.createWriteStream()、http.IncomingRequest、process.stdin。
2. Readable - 可以从中读取数据的流、比如fs.createReadStream()。
3. Duplex - 可读和可写的流、比如 net.Socket()。
4. Transform - 可以在写入和读取数据时修改或转换数据的双工流、比如 zlib.createDeflate()（数据压缩/解压）。。

## 4.6 readline 逐行读取模块
主要用来实现逐行读取，比如读取用户输入，或者读取文件内容。
**常见使用场景如下**
1. 文件逐行读取：比如说进行日志分析。
2. 自动完成：比如输入npm，自动提示"help init install"。
3. 命令行工具：比如npm init这种问答式的脚手架工具。

```javaScript
// 主要用到一个api用来创建一个新的readline实例
const rl = readline.createInterface({
  input: '要监听的可读流、必填',
  output: '',
  completer: '按tab时自动完成的函数'

})
// rl.question(msg,callback)、它会在控制台输入一行提示，当用户完成输入，敲击回车，cbk就会被调用，并把用户输入作为参数传入。
rl.question('请选择yes/no',(answer) => {
  if(answer === 'yes') {

  }
  if(answer === 'no) {

  }
})

```

```javaScript
// 在命令行工具输入
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Please input a word: ', function(answer){
    console.log('You have entered [%s]', answer.toUpperCase());
    rl.close();
});

// 自动完成：代码提示-当用户输入npm时，按tab键，自动提示用户可选的子命令，如help、init、install。
function completer(line) {
    const command = 'npm' 
    const subCommands = ['help', 'init', 'install'] 
    // 输入为空，或者为npm的一部分，则tab补全为npm
    if(line.length < command.length){
        return [command.indexOf(line) === 0 ? [command] : [], line] 
    }
    // 输入 npm，tab提示 help init install
    // 输入 npm in，tab提示 init install
    let hits = subCommands.filter(function(subCommand){ 
        const lineTrippedCommand = line.replace(command, '').trim() 
        return lineTrippedCommand && subCommand.indexOf( lineTrippedCommand ) === 0 
    })
    if(hits.length === 1){
        hits = hits.map(function(hit){
            return [command, hit].join(' ') 
        }) 
    }
    return [hits.length ? hits : subCommands, line] 
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: completer
}) 
rl.prompt()


// 自定义命令行工具
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OHAI> '
});

const preHint = `
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`npm help json\` for definitive documentation on these fields
and exactly what they do.

Use \`npm install <pkg> --save\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
`;

console.log(preHint);

// 问题
let questions = [ 'name', 'version', 'author'];

// 默认答案
let defaultAnswers = [ 'name', '1.0.0', 'none' ];

// 用户答案
let answers = [];
let index = 0;

function createPackageJson(){
    var map = {};
    questions.forEach(function(question, index){
        map[question] = answers[index];
    });

    fs.writeFileSync('./package.json', JSON.stringify(map, null, 4));
}

function runQuestionLoop() {

    if(index === questions.length) {
        createPackageJson();
        rl.close();
        return;
    }
    
    let defaultAnswer = defaultAnswers[index];
    let question = questions[index] + ': (' + defaultAnswer +') ';
    
    rl.question(question, function(answer){
        answers.push(answer || defaultAnswer);
        index++;
        runQuestionLoop();
    });
}
runQuestionLoop();


```

## 4.7 process 进程模块
进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础，进程是线程的容器。

线程是操作系统能够进行运算调度的最小单位，首先我们要清楚线程是隶属于进程的，被包含于进程之中。一个线程只能隶属于一个进程，但是一个进程是可以拥有多个线程的。

process 是Nodejs操作当前进程和控制当前进程的API，并且是挂载到globalThis下面的全局API，所以不需要引入也可以直接使用。

通过它来获得node进程相关的信息，比如运行node程序时的命令行参数。或者设置进程相关信息，比如设置环境变量。

```js
// process 模块是node的全局模块、不需要引入也可以直接使用。
const process = require('node:process');
// 常见属性和方法
    process.env：环境变量，例如通过 process.env.NODE_ENV 获取不同环境项目配置信息
    process.pid：获取当前进程id
    process.ppid：当前进程对应的父进程
    process.platform：获取当前进程运行的操作系统平台
    process.cwd()：获取当前进程工作目录
    process.uptime()：当前进程已运行时间，例如：pm2 守护进程的 uptime 值
    进程事件：
      process.on('uncaughtException', cb) 捕获异常信息、
      process.on('exit', cb）进程退出监听
    三个标准流：
      process.stdout 标准输出、
      process.stdin 标准输入、
      process.stderr 标准错误输出

```

**常见用法**
```js
// 获取环境变量、根据不同的变量值使用不同的配置
if(process.env.NODE_ENV === 'production'){
    console.log('生产环境');
}else{
    console.log('非生产环境');
}




```

## 4.8 child_process 子进程模块
子进程是Nodejs核心API，如果你会shell命令，他会有非常大的帮助，或者你喜欢编写前端工程化工具之类的，他也有很大的用处，以及处理CPU密集型应用。

**常见使用场景**
1. 执行系统命令：比如执行npm install、git push等。
2. 执行脚本：比如执行一个node脚本、执行一个python脚本、执行一个php脚本等。

```js
// 引入模块
const { spawn, exec, execFile } = require('node:child_process');
// 执行系统命令
const child = spawn('ls', ['-lh', '/usr']);
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
child.stderr.on('data', (data) => {
 
})


## 4.9 buffer 缓冲区模块
用它来处理二进制数据，比如文件流的读写、网络请求数据的处理等。

### 4.8.1 概述
Buffer 用于读取或操作二进制数据流、将数据缓冲起来，它是临时性的、做为 Node.js API 的一部分使用时无需 require，用于操作网络协议、数据库、图片和文件 I/O 等一些需要大量二进制数据的场景。

所谓二进制数据就是使用 0 和 1 两个数码来表示的数据，这是计算机存储在内存中的数据。

对于流式数据，会采用缓冲区将数据临时存储起来，等缓冲到一定的大小之后在存入硬盘中。
而stream流是对输入输出设备的抽象，这里的设备可以是文件、网络、内存等。
流是有方向性的，当程序从某个数据源读入数据，会开启一个输入流，这里的数据源可以是文件或者网络等，例如我们从 a.txt 文件读入数据。相反的当我们的程序需要写出数据到指定数据源（文件、网络等）时，则开启一个输出流。当有一些大文件操作时，我们就需要 Stream 像管道一样，一点一点的将数据流出。

那么这么数据是怎么流动的呢?通常，数据的移动是为了处理或者读取它，并根据它进行决策。伴随着时间的推移，每一个过程都会有一个最小或最大数据量。如果数据到达的速度比进程消耗的速度快，那么少数早到达的数据会处于等待区等候被处理。反之，如果数据到达的速度比进程消耗的数据慢，那么早先到达的数据需要等待一定量的数据到达之后才能被处理。这里的等待区就指的缓冲区（Buffer），它是计算机中的一个小物理单位，通常位于计算机的 RAM 中。相当于一个临时存储区。

### 4.8.2 基本使用
学习内容主要是api的使用、包括Buffer实例的创建、比较、连接、拷贝、查找、遍历、类型转换、截取、编码转换等。
Buffer 实例是使用 Buffer 构造函数创建的，该函数根据提供的参数以不同方式分配返回的 Buffer。
在v10版本之后已经弃用改为使用Buffer.from()、Buffer.alloc() 与 Buffer.allocUnsafe() 三种方式来创建。
**创建方法**
1. Buffer.from(array,encoding)
2. Buffer.alloc(length)
3. Buffer.allocUnsafe(length)

Buffer 字符编码: 在创建buffer时可以指定字符编码以实现 Buffer 实例与 JavaScript 字符串之间的相互转换。
**支持的字符编码如下:**
1. 'utf8' - 多字节编码的 Unicode 字符不传递 encoding 默认按照 UTF-8 格式转换存储。许多网页和其他文档格式都使用 UTF-8。
2. 'ascii' - 仅适用于 7 位 ASCII 数据。此编码速度很快，如果设置则会剥离高位。
3. 'utf16le' - 2 或 4 个字节，小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
4. 'ucs2' - 'utf16le' 的别名。
5. 'base64' - Base64 编码。当从字符串创建 Buffer 时，此编码也会正确地接受 RFC 4648 第 5 节中指定的 “URL 和文件名安全字母”。
6. 'latin1' - 一种将 Buffer 编码成单字节编码字符串的方法（由 RFC 1345 中的 IANA 定义，第 63 页，作为 Latin-1 的补充块和 C0/C1 控制码）。
7. 'binary' - 'latin1' 的别名。
8. 'hex' - 将每个字节编码成两个十六进制的字符。

```javaScript
// 创建
const { Buffer } = require('node:buffer');
const buff1 = Buffer.from([1,4,'df'])
console.log('buff1',buff1) //buff1 <Buffer 01 04 00>
const bAlloc1 = Buffer.alloc(10); // 创建一个大小为 10 个字节的缓冲区
console.log(bAlloc1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

```

### 4.8.3 Buffer内存机制
由于 Buffer 需要处理的是大量的二进制数据，假如用一点就向系统去申请，则会造成频繁的向系统申请内存调用，所以 Buffer 所占用的内存不再由 V8 分配，而是在 Node.js 的 C++ 层面完成申请，在 JavaScript 中进行内存分配。因此，这部分内存我们称之为堆外内存。

Node.js 采用了 slab 机制进行预先申请、事后分配，是一种动态的管理机制。
使用 Buffer.alloc(size) 传入一个指定的 size 就会申请一块固定大小的内存区域。
**slab 具有如下三种状态：**
1. full：完全分配状态
2. partial：部分分配状态
3. empty：没有被分配状态

Node.js 以 8KB 为界限来区分是小对象还是大对象
1. 在初次加载时就会初始化 1 个 8KB 的内存空间，buffer.js 源码有体现。
2. 根据申请的内存大小分为 小 Buffer 对象 和 大 Buffer 对象。
3. 小 Buffer 情况，会继续判断这个 slab 空间是否足够。如果空间足够就去使用剩余空间同时更新 slab 分配状态，偏移量会增加。如果空间不足，slab 空间不足，就会去创建一个新的 slab 空间用来分配
4. 大 Buffer 情况，则会直接走 createUnsafeBuffer(size) 函数
5. 不论是小 Buffer 对象还是大 Buffer 对象，内存分配是在 C++ 层面完成，内存管理在 JavaScript 层面1. 终还是可以被 V8 的垃圾回收标记所回收。

### 4.8.4 应用

1. I/O 操作: 类似文件读取写入流操作、在 Stream 中我们是不需要手动去创建自己的缓冲区，在 Node.js 的流中将会自动创建。
2. 资源压缩: zlib模块就是利用了缓冲区（Buffer）的功能来操作二进制数据流，提供了压缩或解压功能。

## 4.10 zlib 资源解压缩模块
这个模块是用来对资源进行压缩和解压缩的、提供了多种解压缩方法，使用Gzip、Deflate/ inflation 和 Brotli 实现的压缩功能。使用 zlib 模块进行数据压缩和解压缩可以帮助优化应用程序的性能和资源利用。通过减小数据的大小，可以减少网络传输的时间和带宽消耗，同时减少磁盘上的存储空间。此外，zlib 模块还提供了丰富的选项和方法，使得开发者可以根据具体需求进行灵活的压缩和解压缩操作。

主要作用如下：
1. 数据压缩：使用 zlib 模块可以将数据以无损压缩算法（如 Deflate、Gzip）进行压缩，减少数据的大小。这在网络传输和磁盘存储中特别有用，可以节省带宽和存储空间。
2. 数据解压缩：zlib 模块还提供了对压缩数据的解压缩功能，可以还原压缩前的原始数据。
3. 流压缩：zlib 模块支持使用流（Stream）的方式进行数据的压缩和解压缩。这种方式使得可以对大型文件或网络数据流进行逐步处理，而不需要将整个数据加载到内存中。
4. 压缩格式支持：zlib 模块支持多种常见的压缩格式，如 Gzip 和 Deflate。这些格式在各种应用场景中广泛使用，例如 HTTP 响应的内容编码、文件压缩和解压缩等。

浏览器通过HTTP请求头部里加上 Accept-Encoding，告诉服务器使用何种方法压缩资源。

`Accept-Encoding:gzip, deflate`

**gzip 和 deflate 区别**
1. 压缩算法：Gzip 使用的是 Deflate 压缩算法，该算法结合了 LZ77 算法和哈夫曼编码。LZ77 算法用于数据的重复字符串的替换和引用，而哈夫曼编码用于进一步压缩数据。
2. 压缩效率：Gzip 压缩通常具有更高的压缩率，因为它使用了哈夫曼编码来进一步压缩数据。哈夫曼编码根据字符的出现频率，将较常见的字符用较短的编码表示，从而减小数据的大小。
3. 压缩速度：相比于仅使用 Deflate 的方式，Gzip 压缩需要更多的计算和处理时间，因为它还要进行哈夫曼编码的步骤。因此，在压缩速度方面，Deflate 可能比 Gzip 更快。
4. 应用场景：Gzip 压缩常用于文件压缩、网络传输和 HTTP 响应的内容编码。它广泛应用于 Web 服务器和浏览器之间的数据传输，以减小文件大小和提高网络传输效率。


```js
// 本地gzip压缩
const fs = require('fs');
const zlib = require('zlib');
// 压缩
const gzip = zlib.createGzip();
const inFile = fs.createReadStream('./extra/fileForCompress.txt');
const out = fs.createWriteStream('./extra/fileForCompress.txt.gz');
inFile.pipe(gzip).pipe(out);

// 解压
const gunzip = zlib.createGunzip();
const readStream = fs.createReadStream('index.txt.gz')
const writeStream = fs.createWriteStream('index2.txt')
readStream.pipe(gunzip).pipe(writeStream)


// 服务端开启gzip压缩
// 首先判断 是否包含 accept-encoding 首部，且值为gzip。
// 否：返回未压缩的文件。
// 是：返回gzip压缩后的文件。
// const http = require('http');
// const zlib = require('zlib');
// const fs = require('fs');
import http from "node:http";
import zlib from "node:zlib";
import fs from "node:fs";
const filepath = './extra/fileForGzip.html';
const server = http.createServer(function(req, res){
    const acceptEncoding = req.headers['accept-encoding'];
    let gzip;
    if(acceptEncoding.indexOf('gzip') != -1){ // 判断是否需要gzip压缩
        gzip = zlib.createGzip();       
        // 记得响应 Content-Encoding，告诉浏览器：文件被 gzip 压缩过
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        });
        // 使用管道将可读流中的数据通过 Gzip 压缩，再通过管道传输到可写流中进行写入
        fs.createReadStream(filepath).pipe(gzip).pipe(res);
    }else{
        fs.createReadStream(filepath).pipe(res);
    }
})
server.listen('3000');

```

## 4.11 crypto 加解密模块

Crypto 加密模块是 C／C++ 实现这些算法后，暴露为 javascript 接口的模块，包含对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。
密码学的知识是非常丰富的: 有对称加密算法、非对称加密算法、散列(哈希)算法(信息摘要算法)
1. 对称式加密就是加密和解密使用同一个密钥
2. 非对称式加密就是加密和解密所使用的不是同一个密钥，通常有两个密钥，称为“公钥”和“私钥”，它们两个必需配对使用，否则不能打开加密文件。这里的“公钥”是指可以对外公布的，“私钥”则不能，只能由持有人一个人知道。
3. 散列算法是指把任意长度的输入消息数据转化为固定长度的输出数据的一种密码算法。


**Cipher类** 用于加密数据，属于对称密钥加密，假设通信双方 A、B 通讯方 A 使用 key 对明文进行加密传输，通讯方 B 接收到密文后，使用同样的 key 进行解密得到明文。
在v10版本之后不在使用 crypto.createCipher 而是使用 crypto.createCipheriv()方法创建。
crypto.createCipheriv(algorithm, pwd, iv) 指定算法、密码、向量创建 cipher 加密对象

数据解密: 使用crypto.createDecipheriv() 方法
crypto.createDecipheriv(algorithm, pwd, iv) 指定算法、密码、向量创建 decipher 解密对象


**非对称加密** 是指加密秘钥和解密秘钥不同的密码算法，又称为 公开密码算法 或 公钥算法，该算法使用一个秘钥进行加密，用另外一个秘钥进行解密。加密秘钥可以公开，又称为 公钥。解密秘钥必须保密，又称为 私钥
常见非对称算法包括 RSA、SM2（国密）、DH、DSA、ECDSA、ECC 等。


**散列算法(信息摘要算法)**: 散列加密、是让大容量信息在数字签名软件签署私人秘钥前被 “压缩” 成一种保密格式，也就是把一个任意长度的字节串变换成一定长度的十六进制数字串（32个字符） 一致性验证。
特点
1. 不可逆
2. 输入两个不同的明文不会得到相同的输出值
3. 根据输出值，不能得到原始的明文，即过程不可逆

散列算法主要分为三大类
1. MD（Message Digest，消息摘要算法）、MD 系列 主要包括 MD2、MD4、MD5。
2. SHA（Secure Hash Algorithm，安全散列算法）、SHA 系列 主要包括 SHA-1、SHA-2 系列（SHA-1 的衍生算法，包含 SHA-224、SHA-256、SHA-384、SHA-512）。
3. MAC（Message Authentication Code，消息认证码算法）、MAC 系列 主要包括 HmacMD5、HmacSHA1、HmacSHA256、HmacSHA384 和 HmacSHA512 算法。

**哈希散列-Hash**
1. 先使用 crypto.createHash(algorithm) 方法创建一个hash对象。参数 algorithm 可选择系统上安装的 OpenSSL 版本所支持的算法: 常见sha1、md5、sha256、sha512等。
2. 使用 hash对象的实例方法 hash.update() 给给定的数据更新哈希内容。在流式传输新数据时，可以多次调用该方法。
3. 使用 hash对象的实例方法 hash.digest(encoding)计算所有传入数据的 hash 摘要。参数 encoding（编码方式）可以为 hex、binary、base64。声明了编码方式则返回字符串,否则返回Buffer实例。调用这个方法之后hash对象就报废了不能再次调用了。

```js
// 实现方法
const hash = crypto.createHash('sha256')
const msg = 'hello'
// 更新内容
hash.update(msg)
// 计算摘要
const result =  hash.digest('hex')
console.log(result) // 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

// 链式调用
const msg = 'hello'
const result = crypto.createHash('sha256').update(msg).digest('hex')
console.log(result) // 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824 

// 封装成一个函数
function hashSha256(data) {
    return crypto.createHash('sha256').update(data).digest('hex')
}
const otherResult = hashSha256(msg)
console.log(otherResult) // 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

```

**哈希加盐-HMAC**
HMAC的全称是Hash-based Message Authentication Code，也即在hash的加盐运算。
算是对哈希散列的一个加强,增加了加盐操作更加难破解。使用方法和步骤类似,多了一个指定“盐值”的操作。
1. 使用crypto.createHmac(algorithm, secret)方法创建并返回一个使用给定算法和密钥的Hmac对象。
2. 使用 hmac.update()方法
3. 使用 hmac.digest()方法

```js
const msg = 'hello'
function createSaltSha256(data,key='1qaz') {
    return crypto.createHmac('sha256',key).update(data).digest('hex')
}
const result = createSaltSha256(msg)
console.log(result)// c930f048e252abf8cda7fe936da95fa73f01b742fd5f3b618cf9f29fda229f22
const result2 = createSaltSha256(msg,'123')
console.log(result2) // 0ce62924a2ed57b5af99840366b2db54b5057a3d12e943bfcae51a6d04bac6f5

```
**MD5**: Message-Digest Algorithm 5，信息-摘要算法。和hash是一样的,算法参数传入'md5'即可。
常见的应用场景有
1. 密码保护: 将md5后的密码保存到数据库，而不是保存明文密码，避免拖库等事件发生后，明文密码外泄。
2. 下载文件校验: 比如从网上下载一个软件，一般网站都会将软件的md5值附在网页上，用户下载完软件后，可对下载到本地的软件进行md5运算，然后跟网站上的md5值进行对比，确保下载的软件是完整的
3. 防篡改：比如数字证书的防篡改，就用到了摘要算法。（当然还要结合数字签名等手段）

密码保护好处: 
1. 防内部攻击：网站主人也不知道用户的明文密码，避免网站主人拿着用户明文密码干坏事。
2. 防外部攻击：如网站被黑客入侵，黑客也只能拿到md5后的密码，而不是用户的明文密码。

md5也是hash的一种,通过之前的我们知道对相同内容加密后密文是一样的,这是存在安全隐患的。
所以一般在使用md5时也会增加加盐操作,而且盐值也是要随机产生的。
所谓加盐就是在密码特定位置插入特定字符串后，再对修改后的字符串进行md5运算。

```js
//md5 加盐后加密,盐值要存起来
function md5salt(data){
    let saltdata = `${data}:${Math.random().toString().slice(2, 5)}`
    return crypto.createHash('md5').update(saltdata).digest('hex')
}
//md5 加盐后解密,
function enmd5salt(data,salt){

}




```

## 4.12 cluster 集群模块
node实例是单线程作业的。在服务端编程中，通常会创建多个node实例来处理客户端的请求，以此提升系统的吞吐率。对这样多个node实例，我们称之为cluster（集群）。在cluster模块中，主进程称为master，子进程称为worker。

集群有以下两种常见的实现方案，而node自带的cluster模块采用的是第二种。
1. 多个node实例+多个端口,集群内的node实例，各自监听不同的端口，通过反向代理服务器向各端口服务进行转发
  - 优点：实现简单，各实例相对独立，这对服务稳定性高有好处。
  - 缺点：增加端口占用，进程之间通信比较麻烦。
2. 1 个 Node 实例开启多个进程监听同一个端口,通过负载均衡技术主进程向子进程转发请求(Master->Worker),集群内，创建一个主进程(master)，以及若干个子进程(worker)。由master监听客户端连接请求，并根据特定的策略，转发给worker。
  - 优点：通常只占用一个端口减少了端口的资源浪费，通信相对简单，转发策略更灵活。
  - 缺点：实现相对复杂，对主进程的稳定性要求较高。



## 4.13 os 操作系统模块
os 模块可以跟操作系统进行交互，提供了一些常用的方法，比如获取操作系统的信息、获取CPU信息、获取内存信息、获取磁盘信息、获取网络信息等。
应用：有一些后台系统需要知道用户的来源信息，或者根据系统类型执行对应的脚本文件。

```js
// const os = require("node:os");
// const { exec } = require("child_process");

import os from "node:os";
import { exec } from "child_process";

console.log(os.arch()); // 系统架构
console.log(os.platform()); // 系统平台
console.log(os.release()); // 系统版本
console.log(os.cpus()); // 系统CPU信息
console.log(os.freemem()); // 系统空闲内存
console.log(os.totalmem()); // 系统总内存
console.log(os.homedir()); // 系统用户的主目录
console.log(os.hostname()); // 系统主机名
console.log(os.tmpdir()); // 系统临时目录
console.log(os.type()); // 系统类型名
console.log(os.networkInterfaces()); // 系统网络接口信息

// 例子根据系统类型执行对应脚本
function openBrowser(url) {
  if (os.platform() === "darwin") {
    // macOS
    exec(`open ${url}`); //执行shell脚本
  } else if (os.platform() === "win32") {
    // Windows
    exec(`start ${url}`); //执行shell脚本
  } else {
    // Linux, Unix-like
    exec(`xdg-open ${url}`); //执行shell脚本
  }
}

// Example usage
openBrowser("https://www.juejin.cn");


```

## 4.14 util 工具类模块
util 是Node.js内部提供的很多实用或者工具类型的API，方便我们快速开发。


# 五、Node.js 扩展

## 5.1 cross-env 
cross-env 是跨平台设置和使用环境变量 不论是在Windows系统还是POSIX系统。
因为Windows平台无法直接设置环境变量、所以使用这个包。
在包管理文件的脚本选项中如下设置、之后在node系统模块-进程模块 process.end.NODE_ENV 就可以访问到当前变量值。
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

## 5.4 inflection模块
安装:  npm install inflection
转化英文单复数、转化为驼峰格式的类名等可以考虑使用inflection库

## 5.5 bcrypt模块
安装:  npm install bcrypt
给密码hash化的模块

## 5.6 lodash模块
Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。
用来处理字符串、遍历数组(里面是对象的)、对象时都可以考虑使用
安装:  npm install lodash
引入:  const _ = reuqire('lodash')


## 5.7 nodejs操作数据库
主要学习操作MySQL、mongodb、redis这三种数据库即可。

### 5.6.1 node操作MySQL数据库

#### 1 基础学习
通过第三方模块 mysql模块操作MySQL数据库实现数据的增删改查(CRUD)。
实际上学习的主要是sql语句、因为node连接MySQL数据是很简单的。

SQL（Structured Query Language）是一种用于管理关系型数据库系统的语言。它是一种标准化语言，用于执行各种数据库操作，包括数据查询、插入、更新和删除等。

```js
// 查询语句
SELECT xxx FROM yyy;
// xxx:可以是表的一个列字段名，或者多个列字段名(逗号隔开)，也可以是*表示查询所有列字段
SELECT `name` FROM `user`;
SELECT `name`,`id` FROM `user`;
SELECT * FROM `user`;
// 别名通过 as 关键字指定
SELECT `name` as `user_name`,`id` as `user_id` FROM `user`;
// 排序 ORDER BY [字段名称] desc降序(从大到小) asc 升序(从小到大)
SELECT `name` as `user_name`,`id` as `user_id` FROM `user` ORDER BY `id` DESC;
// 限制查询结果条数 limit [开始行] [限制条数] 如: LIMIT 0,10 从第0条开始查询10条
SELECT `name` as `user_name`,`id` as `user_id` FROM `user` ORDER BY `id` DESC LIMIT 0,10;
// 条件查询 需要把搜索条件放在WHERE子句中
SELECT `name` as `user_name`,`id` as `user_id` FROM `user` WHERE `id` = 1;
// 多个条件联合查询 and 操作符来连接多个搜索条件、or 操作符来连接多个搜索条件
SELECT `name` as `user_name`,`id` as `user_id` FROM `user` WHERE `id` = 1 AND `name` = '张三';
SELECT `name` as `user_name`,`id` as `user_id` FROM `user` WHERE `id` = 1 OR `name` = '张三';
// 模糊查询 模糊查询使用LIKE关键字，LIKE关键字通常与通配符%一起使用，百分号（%）是用作通配符，表示任意字符（包括零个字符或多个字符）的占位符。
// "王%"：匹配以"王"开头的字符串，后面可以是任意字符。
// "%王"：匹配以"王"结尾的字符串，前面可以是任意字符。
// "%王%"：匹配包含"王"的任意位置的字符串，前后可以是任意字符。
// 例如：
SELECT `name` as `user_name`,`id` as `user_id` FROM `user` WHERE `name` LIKE '王%';
SELECT `name` as `user_name`,`id` as `user_id` FROM `user` WHERE `name` LIKE '%王';
SELECT `name` as `user_name`,`id` as `user_id` FROM `user` WHERE `name` LIKE '%王%';

// 增删改
// 插入数据
INSERT INTO 表名 (`列字段名1`,`列字段名2`,`列字段名3`) VALUES (列字段名1对应值,列字段名2对应值,列字段名3对应值);
// 插入一条
INSERT INTO `user` (`name`,`age`,`sex`) VALUES ('张三',18,'男');
// 插入多条使用逗号隔开
INSERT INTO `user` (`name`,`age`,`sex`) VALUES ('张三',18,'男'),('李四',19,'女'),('王五',20,'男');

// 删除数据
DELETE FROM 表名 WHERE 条件;
// 删除一条
DELETE FROM `user` WHERE `id` = 1;
// 批量删除 使用 IN 操作符
DELETE FROM `user` WHERE `id` IN (1,2,3);

// 更新数据-更新的字段使用=赋值, where确定更新的数据
// UPDATE 表名 SET 列字段名1=列字段名1对应值,列字段名2=列字段名2对应值,列字段名3=列字段名3对应值 WHERE 条件;
// 更新一条
UPDATE `user` SET `name` = '张三',`age` = 18,`sex` = '男' WHERE `id` = 1;
// 批量更新 使用 IN 操作符，数据就一样了
UPDATE `user` SET `name` = '张三',`age` = 18,`sex` = '男' WHERE `id` IN (1,2,3);

// 表达式和函数
// MySQL表达式是一种在MySQL数据库中使用的计算式或逻辑式。它们可用于查询、更新和过滤数据，以及进行条件判断和计算。
// 算术表达式：可以执行基本的数学运算，例如加法、减法、乘法和除法。例如：
SELECT col1 + col2 AS sum FROM table_name;
// 字符串表达式：可以对字符串进行操作，例如连接、截取和替换。例如：
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM table_name;
// 逻辑表达式：用于执行条件判断，返回布尔值（TRUE或FALSE）。例如
SELECT * FROM table_name WHERE age > 18 AND gender = 'Male';
// 条件表达式：用于根据条件返回不同的结果。例如：
SELECT CASE WHEN age < 18 THEN 'Minor' ELSE 'Adult' END AS age_group FROM table_name;
// 聚合函数表达式：用于计算数据集的聚合值，例如求和、平均值、最大值和最小值。例如：
SELECT AVG(salary) AS average_salary FROM table_name;
// 时间和日期表达式：用于处理时间和日期数据，例如提取年份、月份或计算日期差值。例如：
SELECT YEAR(date_column) AS year FROM table_name;

// MySQL提供了大量的内置函数，用于在查询和操作数据时进行计算、转换和处理。以下是一些常用的MySQL函数分类及其示例：
// 字符串函数：
CONCAT(str1, str2, ...)：将多个字符串连接起来。
SUBSTRING(str, start, length)：从字符串中提取子字符串。
UPPER(str)：将字符串转换为大写。
LOWER(str)：将字符串转换为小写。
LENGTH(str)：返回字符串的长度。

// 数值函数：
ABS(x)：返回x的绝对值。
ROUND(x, d)：将x四舍五入为d位小数。
CEILING(x)：返回不小于x的最小整数。
FLOOR(x)：返回不大于x的最大整数。
RAND()：返回一个随机数。

// 日期和时间函数：
NOW()：返回当前日期和时间。
CURDATE()：返回当前日期。
CURTIME()：返回当前时间。
DATE_FORMAT(date, format)：将日期格式化为指定的格式。
DATEDIFF(date1, date2)：计算两个日期之间的天数差。

// 条件函数：
IF(condition, value_if_true, value_if_false)：根据条件返回不同的值。
CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ELSE result END：根据条件返回不同的结果。
// 聚合函数：
COUNT(expr)：计算满足条件的行数。
SUM(expr)：计算表达式的总和。
AVG(expr)：计算表达式的平均值。
MAX(expr)：返回表达式的最大值。
MIN(expr)：返回表达式的最小值。

// 复杂查询(子查询和连表)
// 子查询（Subquery），也被称为嵌套查询（Nested Query），是指在一个查询语句中嵌套使用另一个完整的查询语句。子查询可以被视为一个查询的结果集，它可以作为外层查询的一部分，用于进一步筛选、计算或操作数据。
// 子查询通常出现在主查询的WHERE子句、FROM子句、HAVING子句或SELECT子句中，以提供更复杂的查询逻辑。
// 子查询通常用于以下几种情况：
// 1. 过滤数据：通过子查询返回满足特定条件的数据，然后在主查询中使用这些数据进行进一步的筛选或操作。
select * from user where id in (select id from user where age > 18);
// 2. 计算聚合值：通过子查询计算出一组数据的聚合值，然后在主查询中使用这些聚合值进行进一步的计算或操作。
select avg(age) from user where id in (select id from user where age > 18);
// 3. 连接表：通过子查询连接多个表，然后在主查询中使用这些连接结果进行进一步的查询或操作。
select * from user where id in (select user_id from user_role where role_id = 1);

// 连表查询
// Mysql的连表分类
// 1. 内连接（Inner Join）：只返回两个表中匹配的行。
select * from user inner join user_role on user.id = user_role.user_id;
// 2. 左连接（Left Join）：返回左表中的所有行以及右表中匹配的行,右表没有值时为null。
select * from user left join user_role on user.id = user_role.user_id;
// 3. 右连接（Right Join）：返回右表中的所有行以及左表中匹配的行,左表没有值时为null。
select * from user right join user_role on user.id = user_role.user_id;


```

#### 2 实战操作
在nodejs里我们使用 mysql2 用来连接mysql和编写sq语句,js-yaml 用来编写配置文件。dotenv 读取环境变量文件。
安装：
```bash
pnpm i mysql2 js-yaml dotenv
```
使用：
```js
import mysql from "mysql2/promise";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// 获取当前模块路径 (替代 __filename、__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../", "config", "dev.yaml");

console.log("filePath", filePath);
console.log("process", process.env.NODE_ENV);

// 读取YAML配置
const loadDbConfig = () => {
  try {
    const filePath = path.join(__dirname, "../", "config", "dev.yaml");
    const fileContents = fs.readFileSync(filePath, "utf8");
    return yaml.load(fileContents)[process.env.NODE_ENV];
  } catch (e) {
    console.error("Error loading DB config:", e.message);
    process.exit(1);
  }
};

// 创建数据库连接
const createConnection = async () => {
  try {
    const baseConfig = loadDbConfig();
    const config = {
      ...baseConfig,
      namedPlaceholders: true,
      supportBigNumbers: true,
      decimalNumbers: true,
    };
    return await mysql.createConnection(config);
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    throw new Error(`Database connection failed:${err}`);
  }
};

// // 导出自定的执行查询函数（每次创建新连接）
export const query = async (sql, params) => {
  const connection = await createConnection();
  try {
    const [rows, fields] = await connection.execute(sql, params);
    return rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw new Error(`SQL Error: ${err.sqlMessage}`);
  } finally {
    if (connection) {
      await connection.end(); // 关闭连接
    }
  }
};

// 测试连接
query("SELECT * FROM sys_user").then((rows) => {
  console.log("Query result:", rows);
});

```




### 5.6.2 node操作Mongodb数据库
#### 1.概述
使用 mongoose模块、它是一个MongoDB对象建模工具、设计用于异步环境支持promise和回调函数两个形式。
好处是不用在一数据库是否连接上就可以设计模型或者进行数据的curd操作。

安装:  `$ npm install mongoose --save`

使用步骤:  
```JavaScript
// 1. 引入 mongoose 模块
const mongoose = require('mongoose')
// 2. 创建一个数据库连接对象
// 如:  连接本地的express-test 数据库写法如下、注意如果localhost不起作用使用127.0.0.1代替。
// 线上远程服务器地址就写远程的、本质是一样的。
// 回调形式-低版本的。v8以上版本是不用了的
mongoose.connect(
  'mongodb://localhost:27017/express-test', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  err => {
    if(err){
      console.log("数据库连接失败",err)
      return
    }
    console.log("数据库连接成功!")
  }
)
// 一般是定义一个函数连接
async function createConnection() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/express-test')
  } catch (error) {
    // 连接失败
    console.log(error)
  }
}
createConnection()

// 3.定义 Schema 即可对数据进行curd操作。当然实际开发时是抽离在models文件夹定义各模型文件对数据库中的数据。Schema-模型约束(模式)类似mysql中定义表及表的字段和字段约束。
// 通过mongoose模块的 Schema接口定义文档结构包含的字段名、字段约束以及存储数据的类型、通过model方法创建模型。
// 之后就可以通过返回的模型名操作对应的集合、完成curd操作。
// 定义一个约束条件schema(集合里字段(field)的数据类型,默认值等)
// 一个广告集合(表)例子
const adSchema = new mongoose.Schema({
    name:{
      type:String,
      default:''
    },
    items:[{
      image:{type:String},
      url:{type:String},
    }]    
})
// 直接定义一个变量接受直接使用
const Ad = mongoose.model('Ad', adSchema)
// 创建一个模型(集合对象模型)并导出
module.exports = mongoose.model('Ad',adSchema)
```

#### 2. CRUD操作
在完成mongodb数据库的连接和模型约束的定义和集合的生产之后、对集合的CRUD操作是非常方便的。
集合名.各种方法名、就可以实现对mongodb数据库集合的各种操作。
一个模型就是一个类、所以是schema里定义的可以算是属性对象。
如果要定义方法可以加到schema对象的methods属性上、而且要定义在model方法前。

```javaScript
adSchema.methods.sayHi = function() {
   const greeting = this.name
   console.log(greeting)
}
const ad = new Ad({name:'测试广告名'})
ad.sayHi()
```

1. 新增操作: model本质是一个类、所以可以使用类的方式新增一条数据、也可以使用api
```javaScript
// 以一个用户集合为例
const schema = new mongoose.Schema({
    username:{
      type:String
    },
    password:{
      type:String,
    }
  
})
const User = mongoose.model('User',schema)
// 创建一个新对象(插入一条数据)、创建的实例也叫文档。
const newUser = new User({username:'zhangsan',password:'123456'})
newUser.save()
// 另一种新增方法
await User.create({ username: 'small' })
// 一次创建很多
await User.insertMany([
    {username:'很多1',password:'fdsgsa112'},
    {username:'很多2',password:'12wsxqaz'},
])


```

2. 查找操作
查找可以使用多种方法和多种限制条件。
Model.find()、它是Model类的方法、可以传入一个查询对象、也就是schema种定义的字段。不穿时查所有。
Model.find()、可以对查询结果进行美化处理。
Model.findById()、根据ObjectId查找。
Model.findByOne()、也是传入一个查询参数对象。
它们后面都可以链式调用其它方法、如:exec()、美化输出、等
```javaScript
// 查找所有的
const result = await User.find()
// 传入查询参数
const zhangsan = await User.find({username:'zhangsan'})
// 根据id
const zhangsan = await User.findById(id)
// 只查找一个
const firstOne= await User.findByOne({})
```

3. 更新操作
每个模型都有自己的更新方法，用于修改数据库中的文档
Model.updateOne(conditions,update)、更新第一个符合条件的文档，接受两个参数、第一个时查询条件、第二个是要更新的内容。没有返回值
Model.updateMany(conditions,update)、更新多个传入一个数组对象、没有返回值
如果需要有返回值使用以下方法、他会返回找到的那条数据。
Model.findByIdAndUpdate(id,update)、根据id找并更新。
Model.findOneAndUpdate(conditions, update, options)、找到第一个、一般也是只传递前两个参数。
```javaScript
// 一个-没有返回值
await User.updateOne({username:'zhangsan'},{username:'张三'})
// 同时修改多个-没有返回值
await User.updateMany({username:'修改'},{username:'多个'})
// 通过id查找修改更新
await User.findByIdAndUpdate('65bdde1e2ca35331532577d7',{username:'通过id查找修改'})
// 找第一个
 await User.findOneAndUpdate({username:'很多1'},{username:'我是第一个找到的'})

```

4. 删除操作
和更新操作类似、
Model.deleteOne() 
Model.deleteMany()
同样也有先查找的api、
Model.findByIdAndDelete()
Model.findOneAndDelete()
```javaScript
await User.deleteOne({username:'我是第一个找到的'})

```


#### 3. CRUD深入操作



### 5.6.3 node操作redis数据库

#### 1 概述
Redis（Remote Dictionary Server）是一个开源的内存数据结构存储系统，它提供了一个高效的键值存储解决方案，并支持多种数据结构，如字符串（Strings）、哈希（Hashes）、列表（Lists）、集合（Sets）和有序集合（Sorted Sets）等。它被广泛应用于缓存、消息队列、实时统计等场景。

**关键特性和用途介绍**
1. 内存存储：Redis主要将数据存储在内存中，因此具有快速的读写性能。它可以持久化数据到磁盘，以便在重新启动后恢复数据。
2. 多种数据结构：Redis不仅仅是一个简单的键值存储，它支持多种数据结构，如字符串、哈希、列表、集合和有序集合。这些数据结构使得Redis能够更灵活地存储和操作数据。
3. 发布/订阅：Redis支持发布/订阅模式，允许多个客户端订阅一个或多个频道，以接收实时发布的消息。这使得Redis可以用作实时消息系统。
4. 事务支持：Redis支持事务，可以将多个命令打包成一个原子操作执行，确保这些命令要么全部执行成功，要么全部失败。
5. 持久化：Redis提供了两种持久化数据的方式：RDB（Redis Database）和AOF（Append Only File）。RDB是将数据以快照形式保存到磁盘，而AOF是将每个写操作追加到文件中。这些机制可以确保数据在意外宕机或重启后的持久性。
6. 高可用性：Redis支持主从复制和Sentinel哨兵机制。通过主从复制，可以创建多个Redis实例的副本，以提高读取性能和容错能力。Sentinel是一个用于监控和自动故障转移的系统，它可以在主节点宕机时自动将从节点提升为主节点。
7. 缓存：由于Redis具有快速的读写性能和灵活的数据结构，它被广泛用作缓存层。它可以将常用的数据存储在内存中，以加快数据访问速度，减轻后端数据库的负载。
8. 实时统计：Redis的计数器和有序集合等数据结构使其非常适合实时统计场景。它可以存储和更新计数器，并对有序集合进行排名和范围查询，用于统计和排行榜功能

#### 2 基本使用
redis主要涉及下面集中操作

**string-字符串的操作**
设置值：
`SET key value [NX|XX] [EX seconds] [PX milliseconds] [GET]`
key：要设置的键名。
value：要设置的值。
NX：可选参数，表示只在键不存在时才设置值。
XX：可选参数，表示只在键已经存在时才设置值。
EX seconds：可选参数，将键的过期时间设置为指定的秒数。
PX milliseconds：可选参数，将键的过期时间设置为指定的毫秒数。
GET：可选参数，返回键的旧值。
比如：
设置键名为 "name" 的值为 "John"：`SET name "xiaoman"`
设置键名为 "counter" 的值为 10，并设置过期时间为 60 秒：`SET counter 10 EX 60`

删除值:`DEL name`


**list-列表的操作**
列表（List）是一种有序、可变且可重复的数据结构。在许多编程语言和数据存储系统中，列表是一种常见的数据结构类型，用于存储一组元素.


**set-集合的操作**
集合（Set）是一种无序且不重复的数据结构，用于存储一组独立的元素。集合中的元素之间没有明确的顺序关系，每个元素在集合中只能出现一次
添加成员到集合：
SADD fruits "apple"
SADD fruits "banana"
SADD fruits "orange"
获取集合中的所有成员：SMEMBERS fruits
检查成员是否存在于集合中：SISMEMBER fruits "apple"
从集合中移除成员：SREM fruits "banana"
获取集合中的成员数量：SCARD fruits
求多个集合的并集：SUNION fruits vegetables
求多个集合的交集：SINTER fruits vegetables

**hash-哈希表的操作**
哈希表（Hash）是一种数据结构，也称为字典、关联数组或映射，用于存储键值对集合。在哈希表中，键和值都是存储的数据项，并通过哈希函数将键映射到特定的存储位置，从而实现快速的数据访问和查找。
设置哈希表中的字段值：
HSET obj name "John"
HSET obj age 25
HSET obj email "john@example.com"
获取哈希表中的字段值：HGET obj name
获取哈希表中所有字段和值：HGETALL obj
删除哈希表中的字段：HDEL obj age email
检查哈希表中是否存在指定字段：HEXISTS obj name

#### 3 ioredis
ioredis 是一个强大且流行的 Node.js 库，用于与 Redis 进行交互。Redis 是一个开源的内存数据结构存储系统。ioredis 提供了一个简单高效的 API，供 Node.js 应用程序与 Redis 服务器进行通信。
以下是 ioredis 的一些主要特点：
1. 高性能：ioredis 设计为快速高效。它支持管道操作，可以在一次往返中发送多个 Redis 命令，从而减少网络延迟。它还支持连接池，并且可以在连接丢失时自动重新连接到 Redis 服务器。
2. Promises 和 async/await 支持：ioredis 使用 promises，并支持 async/await 语法，使得编写异步代码和处理 Redis 命令更加可读。
3. 集群和 sentinel 支持：ioredis 内置支持 Redis 集群和 Redis Sentinel，这是 Redis 的高级功能，用于分布式设置和高可用性。它提供了直观的 API，用于处理 Redis 集群和故障转移场景。
4. Lua 脚本：ioredis 允许你使用 eval 和 evalsha 命令在 Redis 服务器上执行 Lua 脚本。这个功能使得你可以在服务器端执行复杂操作，减少客户端与服务器之间的往返次数。
5. 发布/订阅和阻塞命令：ioredis 支持 Redis 的发布/订阅机制，允许你创建实时消息系统和事件驱动架构。它还提供了对 BRPOP 和 BLPOP 等阻塞命令的支持，允许你等待项目被推送到列表中并原子地弹出它们。
6. 流和管道：ioredis 支持 Redis 的流数据类型，允许你消费和生成数据流。它还提供了一种方便的方式将多个命令进行管道化，减少与服务器之间的往返次数。

**安装**
pnpm i ioredis



#### 4 

## 5.8 node认证与授权

**用户的认证和授权问题是指**
1. 认证就是让服务器知道你是谁，
2. 授权就是服务器知道你是谁后确认你能干什么，不能干什么。

这一切的源头是因为：HTTP协议是非连接性的，使用浏览器访问页面的内容会在关闭浏览器后丢失，HTTP链接也会断开，没有任何机制去记录访问的页面信息也就是会话信息。所以必须要有一种机制让浏览器页面知道原来页面的会话内容，这也是会话session的原理。
1. 认证：在服务器端对客户端传回来的token信息进行验证并获取用户信息。
2. 授权：根据获取到的用户信息使用中间件保护接口，即不同的用户只能访问不同的接口。

目前由3中方法实现上述功能: 
1. cookie
2. session
3. jwt
    方法二：使用koa-jwt中间件这个中间件还可以和其它组合使用，具体看文档。
    这个中间件只是用来认证的，生成token用的还是jsonwebtoken这个中间件。
    由于 koa-jwt 从 koa-v2 分支开始不再导出 jsonwebtoken 的 sign 、 verify 和 decode 方法，若要单独生成 token 、验证 token 等，需另从 jsonwebtoken 中将其引入：
    安装：npm i koa-jwt
    const jwt = require("koa-jwt")
    const auth = jwt({secret}) 这样就生成了一个认证中间件了
    验证后的信息也是挂载到ctx.state.user上的。

### 5.7.1 cookie
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

### 5.7.2 session
事实上使用上面的cookie已经可以实现用户的认证和授权了、不过使用cookie存储会暴露username(用户名、手机号、邮箱名等)等个人重要信息所以是很危险的。
解决方法:  使用session会话控制、cookie中存储userId,后端保存对应的敏感信息如username。

session在计算机中，尤其是在网络应用中，称为“会话控制”。意思是当用户使用浏览器访问网页向服务器通信的时候，服务器会在内存里(或者redis中)开辟一块内存区域用来存储了当前用户会话相关的属性及配置信息，这块内存区域就叫做 session，它本质是一个对象。它存储了userId与真正用户名对应的信息。在通信时只要后端的username与userId唯一对应就能知道当前用户的其它信息了、它是一种解决cookie存储缺点的方法。

具体实现是:服务器会将session的引用地址通过响应头的set-cookie字段返回给客户端，客户端一般将这个值命名为sessionid并存储在cookie中(这是一种方法)，而cookie是浏览器中一个可以保存数据的内存区域。

此后用户再向服务器端请求时都会在请求头的cookie字段携带这个sessionid发给服务器，服务器根据sessionid在自己内存里找到唯一对应的内存区域即session对象并解析，解析后就知道当前用户的权限能干什么不能干什么最后将信息再次返回给前端。
  
客户端要退出当前会话只需要把cookie清空即可，或者在服务器主动清除session。
优点：
1. 相比于jwt，session可以被服务器主动清除。
2. session保存在服务器端，相对更加安全。
3. 和浏览器的cookie结合使用，比较灵活，兼容比较好。
缺点：
1. cookie+session在跨域场景中不好，因为cookie不可跨域。
2. 如果是分布式部署，需要做多机session共享机制
3. 基于cookie的机制很容易被CSRF攻击

### 5.7.3 JWT
JWT是json web token的缩写，它是RFC(网络请求意见稿)的一个开放标准RFC7519。
它定义了一种紧凑且独立的方式，用来将各方之间的信息作为JSON对象进行安全传输。
该信息是可以被验证和信任的，因为这个信息是经过数字签名的。
它也是为了实现客户端和服务器端之间认证的和鉴权的一种方法，它本质是一串字符串。

JWT构成：头部(header)+有效载荷(payload)+签名(signature)，它们之间使用 . 分隔。

1. 头部(header)：本质是一个json有两个字段，在生成token时使用 base64 进行了编码。
 - typ(type):token(令牌)的类型，这里固定是JWT
 - alg(algorithm):使用何种hash算法加密，如RSA，SHA256等
类似：{"typ":"JWT","alg":"HS256"} base64 编码后就变成了一堆字符串如下：'eyjhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9'

2. 有效载荷(payload)：本质也是一个json，字段是真实存储需要传递的信息，如用户id，用户名等身份验证和授权信息。还有一个元数据信息，如过期时间，发布人等等。与header不同，除了base64编码外有效载荷还可以再次进行加密。类似：{"user_id":"zhangsan"} base64url 编码后如下： 'eyJ1c2VyX2lkIjoiemhhbmdzYM4ifQ'

3. 签名(signature)：对头部和有效载荷这两部分进行签名(即使用指定的密钥再加密一次)，目的是保证token在传输的过程中没有被篡改或者损坏。而且在签名之后还要再进行一次base64编码。
完整的签名算法是：signature = HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload),secret密钥)

**JWT工作流程：**
1. 首先用户在客户端向服务器发送请求时会携带有效载荷，服务器端接收到后进行验证，验证成功就将需要返回的信息加入到有效载荷中，再对有效载荷和jwt头部一起进行base64编码。
2. 然后使用密钥对编码之后的有效载荷和jwt头部进行签名，签名完成之后再进行一次base64编码就形成一个token(令牌本质就是一串字符串)返回给客户端。返回格式是自己设定的如: {token:'xxxx'}
3. 最后客户端将token保存在localStorage或者sessionStorage中，在下次请求时在请求头中的 authorization 字段带上这个 token 就可以验证用户信息了。
4. 而退出只需要将token删除即可，也就是将localStorage或者sessionStorage中的token删除、而前端对localStorage或者sessionStorage的操作都是有浏览器提供的api接口的。

JWT和session比较: 
1. 可扩展性，jwt更好不需要在服务器端存储token。
2. 安全性，都有可能会遭受攻击，要自己注意防范，不要把重要信息放在token里。
3. 性能，jwt存储大量信息时开销比较大，而session多时后端也需要根据id查找。
4. 时效性，jwt差一点，因为session可以在服务器端主动删除。

### 5.7.4 实现逻辑
解决方案都是现成的记住就好。
登录认证流程：
1. 首先前端登录时需要把用户名、用户密码等标识信息传递给后端
2. 然后后端先判断数据库是否存在该用户、存在用户后端对不敏感的信息添加到有效载荷中签名生成token，最后返回token给前端。
3. 之后前端对其它接口的请求都带上这个token。

实际操作：在middleware文件夹新建一个auth.js，此时前端已经登录获取了token。
1. 认证步骤1：获取前端请求头对象的 authorization，前端不设置时默认为空
2. 认证步骤2：对authorization的值进行拆分，获取其中的token
3. 认证步骤3：验证token 如果token被修改过或者为空，都是401错误，即没有认证。
   


## 5.9 日志功能实现


## 5.10 静态资源服务器实现
动静分离是一种在Web服务器架构中常用的优化技术，旨在提高网站的性能和可伸缩性。它基于一个简单的原则：将动态生成的内容（如动态网页、API请求）与静态资源（如HTML、CSS、JavaScript、图像文件）分开处理和分发。

通过将动态内容和静态资源存储在不同的服务器或服务上，并使用不同的处理机制，可以提高网站的处理效率和响应速度。这种分离的好处包括：

1. 性能优化：将静态资源与动态内容分离可以提高网站的加载速度。由于静态资源往往是不变的，可以使用缓存机制将其存储在CDN（内容分发网络）或浏览器缓存中，从而减少网络请求和数据传输的开销。
2. 负载均衡：通过将动态请求分发到不同的服务器或服务上，可以平衡服务器的负载，提高整个系统的可伸缩性和容错性。
3. 安全性：将动态请求与静态资源分开处理可以提高系统的安全性。静态资源通常是公开可访问的，而动态请求可能涉及敏感数据或需要特定的身份验证和授权。通过将静态资源与动态内容分离，可以更好地管理访问控制和安全策略。

**实现动静分离的方法**

1. 使用反向代理服务器（如Nginx、Apache）将静态请求和动态请求转发到不同的后端服务器或服务。
2. 将静态资源部署到CDN上，通过CDN分发静态资源，减轻源服务器的负载。
3. 使用专门的静态文件服务器（如Amazon S3、Google Cloud Storage）存储和提供静态资源，而将动态请求交给应用服务器处理。

原生node要实现静态资源服务器，本质就是使用fs模块读取文件，然后返回给前端。
一般配合path、mine两个模块。

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 获取请求的URL、请求方法
  const { url, method } = req

  // 解析请求的文件路径
  // 文件夹路径，这里假设是 'public'
  // const filePath = path.join('./public', url);
  const filePath = path.join(process.cwd(), '../',url) // 获取文件路径
  console.log(process.cwd())// 这个目录是相对于node启动目录的。
  console.log(url)
  console.log(filePath)
   
  // 请求静态资源
  if(method === 'GET' && url.startsWith('/public')) {
    // 检查文件是否存在
    fs.access(filePath, (err) => {
        if (err) {
            // 如果文件不存在，返回404错误
            res.statusCode = 404;
            res.end(`File ${url} not found!`);
            return;
        }

        // 打开文件
        fs.readFile(filePath, (fileErr, data) => {
            if (fileErr) {
                // 如果读取文件时出错，返回500错误
                res.statusCode = 500;
                res.end(`Error reading file from ${filePath}`);
                return;
            }

            // 设置响应头，例如类型为文本HTML
            const contentType = getContentType(filePath);
            res.setHeader('Content-Type', contentType);

            // 发送文件内容
            res.end(data);
        });
    });
  }
});

// 根据文件扩展名获取Content-Type - 可以适合用 mime 这个库来实现。
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
    case '.htm':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}
import mime from 'mime' // 导入mime模块
function getContentType(filePath) {
  const mimeType = mime.getType(filePath);// 获取文件的MIME类型
  return mimeType;
}

// 启动服务器
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```


## 5.11 邮件服务
邮件服务在我们工作中邮件服务充当着一个重要的角色
1. 任务分配与跟踪：邮件服务可以用于分配任务、指派工作和跟踪项目进展。通过邮件，可以发送任务清单、工作说明和进度更新，确保团队成员了解其责任和任务要求，并监控工作的完成情况。
2. 错误报告和故障排除：当程序出现错误或异常时，程序员可以通过邮件将错误报告发送给团队成员或相关方。这样可以帮助团队了解问题的性质、复现步骤和相关环境，从而更好地进行故障排除和修复。邮件中可以提供详细的错误消息、堆栈跟踪和其他相关信息，以便其他团队成员能够更好地理解问题并提供解决方案。
3. 自动化构建和持续集成：在持续集成和自动化构建过程中，邮件服务可以用于通知团队成员构建状态、单元测试结果和代码覆盖率等信息。如果构建失败或出现警告，系统可以自动发送邮件通知相关人员，以便及时采取相应措施。

**需要用到库**
```bash
$ npm install js-yaml # 解析yaml文件 邮件的账号（密码| 授权码）不可能明文写到代码里面一般存放在yaml文件或者环境变量里面
$ npm install nodemailer # 发送邮件
```

```js
import nodemailder from 'nodemailer'
import yaml from 'js-yaml'
import fs from 'node:fs'
import http from 'node:http'
import url from 'node:url'
const mailConfig = yaml.load(fs.readFileSync('./mail.yaml', 'utf8'))
const transPort = nodemailder.createTransport({
    service: "qq",
    port: 587,
    host: 'smtp.qq.com',
    secure: true,
    auth: {
        pass: mailConfig.pass,
        user: mailConfig.user
    }
})


http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    if (req.method === 'POST' && pathname == '/send/mail') {
        let mailInfo = ''
        req.on('data', (chunk) => {
            mailInfo += chunk.toString()
        })
        req.on('end', () => {
            const body = JSON.parse(mailInfo)
            transPort.sendMail({
                to: body.to,
                from: mailConfig.user,
                subject: body.subject,
                text: body.text
            })
            res.end('ok')
        })
    }
}).listen(3000)


```

## 5.12 http-proxy-middleware 反向代理模块（Reverse Proxy）
反向代理（Reverse Proxy）是一种网络通信模式，它充当服务器和客户端之间的中介，将客户端的请求转发到一个或多个后端服务器，并将后端服务器的响应返回给客户端。

1. 负载均衡：反向代理可以根据预先定义的算法将请求分发到多个后端服务器，以实现负载均衡。这样可以避免某个后端服务器过载，提高整体性能和可用性。
2. 高可用性：通过反向代理，可以将请求转发到多个后端服务器，以提供冗余和故障转移。如果一个后端服务器出现故障，代理服务器可以将请求转发到其他可用的服务器，从而实现高可用性。
3. 缓存和性能优化：反向代理可以缓存静态资源或经常访问的动态内容，以减轻后端服务器的负载并提高响应速度。它还可以通过压缩、合并和优化资源等技术来优化网络性能。
4.  安全性：反向代理可以作为防火墙，保护后端服务器免受恶意请求和攻击。它可以过滤恶意请求、检测和阻止攻击，并提供安全认证和访问控制。
5. 域名和路径重写：反向代理可以根据特定的规则重写请求的域名和路径，以实现 URL 路由和重定向。这对于系统架构的灵活性和可维护性非常有用。

**proxy.config.js**
```js

```


## 5.13 防盗链 Hotlinking

## 5.14 knex SQL查询生成器
在我们学习如何使用nodejs操作数据库时是直接书写sql语句这是非常麻烦且不方便的。而Knex是一个基于JavaScript的查询生成器，它允许你使用JavaScript代码来生成和执行SQL查询语句。它提供了一种简单和直观的方式来与关系型数据库进行交互，而无需直接编写SQL语句。你可以使用Knex定义表结构、执行查询、插入、更新和删除数据等操作。
**安装**`pnpm i knex`,

它支持多种数据库，需要那种就安装那种即可

```js

```



## 5.15 node-schedule 定时任务
定时任务是指在预定的时间点或时间间隔内执行的任务或操作。它们是自动化执行特定逻辑的一种方式，可用于执行重复性的、周期性的或计划性的任务。
定时任务通常用于以下情况：

1. 执行后台任务：定时任务可用于自动执行后台任务，如数据备份、日志清理、缓存刷新等。通过设定适当的时间点或时间间隔，可以确保这些任务按计划进行，而无需手动干预。
2. 执行定期操作：定时任务可用于执行定期操作，如发送电子邮件提醒、生成报告、更新数据等。通过设定适当的时间点，可以自动触发这些操作，提高效率并减少人工操作的需求。
3. 调度任务和工作流：定时任务可以用于调度和协调复杂的任务和工作流程。通过设置任务之间的依赖关系和执

**安装**
`pnpm install node-schedule`

一般定时任务都是用cron表达式去表示时间的,Cron表达式是一种用于指定定时任务执行时间的字符串表示形式。它由6个或7个字段组成，每个字段表示任务执行的时间单位和范围。具体描述如下：
┌───────────── 秒 (0-59)
│ ┌─────────── 分 (0-59)
│ │ ┌───────── 时 (0-23)
│ │ │ ┌─────── 日 (1-31)
│ │ │ │ ┌───── 月 (1-12 或 JAN-DEC)
│ │ │ │ │ ┌─── 星期 (0-6 或 SUN-SAT, 0=周日)
│ │ │ │ │ │
* * * * * *


解释如下:
| 域              | 是否必需 | 取值范围                                                             | 特殊字符      |
| --------------- | -------- | -------------------------------------------------------------------- | ------------- |
| 秒 Seconds      | 是       | [0, 59]                                                              | *, - /        |
| 分钟 Minutes    | 是       | [0, 59]                                                              | *, - /        |
| 小时 Hours      | 是       | [0, 23]                                                              | * , - /       |
| 日期 DayofMonth | 是       | [1, 31]                                                              | * , - / ? L W |
| 月份 Month      | 是       | [1, 12]或[JAN, DEC]                                                  | * , - /       |
| 星期 DayofWeek  | 是       | [1, 7]或[MON, SUN]。若使用[1, 7]表达方式，1代表星期一，7代表星期日。 | * , - / ? L # |
| 年 Year         | 否       | 1970+-                                                               | * /           |



每个字段可以接受特定的数值、范围、通配符和特殊字符来指定任务的执行时间：

1. 数值：表示具体的时间单位，如1、2、10等。使用逗号分隔
2. 范围：使用-连接起始和结束的数值，表示一个范围内的所有值，如1-5表示1到5的所有数值。
3. 通配符：使用*表示匹配该字段的所有可能值，如*表示每分钟、每小时、每天等。
4. 逗号分隔：使用逗号分隔多个数值或范围，表示匹配其中任意一个值，如1,3表示1或3。
5. 步长：使用/表示步长，用于指定间隔的数值，如*/5表示每隔5个单位执行一次。
6. 特殊字符：Cron表达式还支持一些特殊字符来表示特定的含义，如?用于替代日和星期字段中的任意值，L表示最后一天，W表示最近的工作日等。

以下是一些常见的Cron表达式示例：

* * * * * *：每秒执行一次任务。
0 * * * * *：每分钟的0秒执行，即每分钟整点执行一次任务。
0 0 * * * *：每小时的0分0秒执行，即每小时整点执行一次任务。
0 0 0 * * *	每天的0点0分0秒执行，即每天午夜一次任务。















# 六、Node.js 进阶
深入原理底层知识
## 6.1 EventLoop 事件轮询
## 6.2 I/O 模型
## 6.3 Memory 内存管理
## 6.4 Threads&Process 线程和进程
## 6.5 Schedule 定时任务
## 6.6 Template 模板引擎
## 6.7 Cache 缓存
## 6.8 V8 虚拟机
## 6.9 Testing 单元测试
## 6.10 性能优化
## 6.11 微服务
## 6.12 线上部署


# 七、其它知识
后续  to do list
## 7.1 Http深入
## 7.2 DevOps
PM2生产环境部署,Docker,Jenkins持续集成
## 7.3 数据结构
队列queue,Set,Map,List,Heap堆,Stack栈,Graph图,二叉树,红黑树,十大排序方法.
## 7.4 设计模式
SOLID五大设计原则,单例模式,工厂模式,装饰器模式,代理模式,适配器模式,观察者模式
## 7.5 等

