# 一、nodejs 学习开始前
## 1.1 cmd常用命令的学习
window+r ：快速打开命令运行窗口。
常用命令：
cmd：命令行窗口。
notepad：打开记事本。
calc；计算器。
mspaint：画图工具。
write：写字板。
sysdm.cpl；打开环境变量的设置窗口。
切换盘符：盘符号: 点击回车即可。
md 要创建的目录名。
cd 要进入的目录名。
cls == clear 清屏

## 1.2 linux系统常用命令
touch 新建一个文件
cd 进入目录
ls 列举当前目录下所有资源等等。

# 二、nodejs 主要知识点
nodejs的学习可以说是很简单的，因为它的真正用途或者说一般实际用途是：运行在服务端作为web server存在。也就是说对于我们前端工程师而言就是用来提供api接口的，它学习的难处在于服务器端的开发思路和套路与前端开发是不一样的，同时原生node是比较繁杂的。我们主要学习的就是这些思路和套路，学习的主要内容如下：

2.1 nodejs和JavaScript的区别
2.2 server端和前端的概念和区别
2.3 nodejs基本介绍和使用
2.4 nodejs模块系统与NPM
2.5 nodejs常用模块的学习
2.6 nodejs登陆功能的实现

## 2.1 nodejs和JavaScript的区别
ecmascript定义了语法，无论是写JavaScript还是nodejs都必须遵守的，但是nodejs不能操作DON，不能监听页面事件，不能发送Ajax，不能处理http请求。
JavaScript使用了ecmascript语法规范还外加浏览器提供的web api (web api主要包括用来操作DOM，BOM，监听事件，发送Ajax请求等一系列的api。)
nodejs也使用了ecmascript语法规范还外加node api (node api用来处理http请求，处理文件等。)

前端模块化使用es6的import/export规范：一个js文件就是一个模块，export default或者export导出，直接使用import导入。
后端模块化使用commonjs规范：一个js文件也是一个模块，使用 module.exports = {} 或者exports = xxx 导出,使用require('路径')函数引入。
注意：本人用的还是node还是 v14.18.2 版本的，v16版本之后node也支持了es6的模块化语法。

## 2.2 server端和前端的概念和区别
记住重点在于切换思路
前端：主要和用户肉眼所看到的页面打交道，主要工作就是写页面（HTML），美化页面（css），调用后端提供的 api接口去请求或提交数据等。

server端也就是服务器端，主要进行业务逻辑的操作如：数据的增删改查，数据库的操作，对外暴露api接口等。后端开发思维是和前端不一样的，在开发过程中要考虑以下多个方面的问题：
服务的稳定性：server端可能会遭受各种恶意攻击，但是服务不能挂掉。--》通过PM2进行进程守候在服务挂掉后能自动重启。
要考虑服务器性能如内存和cpu：在客户端只有一个浏览器内存不是问题，而对于服务端来说cpu和内存都是稀缺资源。--》通过stream写日志，使用redis存session 优化内存和cpu。
日志管理：前端也参与日志但是只是发送不关心后续，server端则要纪录，存储，以及分析日志。
安全问题：server会时刻遭受各种网络恶意攻击，而前端较少。--》通过登陆验证，预防常见的xss攻击和sql注入。
集群和服务拆分：当产品发展速度快，流量可能会迅速增加，项目变得很大时，就需要考虑集群和拆分服务了。

## 2.3 nodejs基本介绍和使用
### 2.3.1 nodejs基本介绍
Node.js 是一个基于Google V8引擎的JavaScript 运行时环境(runtime)，不是一门新的语言或者框架。简单的说Node.js 就是运行在服务端的JavaScript，也可以说是一个解析器或者软件。
一般有两种用处：
    一种是运行在服务器端做web server服务(做BFF层：向前端提供HTTP服务，跟后端进行RPC通信)主要学习。
    另一种是运行在本地做打包构建工具使用。
官方网站主要用来查询相关api：https://nodejs.org
社区的主要用来学习基础：https://blog.poetries.top/node-learning-notes/

Node.js 是一个基于 Chrome V8 引擎 的 JavaScript 运行时环境。
Node.js 是一个服务器端 JavaScript 解释器
Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效
Node.js 的包管理器 npm，是全球最大的开源库生态系统
Node.js 是一门动态语言，运行在服务端的 Javascript

