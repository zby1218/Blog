//server.js负责对路由的处理
const blogHandle = require('./blog');
const userHandle = require('./user');

const serverHandle = (req , res)=>{

    //设置请求头
    res.setHeader('Content-type','application/json');
    const url = req.url;
    req.path = url.split('?')[0];
    //处理blog的路由
    const blogData = blogHandle(req , res);
    //根据是否有返回值来进行操作
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
         return;
    }
    const userData = userHandle(req , res)
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
        return;
    }

    //如果没有对应的路由则返回404
    res.writeHead(404 , {'content-type':'text/plain'})
    res.write('404 Not Found');
    res.end();
}


module.exports = serverHandle;