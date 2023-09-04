const jwt = require('jsonwebtoken');

authenticateToken = async (req, res, next) => {
    const token = req.header('authorization');
    try {
      if(token){
        if(req.url === '/login' || req.url === '/createnewuser'){
          next();
        }else{
          const verified = jwt.verify(token, process.env.SECRET_KEY);
          req.body.userId = verified.id;
          next();
        } 
      }else{
        next();
      }
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
  }

module.exports = authenticateToken;