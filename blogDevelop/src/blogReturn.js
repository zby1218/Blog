const getList = (author , keyword)=>{

    return [
        {
            id:1,
            title:'震惊！',
            content:'竟发生这种事！大家都惊呆了',
            author:'zby',
            createTime:1651
        },
        {
            id:2,
            title:'竟然!',
            content:'不会吧，真的吗，不要啊',
            author:'xiaoming',
            createTime:2342
        }
    ]

}

const getDetail = (id)=>{

    return [
        {
            id:1,
            title:'震惊！',
            content:'竟发生这种事！大家都惊呆了',
            author:'zby',
            createTime:1651
        },
        {
            id:2,
            title:'竟然!',
            content:'不会吧，真的吗，不要啊',
            author:'xiaoming',
            createTime:2342
        }
    ]

}

//新增博客返回函数
//es6新语法，参数声明时赋值
const setBlog = (blogData = {})=>{

    return {
        id:3
    }

}
//根据id进行修改，所以id是已知参数
const updateBlog = (id , blogData = {})=>{
    //返回一个布尔值，代表更新成功与否
    return true

}

const delBlog = (id)=>{

    return true;

}



module.exports = {
    getList,
    getDetail,
    setBlog,
    updateBlog,
    delBlog
}