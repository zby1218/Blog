//blog.js负责博客操作方面的路由
const {
        getList , 
        getDetail,
        setBlog,
        updateBlog,
        delBlog
    } = require('./blogReturn');
//这里遇到一个问题，尽管是const一个变量，但还是需要与其它文件中变量名称相同，否则报错：
//TypeError:  is not a constructor
const {SuccessModel , FalseModel} = require('./Model');



const blogHandle = (req , res)=>{

    const id = req.query.id || '';
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
       
        const detailData = getDetail(id);
        return new SuccessModel(detailData);
    }
    
    if(method == "POST" && req.path == '/api/blog/new'){
        const data = setBlog(req.body);
        return new SuccessModel(data);

    }

    if(method == "POST" && req.path == '/api/blog/update'){
        const judge = updateBlog(id , req.body);
        //返回一个布尔值，布尔值将决定返回值
        if(judge){
            return new SuccessModel(judge);
        }
        else{
            return new FalseModel('博客更新失败');
        }
        


    }

    if(method == "POST" && path == '/api/blog/del'){
        const judge = delBlog(id);
        if(judge){
            return new SuccessModel(judge);
        }
        else{
            return new FalseModel('博客删除失败');
        }

    }


}

module.exports = blogHandle;