下载安装之后在命令窗口中输入 node -v 可以查看版本,现在用的基本上是 8.x 以上的版本了因为它们都支持 ES6 特性。个人在用v14.18.2版本，社区最新版已经到v17了，LTS版也已经更新到v16.14.0这是一个大版本更新，已经支持es6的模块语法不过对一些npm包有版本兼容问题。

### 2.3.2 nodejs组成和使用
Node.js主要是由ecmascript语法规范 + nodeAPI 两部分组成的，ecmascript定义了语法，js和node都必须遵循，而nodeAPI是node官方提供的一系列操作文件系统、http服务、加密等内容的接口，底层是用c++编写的。
安装使用：要想使用要先安装node运行所需要的环境，去官网 https://nodejs.org 下载然后傻瓜安装即可使用。它会把npm也安装上。
安装好之后可以使用node -v === node --version 来查看当前安装的  node 版本信息。
然后使用命令：node 文件名.js ，就可以在服务器端运行一个指定的js文件，当然实际开发中一般会在包管理文件：package.json中的 "scripts" 选项配置成其它命令启动。
常见开发环境的nodemon，生产环境的pm2，它们都监视源文件中任何的更改并自动重启服务器。
安装：npm install nodemon -g 
安装：npm install pm2 -g 


### 2.3.3 nodejs项目一般目录结构
对于原生nodejs没有脚手架等工具时可根据个人编程爱好生成一般如下：
项目名称
    -node_modules  项目安装依赖存放目录初始化node项目时自动生成
    -public 存放静态文件，图片，音频，视频等资源目录
        -img 图片
        -logs 日志
        -music 音乐
        -.....
    -src 项目代码的实际存放位置
        -config 项目全局相关的配置
        -doc 存放项目说明文档，接口文档等
        -controllers 控制器
        -models 数据库表定义文件目录
        -middleware  自定义模块第三方中间件 
        -routers 项目路由
        -utils 自定义工具类
        -index.js 项目入口文件

## 2.4 nodejs模块系统与NPM
### 2.4.1 nodejs的模块系统
&emsp;&emsp;在编写稍大一点的程序时一般都会将代码按照功能拆分成不同的文件也就是所谓的模块化，好处是:
1 避免变量污染，命名冲突
2 提高代码复用率
3 提高维护性
4 依赖关系的管理。
使用模块化开发也比较符合设计原则中的单一置换原则，开放封闭原则。
在node.js中是以模块为基本单位来划分功能的，一个模块本质上就是一个 .js 文件。
而为了让node模块之间可以相互调用，Node.js提供了一个完整的模块加载系统--》即CommonJS规范。
注：这里 .js文件 和模块是一一对应的，即：一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。所以创建一个模块是很简单的就是新建一个.js文件。

<strong>1.模块的分类 </strong>
&emsp;&emsp;原生(核心)模块:nodejs自己提供的原生模块，调用时只写模块名称即可。
&emsp;&emsp;文件模块：使用npm下载第三方提供的模块，调用时只写模块名称即可。
&emsp;&emsp;自定义模块：自己定义的 .js 文件也叫模块，调用时要写清楚路径地址。

<strong>2.模块的组成和使用 </strong>
&emsp;&emsp;nodejs模块系统是基于commonjs规范的，一个单独的js文件就是一个模块，每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量函数，对象等都运行在模块作用域中，无法被其他模块读取，除非为global对象的属性。这样不会污染到全局作用域，同时采用了延迟加载的策略，即用到时系统模块才会被加载，且加载完成后会放到binding_cache中进行缓存，所以在第二次再引入相同的模块时不会重新加载。同时在编写或使用每个node 模块时，都有require()、exports、module这三个nodejs预先定义好的变量可供使用。

<strong>2.1 模块的引入 require()函数 </strong>
nodejs对所有模块的加载方法都是通过调用 require() 函数来加载和使用别的模块，这个函数接收一个字符串类型的模块名(原生和文件模块直接使用模块名，自定义模块要指定模块所在的位置)。注意：模块名中的.js扩展名可以省略，require() 函数的返回值是一个 node模块导出对象--》 module.exports === {}，这个对象拥有加载模块向外暴露的所有属性和方法。可以定义一个变量接收这个对象返回值，这样就可以通过这个变量来调用模块向外导出的所有属性和方法。也可以直接解构需要的属性或方法。
导入语法：const 变量对象名 =  require('原生/文件模块名/自定义模块位置');
导入语法：const {解构变量名} =  require('原生/文件模块名/自定义模块位置');

