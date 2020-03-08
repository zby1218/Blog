//db.js负责获得数据库及redis的配置
let env = process.env.NODE_ENV //环境变量
//process.env中是没有NODE_ENV属性的，需要自己配置，因为我这是自己写的
//就不加区别了
//配置
let MYSQL_CONF
let REDIS_CONF
env = 'dev'

if(env == 'dev'){
    console.log(111);
    MYSQL_CONF = {
        
        
        host:'localhost',
        user:'root',
        password:'root',
        port:'3306',
        database:'blog'
        
    }
    REDIS_CONF = {
        host :"127.0.0.1",
        port :6379
    }
}

if(env == 'production'){
    console.log(222);
    
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'root',
        port:'3306',
        database:'blog'
    },
    REDIS_CONF = {
        host :"127.0.0.1",
        port :6379
    }
}
console.log(333);

module.exports = {MYSQL_CONF,REDIS_CONF};