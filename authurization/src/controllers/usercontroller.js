let UserModel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class UserController {
  constructor() {
    this.userModel = new UserModel();
  }
  createuser = async (req, res) =>{
    try {
      let inputObj = {};
      inputObj.username = req.body.username;
      inputObj.email = req.body.email;
      inputObj.password = req.body.password;
      if(req.body.username && req.body.email && req.body.password){
        let min = 100000; 
        let max = 999999; 
        inputObj.userId = Math.floor(Math.random() * (max - min + 1)) + min;
        inputObj.password = await bcrypt.hash(req.body.password,10);
      let checkUser = await this.userModel.checkUser(inputObj);
      if(checkUser.length > 0){
      if(inputObj.email != checkUser[0].email){
        let newUser = await this.userModel.createNewUser(inputObj);
        if(newUser.length > 0){
          res.send({
            "msg" : "1",
            "result" : "User registered successfully..!!"
        })
        }
      }else{
        res.send({
            "msg" : "-1",
            "result" : "User already registered..!!"
        })
      }
    }else{
      let newUser = await this.userModel.createNewUser(inputObj);
        if(newUser.length > 0){
          res.send({
            "msg" : "1",
            "result" : "User registered successfully..!!"
        })
        }
    }
    }else{
        res.send({
            "msg" : "-1",
            "result" : "Invalid params"
        }) 
    }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  login = async (req, res) =>{
    try {
      let inputObj = {};
      inputObj.email = req.body.email;
      inputObj.password = req.body.password;
      if(req.body.email && req.body.password){
        let checkUser = await this.userModel.checkUser(inputObj);
        inputObj.password = await bcrypt.compare(req.body.password, checkUser[0].password);
        if(inputObj.email == checkUser[0].email && inputObj.password == true){
          let token = jwt.sign( {id: checkUser[0].user_id}, process.env.SECRET_KEY, { expiresIn: '1h' });
          console.log(token)
          res.send({
              "msg" : "1",
              "token" : token
          })
        }else{
          res.send({
            "msg" : "-1",
            "result" : "Invalid user details..!!"
        }) 
        }
      }else{
        res.send({
          "msg" : "-1",
          "result" : "Invalid params"
      }) 
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  getUserDetails = async (req,res) =>{
    try{
      let inputObj = {};
      let resultArr = [];
      inputObj.userId = req.body.userId;
      if(req.body.userId){
        let userDetails = await this.userModel.getUserDetails(inputObj);
        if(userDetails.length > 0){
          for(let i = 0; i < userDetails.length;i++){
            let resulObj = {};
            resulObj.id = userDetails[i].id;
            resulObj.username = userDetails[i].name;
            resulObj.email = userDetails[i].email;
            resulObj.userId = userDetails[i].user_id;
            resultArr.push(resulObj)
          }
          res.send({
            "msg" : "1",
            "result" : resultArr
        })
        }else{
          res.send({
            "msg" : "-1",
            "result" : "Data not found"
        }) 
        }
      }else{
        res.send({
          "msg" : "-1",
          "result" : "Invalid params"
      }) 
      }
    }catch(error){
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

}

module.exports = new UserController();