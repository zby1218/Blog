//server.js负责对路由的处理
const blogHandle = require('./blog');
const userHandle = require('./user');
const querystring = require('querystring');

//获得post请求数据流
const getPostData = (req)=>{
    //使用promise解决回调地狱
    const promise = new Promise((resolve , reject)=>{

        if(req.method !== 'GET'){
            resolve({});
            return;
        }
        if(req.header['content-type'] !== 'application/json'){
            resolve({});
            return;
        }

        let postData = '';
        req.on('data',(chunk)=>{
            postData += chunk;
        })
        req.on('end',()=>{
            //如果postData没有值
            if(!postData){
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise;
}

const serverHandle = (req , res)=>{

    //设置请求头
    res.setHeader('Content-type','application/json');
    const url = req.url;
    req.path = url.split('?')[0];

    req.query = querystring.parse(url.split('?')[1]);
    //获取post数据流，将其保存在req.body中，因为getPostData对有无post数据都
    //进行了处理，所以可以将统一的返回值处理放到post数据流函数中
    getPostData(req).then((postData)=>{
        //此处将postData赋给body这样后面的路由都可以用到postData了
        req.body = postData;

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
    })
   
}


module.exports = serverHandle;