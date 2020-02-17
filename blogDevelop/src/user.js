//user.js负责登录的路由
const userHandle = (req , res)=>{

    const method = req.method;
    // const url = req.url;
    // const path = url.split('?')[0];
    //原本user.js及blog.js都有一个这样的操作，但可以将路由直接加到req上，结构进一步精简
    if(method == "POST" && req.path == "/api/user/login"){

        return{
            msg:"登录注册内容"
        }

    }

}

module.exports = userHandle;