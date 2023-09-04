const DbSetting = require('../dbsetting/db_setting');
const dbSettingInstance = new DbSetting();

class UserModel {
    checkUser(inputObj) {
        return dbSettingInstance.query('select id, name, email, user_id, password from public.users where email=$1',[inputObj.email]);
    }
    createNewUser(inputObj){
        return dbSettingInstance.query('insert into public.users (name, email, password, user_id) values($1,$2,$3,$4) returning id',[inputObj.username,inputObj.email,inputObj.password,inputObj.userId]);
    }
    getUserDetails(inputObj){
        return dbSettingInstance.query('select id, name, email, user_id from public.users where user_id=$1',[inputObj.userId]);
    }
}

module.exports = UserModel;