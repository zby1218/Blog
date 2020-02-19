//user.js负责登录的路由
const {
    login
    } = require('./userReturn');

const {SuccessModel , FalseModel} = require('./Model');
const userHandle = (req , res)=>{

    // const url = req.url;
    // const path = url.split('?')[0];
    //原本user.js及blog.js都有一个这样的操作，但可以将路由直接加到req上，结构进一步精简
    if(req.method == "POST" && req.path == "/api/user/login"){
        //获取传入的用户名及密码
        const {username , password} = req.body;
        const result = login(username , password);
        if(result){
            return new SuccessModel(result);
        }
        return new FalseModel(result);

    }

}

module.exports = userHandle;