注意：原生和文件模块不做路径解析，直接返回内部模块的导出对象。自定义模块做路径解析。
&emsp;&emsp;以 '/' 为前缀的模块是文件的绝对路径。
&emsp;&emsp;以 './' 为前缀的模块是相对于当前调用 require() 文件的同级目录。
&emsp;&emsp;以 '../' 为前缀的模块是相对于当前调用 require() 文件的上一级目录。
&emsp;&emsp;当没有以 '/'、 './' 或 '../' 开头来表示文件时，这个模块必须是一个核心模块或加载自 node_modules 目录的文件模块。

<strong>2.2 模块的导出 module和exports对象 </strong>
&emsp;&emsp;每个nodejs模块都有一个全局对象module，同时module对象中有一个属性exports(它本身又是一个对象)。
我们需要把模块希望暴露导出的属性和方法放入 module.exports 对象中，它是node模块真正的向外暴露属性和方法的出口。
例如：module.exports = {
    要导出的属性,
    要导出的函数，
    .....对象等等
}

&emsp;&emsp;exports对象：在模块中也使用这个对象向外暴露东西，它本身又是一个对象并且nodejs将一个指向module.exports的引用赋值给了exports，即exports的值(地址值)指向的就是module.exports对象，可以理解为它是一个副本(简写形式)。
语法：exports.导出变量名/导出方法名=模块内定义的变量名/方法名。

注意：module.exports和exports的区别：
module.exports才是node模块真正的导出接口，即在使用require()方法引入时得到的返回值就是这个
module.exports，一个模块文件中可以有多个exports输出，但只能有一个module.exports输出。
所有exports对象最终都是通过module.exports导出的。
建议都使用module.exports就行避免矛盾。

<strong>3.node模块的加载机制</strong>
在Nodejs中模块加载一般会经历：路径分析、文件定位、编译执行这3个步骤。
按照模块的分类，在Nodejs中模块加载会按照以下顺序进行优先加载：

    1：首先是先进行系统缓存binding_cache加载，判断缓存中是否有值。有不再加载直接使用之前加载过的，没有进行下一步检查。

    2：然后查找定义在Node.js源码的lib目录下的系统模块也就是原生模块，这个优先级仅次于缓存加载，部分核心模块已经被编译成二进制，省略了路径分析、文件定位直接加载到了内存中。有直接加载使用，没有进行下一步检查。

    3：优先加载 .、..、/开头的文件模块，如果文件没有加上扩展名，会依次按照.js、.json、.node进行扩展名补足尝试，那么在尝试的过程中也是以同步阻塞模式来判断文件是否存在，从性能优化的角度来看待，
    .json、.node最好还是加上文件的扩展名。有直接加载使用，没有进行下一步检查。

    4：目录做为模块：这种情况发生在文件模块加载过程中，也没有找到，但是发现是一个目录的情况，这个时候会将这个目录当作一个包来处理，Node这块采用了Commonjs规范，先会在项目根目录查找package.json文件，取出文件中定义的main属性("main": "lib/hello.js")描述的入口文件进行加载，也没加载到，则会抛出默认错误: Error: Cannot find module 'lib/hello.js'

    5：对于系统模块、路径文件模块都找不到时，Node.js会从当前项目的node_modules目录里进行查找，没有则往上一级父目录的node_modules进行查找，直到系统的根目录的node_modules。

    6：最终如果查找的模块还是没有找到，则 require() 会抛出一个 code 属性为 'MODULE_NOT_FOUND' 的 Error 即找不到要加载的模块。

注意:在15.x版本之后已经可以支持es6的import/export语法。
### 2.4.2 nodejs包管理工具npm
在安装node的同时也会自动把npm也安装上，npm(node package manager)node包管理工具的简称，它是一个命令行工具，用于下载和管理node开发中需要到的各种模块/包/插件。可以在官网 https://www.npmjs.com/ 上搜索你想要安装的模块。
常用命令如下：
npm -v === npm --version 查看当前安装的 npm 版本信息
npm install 模块名   在本目录下增加一个node_modules并在这个目录里安装指定模块
npm uninstall 模块名   删除或者说卸载指定模块
npm list 查看当前目录安装了哪些模块。
npm config list 查看当前电脑主机安装了哪些全局模块。
npm show 模块名 ，显示指定模块的详情
npm update  升级当前目录下的项目的所有模块，也可在后面指定模块名升级。

