import Redis from "ioredis";

// 创建链接实例
const redis = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  // family: 4, // 4 (IPv4) or 6 (IPv6)
  // password: "auth",
  db: 0,
});

// 字符串
// 回调函数形式
redis.set("foo", "bar", (err, reply) => {
  console.log(reply);
});

// promise形式
redis.set("mykey", "value").then((reply) => {
  console.log(reply);
});

// 添加元素到集合
redis.sadd("myset", "element1", "element2", "element3");

// 从集合中移除元素
redis.srem("myset", "element2");

// 检查元素是否存在于集合中
redis.sismember("myset", "element1").then((result) => {
  console.log("Is member:", result); // true
});

// 获取集合中的所有元素
redis.smembers("myset").then((members) => {
  console.log("Members:", members);
});

// 设置哈希字段的值
redis.hset("myhash", "field1", "value1");
redis.hset("myhash", "field2", "value2");

// 获取哈希字段的值
redis.hget("myhash", "field1").then((value) => {
  console.log("Value:", value); // "value1"
});

// 删除哈希字段
redis.hdel("myhash", "field2");

// 获取整个哈希对象
redis.hgetall("myhash").then((hash) => {
  console.log("Hash:", hash); // { field1: 'value1' }
});

// 在队列的头部添加元素
redis.lpush("myqueue", "element1");
redis.lpush("myqueue", "element2");

// 获取队列中所有元素
redis.lrange("myqueue", 0, -1).then((elements) => {
  console.log("Queue elements:", elements);
});
//获取长度
redis.llen("myqueue").then((length) => {
  console.log("Queue length:", length);
});

//
