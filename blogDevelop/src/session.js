const {set , get} = require('./redis');

//设置session的数据 date:保存在session中的数据
//随后将Session中的数据保存在数据库中
const sessionSet = (req , res )=>{
    //设置session_ID
    const userID = new Date();
    //如果Session中
    // Session[userID] = req.body;
    //将session保存在请求对象中，易于使用
    // req.session = Session[userID];
    req.session = req.body;
    //将Session存放在redis中
    set(userID , req.session);
    return userID;
}


const sessionGet = (req , res , key)=>{
   const result =  get(req.cookie[key]);
   result.then((res)=>{
       if(!res){
           return false;
       }
       //将从redis取出的值存放在req中
        req.session = res;
        return true;
   })
}
module.exports = {sessionSet , sessionGet};