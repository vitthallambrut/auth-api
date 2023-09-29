let TaskModel = require('../models/taskmodel');


class UserController {
  constructor() {
    this.taskModel = new TaskModel();
  }

  createTask = async (req,res) =>{
    try{
        let inputObj = {};
       inputObj.title= req.body.title;
       inputObj.description= req.body.description;
       inputObj.dueDate= req.body.dueDate;
       inputObj.priority= req.body.priority;
       inputObj.userid= req.body.userId;
       if(req.body.title && req.body.dueDate && req.body.priority && req.body.userId){
        let result = await this.taskModel.saveTask(inputObj);
        if(result.length > 0){
            res.send({
                "msg":"1",
                "result":"save successfully..!"
            })
        }else{
            res.send({
                "msg":"1",
                "result":"data not save..!"
            })
        }
       }else{
        res.send({
            "msg":"-1",
            "result":"Invalid params..!"
        })
       }
    }catch(error){
        console.log(error)
        res.send({
            "msg":"-1",
            "result":"Unsuccess"
        })
    }
  }
  taskList = async (req,res) => {
    try{
        let inputObj = {};
        let resultArr = [];
        inputObj.userid=req.body.userId;
        inputObj.pageno = req.body.pageno;
        inputObj.pagesize = req.body.pagesize;
        if (inputObj && (inputObj.pagesize > 0 && inputObj.pageno > 0)) {
            inputObj.pagesize = inputObj.pagesize;
            inputObj.pageno = inputObj.pagesize * (inputObj.pageno - 1);
        } else {
            inputObj.pagesize = 10;
            inputObj.pageno = 0;
        }
        if(req.body.userId){
            let getlist = await this.taskModel.gettasklist(inputObj);
            if(getlist.length > 0){
                for(let i = 0; i < getlist.length; i++){
                    let resultObj = {};
                    resultObj.id = getlist[i].id;
                    resultObj.userid = getlist[i].userid;
                    resultObj.title = getlist[i].title;
                    resultObj.description = getlist[i].description;
                    resultObj.duedate = getlist[i].duedate;
                    resultObj.priority = getlist[i].priority;
                    resultObj.created_date = getlist[i].created_date;
                    resultObj.updated_date = getlist[i].updated_date;
                    resultArr.push(resultObj)
                }
            }
            res.send({
                "msg":"1",
                "result":resultArr         
            }) 
        }else{
            res.send({
                "msg":"-1",
                "result":resultArr
            }) 
        }
    }catch(error){
        console.log(error)
        res.send({
            "msg":"-1",
            "result":"Unsuccess"
        })
    }
  }
  updateTask = async (req, res)=>{
    try{
        let inputObj = {};
        inputObj.id= req.body.id;
        inputObj.userid= req.body.userId;
        inputObj.title= req.body.title;
        inputObj.description= req.body.description;
        inputObj.dueDate= req.body.dueDate;
        inputObj.priority= req.body.priority;
        if(req.body.id && req.body.title && req.body.dueDate && req.body.priority && req.body.userId){
            let result = await this.taskModel.updateTask(inputObj);
            if(result.length > 0){
                res.send({
                    "msg":"1",
                    "result":"update successfully..!"
                })
            }else{
                res.send({
                    "msg":"1",
                    "result":"data not save..!"
                })
            }
        }else{
            res.send({
                "msg":"-1",
                "result":"Invalid params..!"
            })
        }
    }catch(error){
        console.log(error)
        res.send({
            "msg":"-1",
            "result":"Unsuccess"
        })
    }
  }
  deleteTask = async (req,res) => {
    try{
        let inputObj = {};
        inputObj.id= req.body.id;
        if(req.body.id){
            let deleteproject = await this.taskModel.deleteTask(inputObj);
            if(deleteproject.length > 0){
                res.send({
                    "msg":"1",
                    "result":"delete successfully..!"
                })
            }
        }else{
            res.send({
                "msg":"-1",
                "result":"Invalid params..!"
            })
        }
    }catch(error){
        console.log(error)
        res.send({
            "msg":"-1",
            "result":"Unsuccess"
        })
    }
  }
}

module.exports = new UserController();