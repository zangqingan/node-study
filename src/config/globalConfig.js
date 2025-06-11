// 获取环境变量,在package文件里定义的
const env = process.env.NODE_ENV;

const PORT = 8000;
const HOSTNAME = "localhost";
// 定义mysql和redis连接的配置对象
let MYSQL_CONF;
let MONGO_CONF;
let REDIS_CONF;
// 如果是dev环境
if (env === "dev") {
  // MYSQL
  MYSQL_CONF = {
    // 域，线上环境就是线上的数据库地址，本地是localhost
    host: "localhost",
    // 用户
    user: "root",
    password: "123456",
    port: "3306",
    database: "myblog", //指定连接的数据库
  };
  // MONGODB
  MONGO_CONF = {
    // 域，线上环境就是线上的数据库地址，本地是localhost
    host: "127.0.0.1",
    port: "27017",
    database: "express-test", //指定连接的数据库
  };
  // REDIS
  REDIS_CONF = {
    port: 6739,
    host: "127.0.0.1",
  };
}

// 如果是production环境
if (env === "production") {
  // MYSQL 实际开发时写真实的
  MYSQL_CONF = {
    // 域，线上环境就是线上的数据库地址，本地是localhost
    host: "localhost",
    // 用户
    user: "root",
    password: "123456",
    port: "3306",
    database: "myblog", //指定连接的数据库
  };
  // MONGODB
  MONGO_CONF = {};
  // REDIS
  REDIS_CONF = {
    port: 6739,
    host: "127.0.0.1",
  };
}

module.exports = {
  PORT,
  HOSTNAME,
  MYSQL_CONF,
  MONGO_CONF,
  REDIS_CONF,
};
