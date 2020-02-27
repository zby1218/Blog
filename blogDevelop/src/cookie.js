//设置cookie函数，会在登录模块引用
const cookieSet = (req , res )=>{
   
   
    res.setHeader('Set-Cookie',`username=${req.body.username};path=/`);

}

module.exports = {cookieSet};