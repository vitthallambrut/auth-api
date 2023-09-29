const DbSetting = require('../dbsetting/db_setting');
const dbSettingInstance = new DbSetting();

class TaskModel {
    saveTask(inputObj) {
        return dbSettingInstance.query('insert into public.task_details (title, description, duedate, priority, userid) values ($1,$2,$3,$4,$5) returning userid',[inputObj.title,inputObj.description,inputObj.dueDate,inputObj.priority,inputObj.userid]);
    }
    updateTask(inputObj){
        return dbSettingInstance.query('update public.task_details set title=$1, description=$2, duedate=$3, priority=$4 where id=$5 returning id',[inputObj.title,inputObj.description,inputObj.dueDate,inputObj.priority,inputObj.id]);
    }
    gettasklist(inputObj){
        return dbSettingInstance.query('select id, userid, title, description, duedate, priority, created_date, updated_date from public.task_details where userid=$3 order by created_date desc offset $1 limit $2',[inputObj.pageno,inputObj.pagesize,inputObj.userid]);
    }
    deleteTask(inputObj){
        return dbSettingInstance.query('delete from public.task_details where id=$1 returning id',[inputObj.id]);
    }
    getTask(inputObj){
        return dbSettingInstance.query('select id, userid, title, description, duedate, priority, created_date, updated_date from public.task_details where id=$1',[inputObj.id]);
    }
}

module.exports = TaskModel;