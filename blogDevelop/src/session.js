const Session = {};
//设置session的数据 date:保存在session中的数据
const sessionSet = (req , res )=>{
    //设置session_ID
    const userID = new Date();
    //如果Session中
    Session[userID] = req.body;
    //将session保存在请求对象中，易于使用
    req.session = Session[userID];
    return userID;
}

module.exports = {sessionSet};