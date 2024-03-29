const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master 进程 ${process.pid} 正在运行`);
    
  for (let i = 0; i < numCPUs; i++) { // 衍生工作进程。
    cluster.fork();
    }
    
  cluster.on('exit', (worker, code, signal) => { console.log(`Worker ${worker.process.pid} 已退出`) });
} else {
  http.createServer((req, res) => res.end(`你好世界 ${process.pid}`)).listen(8000);
  console.log(`Worker 进程 ${process.pid} 已启动`);
}