const {mysqlHandle} = require('./mysql');


const login = (username , pas)=>{
    
   
    
    //sql里面查询用户名和真实姓名
    const sql = `select username,pas from user where username='${username}' and pas='${pas}'; `;
    return mysqlHandle(sql).then(result=>{
        //如果没查询到则返回一个空对象
        
        return result[0] ||{};
    })
  
}

module.exports = {login};

//项目简介 技术 功能 
//列出来接口格式
//项目总结与反思