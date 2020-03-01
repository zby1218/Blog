//user.js负责登录的路由
const {
    login
    } = require('./userReturn');
const {cookieSet,cookieGet} = require('./cookie');
const {SuccessModel , FalseModel} = require('./Model');

const userHandle = (req , res)=>{

    // const url = req.url;
    // const path = url.split('?')[0];
    //原本user.js及blog.js都有一个这样的操作，但可以将路由直接加到req上，结构进一步精简
    //如果能够获取到cookie，则可以登录。
    if(cookieGet()){
        return new SuccessModel('登录成功');
    }
    if(req.method == "POST" && req.path == "/api/user/login"){
        //获取传入的用户名及密码
        

       
        const {username , password} = req.body;
        //判断账号密码是否正确
        const result = login(username , password);
        console.log(req.body);
        
        return result.then(data=>{
            console.log(data.username);
           
            
            if(data.username){
                //登录成功后设置cookie
                cookieSet(req , res);
                return new SuccessModel('登录成功');
            }
            return new FalseModel('登录失败')
        })


    }

}

module.exports = userHandle;