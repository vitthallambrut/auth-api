const express = require('express');
const taskcontroller = require('../src/controllers/taskcontroller');
const usercontroller = require('../src/controllers/usercontroller');
const router = express.Router();


//post method
router.post('/createnewuser',usercontroller.createuser);
router.post('/login',usercontroller.login);
router.post('/getuserdetails',usercontroller.getUserDetails);
router.post('/createtask',taskcontroller.createTask);
router.post('/updatetask',taskcontroller.updateTask);
router.post('/tasklist',taskcontroller.taskList);
router.post('/deletetask',taskcontroller.deleteTask);


module.exports = router;