node项目从零开发一般流程如下: 
<strong> 1.先初始化为node项目</strong>
方法：使用 npm init / npm init -y 初始化为node项目(-y 表示快速初始化node项目包管理文件package.json)。
将来要安装的模块/包的信息都会纪录在这个package.json文件中且包含有描述当前node项目的其它各种信息。
注意：package.json 是一个 .json文件，常见属性如下:
{
&emsp;&emsp;"name" : "包名/当前项目名称",
&emsp;&emsp;"version" : "包的版本号/项目的版本号",
&emsp;&emsp;"description" : "包的描述信息/项目的描述信息",
&emsp;&emsp;"keywords" : "描述当前项目的关键字",
&emsp;&emsp;"main" :"index.js", main 字段指定了node项目程序的主入口文件，即使用node命令启动项目时的入口文件，使用require('moduleName') 就会加载这个文件，这个字段的默认值是模块根目录下面的 index.js，也可以自定义指定位置的文件作为入口文件。主要负责调度组成整个程序的其它模块完成工作
&emsp;&emsp;"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "cross-env NODE_ENV=dev nodemon 入口文件位置",
    "prd": "cross-env NODE_ENV=production pm2 start 入口文件位置"
  },这个选项叫npm脚本指定了node项目运行脚本命令的npm命令行缩写，即启动node项目的自定义命令，用来代替 node 运行文件名 这样启动js文件的方式。
语法：npm run 自定义的命令。(自定义的命令是scripts中的键，如果定义为start时则run可以省略)。
上面开发环境就是：npm run serve，生产环境就是：npm run prd
&emsp;&emsp;"author" : "包的作者/项目的作者",
&emsp;&emsp;"license": "ISC",项目使用的开源协议
&emsp;&emsp;"contributors" : "包/项目的其他贡献者",
&emsp;&emsp;"repository": {
    "type": "git",
    "url": "git+https://github.com/zangqingan/nodeStudy.git"
},包/项目代码的远程仓库信息，包括type和URL，type可以是git或svn，URL则是远程的仓库地址。
&emsp;&emsp;"homepage": "https://github.com/zangqingan/nodeStudy#readme",当前项目远程仓库的readme.md 文件地址。
&emsp;&emsp;"dependencies": {
    "mongoose": "^5.8.3"
}，生产环境依赖，指定了项目运行时（即生产环境所依赖的模块列表）所依赖的模块。
它们将会被安装在当前目录的 node_modules 目录下。
&emsp;&emsp; "devDependencies": {
    "cross-env": "^7.0.3"
}，开发环境依赖 指定了项目开发时所依赖的模块，发布时用不到它。

}

<strong>2，安装开发中实际用到的各种模块</strong>
安装/卸载语法：npm install/uninstall 包名/模块名@version   --sava / --save-dev / -g。
后面没有参数时默认会把模块直接安装到当前目录的node_modules目录中，同时模块相关的版本信息会放到包管理文件 package.json 的 dependencies 生产依赖选项中。
&emsp;&emsp; @version 指定模块的版本可选。
&emsp;&emsp;--save === -S 模块安装到生产依赖dependencies中，即：模块信息自动写入package.json中的 "dependencies" 节点选项中。项目发布上线之后还会依赖用到的模块，没有这些模块，项目不能运行。
&emsp;&emsp;--save-dev === -D 模块安装到开发依赖中，即：模块信息自动写入package.json中的 "devDependencies" 节点选项。项目上线之后不会用到的模块，例如'babel-loader'等。
&emsp;&emsp;-g,表示全局安装，就可以在任何项目的目录下使用。一般如 nodemon pm2等

注意：模块信息由模块名，模块版本信息组成。而版本号的格式如下：
如 "模块名": "可升级版本符号主版本号.次版本号.修改版本号" --》 "cross-env": "^7.0.3"
版本格式：主版本号.次版本号.修改版本号。
主版本号：功能模块有大的变动，比如增加多个模块或者整体架构发生变化。
次版本：模块局部的变动。
修改版本：bug修复或者增加一些小功能。
可升级版本符号主版本号有如下三种：
~，用户使用当前版本后，最多升级到修改版的最新版本
^,用户使用当前版本后，最多升级到次版本的最新版本
*,用户使用当前版本后，可以升级到最新版本即最新主版本

