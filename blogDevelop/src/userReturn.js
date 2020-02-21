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