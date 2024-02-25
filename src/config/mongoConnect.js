module.exports = async app => {
  // 1. 引入 mongoose 模块
  const mongoose = require('mongoose')
  // 引入数据库相关的配置
  const {MONGO_CONF} = require('./globalConfig')
  // 2. 创建一个连接
  try {
    await mongoose.connect(`mongodb://${MONGO_CONF.host}:${MONGO_CONF.port}/${MONGO_CONF.database}`)
  } catch (error) {
    console.log("数据库连接失败",err)
    throw error
  }
}