## nodeJs搭建博客

### 项目分层

项目分层是一步步走，最后到位的。此次项目在分层方面对我的启迪和帮助很大。

- 项目运行层

   **index.js**：主要负责建立服务器

- 项目路由层

   **blog.js** **user.js**：主要负责判断路由的正确性

- 项目操作层

   **server.js** 主要负责对请求作出相应，进行返回数据等操作

- 返回值模型处理层

   **Model.js**建立多个类，对返回值格式进行控制

- 返回数据真值处理层

  **return.js**：对返回值数据进行控制

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

#### 开发接口开发顺序

- 建立了本地服务器，index.js
- 建立文件blog.js及user.js，对路由进行判断
- 建立了一个创建类的文件Model.js文件，对返回值进行包装
- 建立server.js文件，对返回值进行操作处理
- 建立blogReturn.js及userReturn.js对返回值进行详细处理

| 文件名        | 主要函数       | 函数返回值         | 函数作用                                                 |
| ------------- | -------------- | ------------------ | -------------------------------------------------------- |
| index.js      | createServer() | 返回一个server对象 | 建立本地服务器                                           |
| blog.js       | blogHandle()   | 返回一个数据对象   | 对路由进行处理，并调用其它函数返回数据                   |
| user.js       | userHandle()   | 返回一个数据对象   | 对路由进行处理，并调用其它函数返回数据                   |
| server.js     | serverHandle() | 返回一个json数据   | 将返回的数据对象转换为JSON格式返回                       |
| Model.js      | BaseModel()    | 一个类             | 传入数据或文字，加上状态码（表示成功或失败）作为对象返回 |
| blogReturn.js | ALL            | 数据对象           | 觉决定各个操作具体的返回值                               |
| userReturn.js | ALL            | 数据对象           | 觉决定各个操作具体的返回值                               |



#### 应用技术

- ES6
  - 各个跨文件函数通过解构赋值进行传输
  - 在Model.js使用class类及constructer和super函数
  - 箭头函数
  - Promise函数

#### blog路由接口处理

> 文件名blog.js

使用原生nodejs直接返回json数据，接口只返回数据，不进行操作，对数据返回与操作层做一个抽离。

- 设置函数blogHandle，参数`req` `res`，函数对传入的路由及请求方式进行判断，返回一个数据对象
- 使用`module.exports`将blogHandle函数导出

#### user路由接口处理

> 文件名user.js

使用原生nodejs直接返回json数据，接口只返回数据，不进行操作，对数据返回与操作层做一个抽离。

- 设置函数userHandle，参数`req` `res`，函数对传入的路由及请求方式进行判断，**返回一个数据对象**
- 使用`module.exports`将userHandle函数导出

> blog 与user属于不同的路由，因此尽管代码极其相似，不能加以复用。

#### 接口返回操作处理

> 文件名server.js

- 设置函数serverHandle，此函数将对请求进行统一处理
- 设置请求头res.setHeader('Content-type','application/json')
- 获得请求的url，分割出请求路由path，添加到req上作为一个属性，起到了跨文件传输作用
- **将接口函数返回的数据对象转换成JSON对象**
- 内部函数getPostData使用promise获得了post的数据流

#### 接口返回类的处理

> 文件名：Model.js

- 文件构建一个父类BaseModel和两个子类，接受返回的数据，同时生成错误码。相当于对返回数据进行了包装，精简代码

#### 接口返回数据处理

> 文件名：blogReturn.js userReturn.js

- 建立多个具体的返回数据函数

