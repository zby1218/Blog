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
    //获得博客列表
    if(method == "GET" && req.path == '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const result = getList(author , keyword);
        //这里用两个return暂时不能理解
        return result.then((listData)=>{
            return new SuccessModel(listData);
        })
        .catch(error =>{
            console.log(error);
            
            
        })
       

    }
    //查询博客
    if(method == "GET" && req.path == '/api/blog/detail'){
       const result = getDetail(id);
       return result.then(data=>{
           return new SuccessModel(data);
       })
       
    }
    //新建博客
    if(method == "POST" && req.path == '/api/blog/new'){
        req.body.author = 'zhangsan';
        
        
        const result = setBlog(req.body);
        
        return result.then(data=>{
            return new SuccessModel(data);
        })
        

    }
    //更新博客
    if(method == "POST" && req.path == '/api/blog/update'){
        const result = updateBlog(id , req.body);
        //返回一个布尔值，布尔值将决定返回值
        //return很重要，错在这里，没有返回值将影响外层
        return result.then(judge=>{
            console.log(`${judge}`);
            console.log('true');
            
            if(judge){
                return new SuccessModel('更新成功');
            }
            return new FalseModel('更新失败');
        })


    }
    //删除博客
    if(method == "GET" && req.path == '/api/blog/del'){
        const author = 'zhangsan';
        const result = delBlog(id,author);
        return result.then(judge=>{
            if(judge){
                return new SuccessModel('删除成功');
            }
            return new FalseModel('删除失败');
        })
       

    }


}

module.exports = blogHandle;