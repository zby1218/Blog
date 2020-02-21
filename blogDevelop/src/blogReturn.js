const {mysqlHandle} = require('./mysql');

const getList = (author , keyword)=>{
    //后面加入1=1是为了防止author或keyword没有值sql报错，是用来占位置的
    //同时这样可以进行模糊查询，只输入一个值也可查询而不报错
    let sql = `select * from blogs where 1=1 `;
    if(author){
        //这里即使采用变量赋值的方法仍需要转换为字符串
        sql += `and author='${author}' `
    }
    if(keyword){
       
        
        sql += `and title like '%${keyword}%' `
    }
    //根据创建时间逆序排序
    sql += `order by createtime desc;`
    
    //返回一个promise对象
    return mysqlHandle(sql);

}

const getDetail = (id)=>{

   const sql = `select * from blogs where id='${id}'; `
   return mysqlHandle(sql).then((result)=>{
       //返回的result是一个数组，但第一位是对象，所以把第一位返回
       return result[0];
   })

}

//新增博客返回函数
//es6新语法，参数声明时赋值
const setBlog = (blogData )=>{
    // const {
    //         title , 
    //         content,
    //         author,
    //         createtime
    //     } = {
    //             blogData.title,
    //             blogData.content,
    //             blogData.author,
    //             Date.now()
    //         };
    const title = blogData.title,
        content = blogData.content,
         author = blogData.author,
     createtime = Date.now();
   
    const sql = `insert into blogs(title,content,author,createtime) values('${title}','${content}','${author}','${createtime}'); `;
    //这就不用加插入失败的判断吧，插入应该不会有问题
    return mysqlHandle(sql).then((result)=>{
        return {
            id:result.insertId
        }
    })


}
//根据id进行修改，所以id是已知参数
const updateBlog = (id , blogData = {})=>{
    //返回一个布尔值，代表更新成功与否
   const title = blogData.title;
   const content = blogData.content;
    //这里的id不用加引号，id是整型
   const sql = `update blogs set title='${title}',content='${content}' where id=${id}; `
    //到这里差点忘了，返回的是promise对象
   return mysqlHandle(sql).then((result)=>{
       //数据库执行对应操作返回的对象属性，影响的行数，如果大于0证明
       //修改过
        if(result.affectedRows > 0){
            return true;
        }
        return false;    
    })
}

const delBlog = (id,author)=>{

    const sql = `delete from blogs where id='${id}' and author='${author}'; `
    return mysqlHandle(sql).then((result)=>{
        if(result.affectedRows >0){
            return true;
        }
        return false;
    }
    )
    

}



module.exports = {
    getList,
    getDetail,
    setBlog,
    updateBlog,
    delBlog
}