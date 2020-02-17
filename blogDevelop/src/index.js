//index.js是js文件入口
const http = require('http');
const serverHandle = require('./server');

const server = http.createServer((req , res)=>{

    serverHandle(req , res);

})

server.listen(3000,()=>{
    console.log('running...');
    
})