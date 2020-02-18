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

module.exports = {
    getList,
    getDetail
}