<strong>3.正式使用各种模块</strong>
根据项目的实际需求在 .js 文件中编写具体的代码即可，具体使用查看文档提供的api接口。

## 2.5 nodejs常用模块的学习
### 2.5.1 nodejs代码的执行过程
Node.js是一个由事件驱动，异步非阻塞I/O组成的轻量级高效的服务端JavaScript环境。

事件驱动(event loop)：通过监听事件是否发生触发对应的异步回调函数。
所有JavaScript代码都运行在主线程中，而任何的异步函数异步操作都会被放到event loop里

异步：事件触发时回调函数执行，nodejs中回调函数格式：第一个参数是error错误对象，第二个参数开始才是返回结果对象，使用异步编程会造成回调地狱的问题。解决方法如下：
异步编程解决方案1：promise承诺
异步编程解决方案2：async异步函数以同步的方式写异步代码，await会等待后面的异步操作执行，它是promise语法的语法糖。

非阻塞i/o，io一个系统的输入和输出，非阻塞表示系统在接收输入再到输出这段时间里可以接收其它的输入。

### 2.5.2 nodejs原生核心模块学习
#### 1. http模块
http模块是nodejs用来创建 HTTP服务器和客户端作为web server最重要的一个模块。
拓展：HTTP协议。
它是应用层的网络协议(hyper transfer protocol)超文本传输协议的缩写，用来从万维网服务器传输超文本到本地浏览器的传输协议。
它是基于TCP/IP通信协议来传递数据(HTML文件，图片等)。
它工作于客户端-服务器架构上，浏览器作为客户端通过url向服务器发送HTTP请求，服务器接收到请求经过处理后将结果返回给客户端。
特点：简单快速，灵活，无状态。
HTTP协议和url的关系：
http就是通过使用统一资源表示符(uri)来传输数据和建立连接的，而网络地址url(统一资源定位符)是一种特殊的uri对应了唯一的请求资源，url的组成和js中一样。
HTTP请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。
HTTP请求信息：request即客户端发送一个HTTP请求时传递给服务器的信息。
包括请求行，
请求头：放置本次请求的相关信息，是键值对的格式。
请求体：post请求时向后端传递的数据，
空行四部分组成
HTTP响应本质上也是一个数据流，由响应头（headers）和响应体（body）组成。
HTTP响应信息：response即服务器端返回给客户端的信息。
包括状态行，
响应头：放置本次响应的相关信息，是键值对的格式。
响应正文：服务器端返回给客户端的数据
空行四部分组成

HTTP状态码：即服务器端返回给客户端用来描述http请求状态的提示信息
由三位数字组成，第一位数字定义了响应的类型
1xx:表示服务器端已经接收到请求，正在处理
2xx:表示服务器端已经成功的正确的理解和接收请求
3xx:表示要完成对请求的响应必须进行进一步的的操作
4xx:客户端错误，即客户端发送的请求语法有问题或者无法实现
5xx:服务器端错误，即服务器端不能实现，
常见有：
200 OK 请求成功
400 bad request 客户端请求有语法错误，不能被服务器理解
401 unauthorized 请求未经过授权
403 forbidden 服务器收到了请求，但是拒绝提供服务
500 internal server error 服务器发生了不可预测的错误
503 server unavailable 服务器当前不能处理客户端的请求，过会儿可能恢复。

HTTP常见的请求方法类型：
get 
post 
put 
patch 
update 
delete

那么在浏览器输入网址到显示页面的过程是什么？
1.客户端进行dns解析(查找网址对应的ip地址)，建立tcp连接(三次握手)，发送http请求。
2.server端接收到http请求，处理并将结果返回。server端怎么接收http请求在node中就是使用http模块操作的。
3.客户端接收到返回的数据并进行处理，渲染页面，执行js等

处理get请求，即客户端向服务端获取数据，
    要使用url模块获取整个url然后截取?前面部分，和req.method结合以此来做路由接口，
    使用querystring模块解析查询字符串。
