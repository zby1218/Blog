class BaseModel {
    constructor(data , message){
        //???
        if(typeof data === 'string'){
            this.message = data;
            data = null;
            message = null;
        }
        if(data){
            this.data = data;
        }
        if(message){
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel{
    constructor(data , message){
        //ES6要求子类必须调用一次super，super就代表了父类的构造函数
        super(data , message);
        this.errno = 0;
    }

}

class FalseModel extends BaseModel{
    constructor(data , message){
        super(data , message);
        this.errno = -1;
    }
}

module.exports = {

    SuccessModel,
    FalseModel
}