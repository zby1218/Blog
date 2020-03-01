const {sessionSet} = require('./session');
//设置cookie函数，会在登录模块引用
const cookieSet = (req , res )=>{
   //考虑到安全性问题，使用session存储数据，使用cookie来存储对session的索引
   

   //设置cookie，同时使cookie保存在根目录下  设置前端不能进行更改   注意里面都是分号
    res.setHeader('Set-Cookie',`userID=${sessionSet(req,res)} ;path=/;httpOnly;expires=${usefulTime()}`);
    console.log('cookie',req.headers.cookie);
    
}

//设置coolie的过期时间
const usefulTime = (req , res)=>{

    const now = new Date();
    const unuseful = now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
    return unuseful.toGMTString();

}

// 解析cookie的函数
const cookieGet = (req , res)=>{
    req.cookie = {}
    const cookieStr = req.headers.cookie ||'';
    cookieStr.split(';').forEach(element => {
    //对cookie中没有值做处理
        if(!element){
            return false;
        }
        const arr = item.split('=');
        const key = arr[0];
        const value = arr[1];
        //有点像哈希表，是js中对象的一种表示方法
        req.cookie[key] = value;
        return true;
    });

}

module.exports = {cookieSet,cookieGet};