处理post请求，客户端向服务器端传递数据，
    在node中通过 req.on('data',callback) 监听data事件，数据是像水流一样一点点传递，传递过程中会一直触发data事件并执行对应的回调函数。
    在所有数据传递完成会触发end事件 req.on('end',callback) ，并执行回调函数。

每次客户端发送请求时就会触发回调函数中的两个对象request，response。
req:request的缩写，表示请求对象，可以用来获取一些客户端请求发送给服务器的信息。即客户端传过来的东西。
常用请求对象：
req.headers 获取请求头信息(是一个对象)
req.rawHeaders 获取请求头信息(是一个数组)
req.httpVersion 获取http协议的版本
req.method 获取http请求的方法类型名，大写
req.url 获取整个请求路径path,包括查询字符串。所以可以通过 '?' 进行拆分，前面为路由，后面为查询字符串
或者通过url模块的parse()方法解析
注意这里的path和query都是我们自己加给req对象的属性，本身是没有的。
req.path = req.url.split('?')[0] ,自定义路由
req.query = req.url.split('?')[1]，自定义查询字符串对象
req.on() 用来监听事件，事件名及含义由node给出

res:response的缩写，表示响应对象，是服务器端响应给浏览器的一些是数据。
需要程序猿编写指明返回的是什么。即：我们设置返回给浏览器的信息。
常用响应对象：
res.statusCode = 404 设置响应的状态码
res.statusMessage = 'Not Found' 设置响应信息
res.setHeader('Content-Type','text/html;charset=utf-8') 设置响应头的数据编码格式
res.write(写数据) 设置响应返回的数据，直接写到HTML页面上
res.end(JSON.stringify(data)) 结束响应并将json格式的字符串数据返回

#### 2. fs模块
fs(文件系统)模块提供了用于以模仿标准 POSIX 函数的方式与文件系统进行交互的API。
提供的API基本上可以分为以下三类：
    1、文件属性的读写：其中常用的有fs.stat、fs.chmod、fs.chown等等。
    2、文件内容的读写：其中常用的有fs.readdir、fs.readFile、fs.writeFile、fs.createWriteStream、fs.mkdir等等。
    3、底层文件操作：其中常用的有fs.open、fs.read、fs.write、fs.close等等。
所有文件系统中的操作都具有以下三种形式：
    1、同步方法，区别在于同步方法名是在异步回调函数方法名后面多加了Sync --> fs.异步回调函数名Sync
    2、异步回调函数方法，异步的形式将完成回调作为其最后一个参数,且该回调函数的第一个参数始终预留用于有错误或异常发生时的error对象，第二个参数则始终用于返回API方法的执行结果。
    3、基于promise的方法,基于promise在异步回调函数名前加promises --> fs.promises.回调异步函数名
注意：1.在15.x版本之后语法有所改变 2.原则上都不使用同步的方法。
#### 3. path模块
path(路径)模块提供用于处理文件和目录路径的实用api，这个模块一般是要和url，fs等模块一起使用的。
#### 4. url模块
url 模块用于处理与解析URL，跟原生js的url接口组成基本一样。常与querystring,path等模块一起使用实现nodejs原生的路由。
注意：在v11.0版本之后url.parse方法已经被移除，使用其它的方法解析url了。现在使用的是和Web 浏览器使用的相同的 WHATWG URL 标准的更新的 API。也就是直接使用URL类即可而不用再使用url模块了,本质上可以看作是url模块的一个属性 URL === require('url').URL --> true
#### 5. querystring模块
querystring 模块提供用于解析和格式化 URL查询字符串的实用api,常与url,path等模块一起使用。
所谓查询字符串，就是url网址 ?后面的内容。
#### 6. stream模块
#### 7. events模块
node事件模块events，node是事件驱动的模型(事件轮询机制)本质都是设计模式中的观察者模式实现的。
即nodejs会将每一个异步事件生成一个事件观察者，并统一存放到事件队列里，当有事件触发了就会执行对应的回调函数，不断轮流询问事件队列直到没有了事件才停止这就是事件轮询机制。
通过events的EventEmitter类实现对事件的绑定监听和触发
// 创建eventEmitter对象
const eventEmitter = new events.EventEmitter()

// 绑定事件和对应的回调函数
eventEmitter.on('eventname',eventHandler)

