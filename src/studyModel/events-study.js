/**
 * node原生事件模块events
 * 通过events的EventEmitter类实现对事件的绑定监听和触发
 */
const events = require('events')

// 创建eventEmitter实例对象
const eventEmitter = new events.EventEmitter()


// 定义事件名并绑定对应的回调函数
eventEmitter.on('eventname',eventHandler)

// 在想触发事件的地方写上就会触发定义的事件
eventEmitter.emit('eventname')


















// EventEmitter类本质类似发布订阅的模式
// const EventEmitter = {
//   // 定义一个事件循环队列存放事件
//   event:{
//     // eventName:[eventFn1,eventFn2]
//   },
//   // 定义on()函数
//   on(eventName,eventFn){
//     // 判断事件队列里是否已经存在传入的事件
//     if(this.event[eventName]){
//       //已经存在就把对应的回调写入
//       this.event[eventName].push(eventFn)
//     }else{
//       //不存在初始化为一个数组，并把对应回调存入数组中
//       this.event[eventName] = []
//       this.event[eventName].push(eventFn)
//     }
//   },
//   // 定义emit()函数
//   emit(eventName,eventMsg){
//     // 如果事件队列里有就循环执行
//     if(this.event[eventName]){
//       this.event[eventName].forEach(eventFn => {
//         eventFn(eventMsg)
//       });
//     }
//   }

// }





