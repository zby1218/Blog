const login = (username , password)=>{
    if(username == ''&& password == ''){
        return true;
    }
    return false;
}

module.exports = {login};