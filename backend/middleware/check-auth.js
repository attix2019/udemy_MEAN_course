const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
  try{
    const token  = req.headers.authorization.split(" ")[1];
    // console.log("original token");
    // console.log(token);
    const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
    // console.log("decoded token");
    // console.log(decodedToken)
    req.userData = {email:decodedToken.email, userId : decodedToken.userId};
    next();
  }catch(err){
    res.status(401).json({
      message: "auth failed"
    })
  }
}
