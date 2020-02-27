//mysql.js是对数据库的操作
const mysql = require('mysql');
const {MYSQL_CONF} = require('./db');
//创建连接对象
//createConnection接受一个参数对象用于连接数据库
const con = mysql.createConnection(MYSQL_CONF);



//连接数据库
con.connect();

//数据库操作函数
//这个函数因为需要发送sql语句，等待返回值，是异步操作
const mysqlHandle = (sql)=>{
   
    
    const promise = new Promise((resolve , reject)=>{
        console.log(2342342);
        
        con.query(sql , (err , result)=>{
            if(err){
                //有错误则返回错误
                console.log(err);
                
                
                
                return;
            }
           
            
            resolve(result);
        } )
    })
    return promise

}

module.exports = {
    mysqlHandle
}


