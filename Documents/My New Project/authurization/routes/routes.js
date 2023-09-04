const express = require('express');
const router = express.Router();
const usercontroller = require('../src/controllers/usercontroller');

//post method
router.post('/createnewuser',usercontroller.createuser);
router.post('/login',usercontroller.login);
router.post('/getuserdetails',usercontroller.getUserDetails);


module.exports = router;