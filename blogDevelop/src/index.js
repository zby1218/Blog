//index.js是js文件入口
const http = require('http');
const serverHandle = require('./server');

const server = http.createServer((req , res)=>{

    serverHandle(req , res);

})

const port = 3000;

server.listen(port,()=>{
    console.log('running...');
    
})