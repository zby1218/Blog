const redis = require('redis');
const {REDIS_CONF} = require('./db');


let redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host);

let set = (key , value)=>{
    //set方法只支持字符串作为值的参数，如果是对象则将其转换为字符串
    if(typeof value == 'object'){
        value = JSON.stringify(value);
    }
    redisClient.set(key , value , redis.print);
}  

//异步使用promise
let get = (key )=>{
    const promise = new Promise((resolve , reject)=>{


        //对错误和结果进行判断及处理
        redis.get(key , (err,res)=>{
            if(err){
                console.log(err);
                return;
            }
        //如果传入的key没有找到对应的值
            if(res == null){
                resolve(null);
                return;
            }
            //针对返回值类型进行处理
            try{
                //如果返回的是字符串则转换为对象
                resolve(JSON.parse(res))
            }
            catch(ex){
                //否则直接返回
                resolve(res);
            }
        })
    })
    return promise;
}

module.exports = {set , get};