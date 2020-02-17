## nodeJs搭建博客

### ES6使用

- 使用解构赋值来导入模块化

  在a.js文件中

  ```js
  function add(a , b){
      return a+b;
  }
  
  function mul(a , b){
  
      return a*b;
  }
  
  module.exports = {
  
      add,
      mul
  
  }
  ```

  在b.js文件中

  ```js
  const {add,mul} = require('./a.js')
  ```

### 用vscode调试node.js

使用vsCode调试nodeJs

设置package.json文件中的"main"属性，即设置主文件，随后点击vsCode中倒数第二个小虫子图标，在"main"指向的主文件中打断点，就可开始调试



### 创建服务

- 首先引入node自带的包

  ```js
  const http = require('http')
  ```

  - 在引入node的包时不用携带路径，它会自动进行顺序搜索
  - 在引入js文件时需要携带路径，这样才能找到对应的js文件。
  - 发生这两个情况的原因是node引入的包在package.json中已经存在了依赖，可以通过package.json文件找到。而js文件不在package.json中存在依赖，需要提供完整的路径才可以找到

- 使用api创建服务

  ```js
  const server = http.createServer((req , res)=>{
      res.writeHead(200,{'content-type':'text/html'})
      res.end('<div style="width:100px; height:100px ;background:yellow">hello world</div>')
  
  })
  ```

  - 上述代码是建立一个本地服务器，createServer是http包中的一个方法，参数是一个回调函数。
  - req全称request请求,res全称response响应。顾名思义，req是接受前端页面，我们所获得的。res是我们返回给前端页面或是我们针对请求所做的操作

- 监听对应的端口

  ```js
  server.listen(3000,() =>{
      console.log(('running....'));
      
  })
  ```

  - 上述代码是监听3000端口，第二个参数是一个回调函数，在监听成功时会打印信息，起到提示的作用

- 查看

  - 首先我们在控制台输入node + js文件名(必须在js文件的上一级文件,否则需要加入相对路径)

  我们在浏览器输入localhost: + 监听的端口号。这里我们输入localhost:3000即可看到我们的本地服务器页面了。

### 项目设计

------

#### 项目接口

| 描述               | 接口             | 方法 | url参数                      | 备注                         |
| ------------------ | ---------------- | ---- | ---------------------------- | ---------------------------- |
| 获取博客列表       | /api/blog/list   | get  | auther作者,keyword搜索关键字 | 参数为空的话，不进行查询过滤 |
| 获取一篇博客的内容 | /api/blog/detail | get  | id                           |                              |
| 新增一篇博客的内容 | /api/blog/new    | post |                              | post中有新增的内容           |
| 更新一篇博客       | /api/blog/update | post | id                           | postData中有更新的内容       |
| 删除一篇博客       | /api/blog/del    | post | id                           |                              |
| 登录               | /api/user/login  | post |                              | postData中有用户名和密码     |

------

#### 开发接口

> 不使用框架

首先我们需要完成下面几点

- nodejs处理http请求
- 搭建开发环境
- 完成开发接口

#### nodejs处理http请求

- http请求是什么？我们在浏览器中输入一个地址，会发生什么？

  - DNS解析，建立TCP连接，发送http请求

    - DNS解析：输入一个网址，根据协议将其解析成一个域名（如我们输入www.baidu.com，chrome控制台中打开NetWork,点击一个请求内容，Headers中的Remote Address就是域名。我所产生的域名是36.104.142.32:443`443是https协议的端口号`)

    - 建立TCP连接：即三次握手及四次挥手。

      三次握手：1.客户端询问服务端是否可用 2.服务端回答客户端 3.客户端接受服务端消息并告诉服务端自己收到信息

      三次握手后发送http请求

  - server接受到http请求，处理，并返回

  - 客户端接受到返回数据，处理数据（如渲染页面，执行js）

#### 两种请求的区别

请求主要分为get及post两种，两种请求请求方式不同，数据传递方式也不同。

| 请求类别 | 前端中的请求方式                        | 传送数据的方法                                               |
| -------- | --------------------------------------- | ------------------------------------------------------------ |
| get      | 浏览器地址栏输入，点击标签中href中的url | 把参数数据列加到提交表单的ACTION属性所指的url，值和表单内各个字段分别对应，在url中可以看到 |
| post     | 表单提交                                | 通过http post机制，将表单内各个字段及其内容放置在HTML HEADER内一起传送到ACTION属性所指的内容 |

#### nodejs处理get请求

```js
const http = require('http');
const querystring = require('querystring');
const server = http.createServer((req , res)=>{
  
    console.log(req.method);
    const url = req.url;	//获得请求的url
    console.log(url);
    req.query = querystring.parse(url.split('?')[1])	//将url中的参数进行分割
    //？会将url分为问号前后两部分，这里取后面的参数部分
    console.log(req.query);
    res.end(
        JSON.stringify(req.query)	//转化为json数据，返回到页面上
    )  
    
})

server.listen(3000,() =>{
    console.log(('running....'));
    
})
```

#### nodejs处理post请求

  由于GET POST请求方式不同，我们可以直接输入url来进行GET请求，但POST不行。这里我们使用postman来进行模拟请求。

##### 使用postman

- 在主页面新建一个请求，输入url:我这里监听的是本地的3000端口，故输入localhost:3000
- 将url输入栏左侧请求方式改为POST
- 点击下方的Body ，点击点击raw 最右侧会出现文本格式选择，可以选择json,text等

##### 代码实现

```js
const http = require('http');
const server = http.createServer((req , res)=>{
  
   if(req.method == 'POST'){
        console.log(req.headers['content-type']);
        let postData = '';
        req.on('data',(chunk)=>{
            postData += chunk.toString();
        })
        req.on('end',()=>{
            console.log(postData);
            res.end('hello world')
        })

    }
})

server.listen(3000,() =>{
    console.log(('running....'));
})
```