// 触发定义的事件
eventEmitter.emit('eventname')
http模块的req参数实现了这个接口，通过req.on('eventname',eventHandler)可以监听node定义的事件。
#### 8. os模块
os（操作系统）模块提供了一些操作电脑系统的相关api，了解就行。

### 2.5.3 nodejs常用第三方模块学习

#### 1. nodejs操作数据库模块
主要学习操作MySQL，mongodb，redis这三种数据库即可。在学习node-blog那里有笔记和实例。
##### 1.1 node操作MySQL数据库
通过第三方模块 mysql模块操作MySQL数据库实现数据的增删改查(CRUD)。
实际上学习的主要是sql语句，因为node连接MySQL数据是很简单的。
##### 1.2 node操作Mongodb数据库
使用 mongoose模块，它是一个MongoDB对象建模工具，设计用于异步环境支持promise和回调函数两个形式。
好处是不用在一数据库是否连接上就可以设计模型或者进行数据的curd操作。
安装：npm install mongoose。
使用步骤：
1. 引入 mongoose 模块：const mongoose = require('mongoose')
2. 创建连接对象，mongoose.connect()方法只创建一个数据库连接,mongoose.createConnection()方法可以创建多个数据库连接。这两个方法接收的形参是一样的，一般我们使用一个数据库所以使用mongoose.connect()。
如：连接本地的express-test 数据库写法如下，注意如果localhost不起作用使用127.0.0.1代替。线上远程服务器地址就写远程的，本质是一样的。
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
3. 定义模型，对数据库中的数据进行curd操作。
如此这样只要在入口文件中引入这个文件就连接上数据库并能操作数据了，但是定义模型这一步一般抽离到另外的js文件中书写。所以我们一般是会封装一个只负责连接数据库的异步函数导出，然后在入口文件中引入执行这个异步函数即可，具体如下。
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
通过mongoose模块的 Schema接口定义文档结构包含的字段名，字段约束以及存储数据的类型，通过model方法创建模型。
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
// 注：在定义schema那里其实可以分成两步写的
//1先获取schema对象
const Schema = moogoose.Schema
//2 new出规范实例
const Adschema = new Schema({
    name:{type:String},
    items:[{image:{type:String},url:{type:String},}]    
})
//3使用model方法创建数据模型
const Ad = mongoose.model('Ad', Adschema)
//4导出Ad，这样就可以通过Ad这个变量对象来操作“广告”这个集合(表)了
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
用来处理字符串，遍历数组(里面是对象的)，对象时都可以考虑使用
安装：npm install lodash
引入：const _ = reuqire('lodash')

#### 3. inflection模块
安装：npm install inflection
转化英文单复数，转化为驼峰格式的类名等可以考虑使用inflection库

#### 4. dayjs模块
Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样。
特点：有很多 API 来解析、处理、校验、增减、展示时间和日期。
    和 Moment.js 相同的 API 和用法
    不可变数据 (Immutable)
    支持链式操作 (Chainable)
    国际化 I18n
    仅 2kb 大小的微型库
    全浏览器兼容

安装：npm install dayjs --save

























## 2.6 nodejs登陆功能的实现
登陆功能业界已有成熟的解决方案，学习即可。
核心是登陆信息怎么校验以及登陆信息怎么存储。
### 2.6.1 cookie
1.  cookie
在开始之前要回到之前学习的http协议是无状态的，也就是说这次发起了http请求在连接关闭后，服务端不会记录用户的信息，下次你再发起http请求时，服务器还是无法判断你是谁，这也就是无状态的含义。这时就需要一种技术让服务器能记住我是谁，即解决 "如何记录客户端的用户信息"的问题。
Cookie 就是用于存储 web 页面当前用户信息的一小段的文本信息，本质是以名/值对形式（key-value格式）存储在浏览器端(客户端)的一段字符串(最大5kb)。

cookie的机制：
客户端第一次发送一个请求到服务器 --》 这时由于是第一次肯定是没有cookie的
服务器在接收到前端发送的请求时，会生成一个唯一的信息(如用户id)其实也就是cookie，并通过http响应头的Set-Cookie字段把cookie返回给客户端， --》
客户端在接收到响应头后取出cookie并保存在浏览器中，之后再向服务器发送http请求时，都将这个Cookie放在http请求头中一起发送给服务器端 --》
服务器再次接收到请求时，检查请求头中是否存在cookie，存在则返回响应数据给前端即可。如此整个流程也就走完了一次。

