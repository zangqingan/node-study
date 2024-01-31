// 获取环境变量、根据不同的变量值使用不同的配置
if(process.env.NODE_ENV === 'production'){
    console.log('生产环境',process.env.NODE_ENV);
}else{
    console.log('非生产环境',process.env);
}
