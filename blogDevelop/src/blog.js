//blog.js负责博客操作方面的路由
const getList = require('./return');
const blogHandle = (req , res)=>{
    const {SuccessModle , FalseModle} = require('./Model');

    const method = req.method;
    // const url = req.url;
    // const path = url.split('?')[0];
    if(method == "GET" && req.path == '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author , keyword);
        return new SuccessModle(listData );

    }

    if(method == "GET" && req.path == '/api/blog/detail'){

        return {
            msg:'获取博客内容'
        }

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