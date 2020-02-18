//blog.js负责博客操作方面的路由
const {getList , getDetail} = require('./return');
//这里遇到一个问题，尽管是const一个变量，但还是需要与其它文件中变量名称相同，否则报错：
//TypeError:  is not a constructor
const {SuccessModel , FalseModel} = require('./Model');

//获得post请求数据流
const getPostData = (req)=>{
    //使用promise解决回调地狱
    const promise = new Promise((resolve , reject)=>{

        if(req.method !== 'GET'){
            resolve({});
            return;
        }
        if(req.header){
            resolve({});
            return;
        }

    })

}

const blogHandle = (req , res)=>{


    const method = req.method;
    // const url = req.url;
    // const path = url.split('?')[0];
    if(method == "GET" && req.path == '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author , keyword);
        console.log(SuccessModel);
        
        return new SuccessModel(listData );

    }

    if(method == "GET" && req.path == '/api/blog/detail'){
        const id = req.query.id || '';
        const detailData = getDetail(id);
        return new SuccessModel(detailData);
    }
    
    if(method == "POST" && req.path == '/api/blog/new'){

        return {
            msg:'新增博客内容'
        }

    }

    if(method == "POST" && req.path == '/api/blog/update'){

        return {
            msg:'更新博客内容'
        }

    }

    if(method == "POST" && path == '/api/blog/del'){

        return {
            msg:'删除博客内容'
        }

    }


}

module.exports = blogHandle;