cookie的属性项
属性项 	属性项介绍
形式：NAME=VALUE 键值对，可以设置要保存的 Key/Value，注意这里的 NAME 不能和其他属性项的名字一样
Expires 	过期时间，在设置的某个时间点后该 Cookie 就会失效,不设置则关闭浏览器窗口时消失。
Domain 	生成该 Cookie 的域名，如 domain="www.baidu.com"
Path 	该 Cookie 是在当前的哪个路径下生成的，如 path=/wp-admin/
Secure 	如果设置了这个属性，那么只会在 SSL 连接时才会回传该 Cookie

特点：
    跨域不共享：浏览器为每一个不同的域名存储一段cookie
    格式如 key=value; k1=v1;k2=v2;k3=v3; 可以结构化存储数据了，
    每次发送http请求，都会把请求域(向谁请求)中的cookie一起发送给后端(server端)。
    server端可以修改cookie的值并返回给浏览器(res)。
    浏览器也可以通过js修改cookie但是有限制，一般只能设置过期时间等
    支持设置为 HttpOnly，防止 Cookie 被客户端的 JavaScript 访问。

在浏览器端是可以直接操作cookie的，通过document.cookie 属性来创建 、读取、及删除 cookie。
读取：const x = document.cookie;
设置/修改：document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
删除 cookie 非常简单。只需要设置 expires 参数为以前的时间即可。但是一般不这样操作。

前端在接收到服务器端返回的cookie信息时一般是存储在浏览器localStorage和sessionStorage中，这就又是另外的知识了。

2. localStorage本地存储
一种持久化的存储方式，也就是说如果不手动清除，数据就永远不会过期。
它是采用键值对的方式存储数据，按域名将数据分别保存到对应数据库文件里。
相比 Cookie 来说，它能保存更大的数据。
localStorage 的特点：
    大小限制为 5MB ~10MB；
    在同源的所有标签页和窗口之间共享数据；
    数据仅保存在客户端，不与服务器进行通信；
    数据持久存在且不会过期，重启浏览器后仍然存在；
    对数据的操作是同步的。
常用api：
    // 通过setItem()增加一个数据项
    localStorage.setItem('myName', 'Semlinker');
    // 通过getItem()获取某个数据项
    let me = localStorage.getItem('myName');
    // 通过removeItem()移除某个数据项
    localStorage.removeItem('myName');
    // 移除所有数据项
    localStorage.clear();

3. sessionStorage会话存储
与服务端的 session 类似，sessionStorage 是一种会话级别的缓存，关闭浏览器时数据会被清除。
需要注意的是 sessionStorage 的作用域是窗口级别的，也就是说不同窗口之间保存的 sessionStorage 数据是不能共享的。

sessionStorage 的特点：
    sessionStorage 的数据只存在于当前浏览器的标签页；
    数据在页面刷新后依然存在，但在关闭浏览器标签页之后数据就会被清除；
    与 localStorage 拥有统一的 API 接口；对数据的操作是同步的。
常用api：
    // 通过setItem()增加一个数据项
    sessionStorage.setItem('myName', 'Semlinker');
    // 通过getItem()获取某个数据项
    let me = sessionStorage.getItem('myName');
    // 通过removeItem()移除某个数据项
    sessionStorage.removeItem('myName');
    // 移除所有数据项
    sessionStorage.clear();
这上面是浏览器端也就是前端操作cookie。

node后端操作cookie，进而实现登陆验证。
通过 req.headers.cookie 可以获取前端请求头中携带的cookie数据。

通过 res.setHeader('Set-Cookie',`username=${data.username};path=/;httpOnly;expires=${getCookieExpires()};Secure`)，服务器端可以设置响应头信息返回cookie。

### 2.6.2 session
事实上使用上面的cookie已经可以实现用户的登陆验证了，不过使用cookie存储会暴露username(用户名，手机号，邮箱名等)等个人重要信息所以是很危险的。
解决方法：cookie中存储userId,后端保存对应的敏感信息如username。
这样只要后端的username与userId唯一对应就好。
本质上session是服务器端内存中的一个内存区域也就是一个对象，它存储了userId与真正用户名对应的信息。
它是一种解决cookie存储缺点的方法



session写入redis










# 三、其它后端知识
## 3.1 nginx的使用
## 3.2 线上环境部署