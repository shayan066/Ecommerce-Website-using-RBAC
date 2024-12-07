const jwt = require("jsonwebtoken");

module.exports.checkToken = async (req,res, next) => {

  console.log(req.headers, "10");
  try{
    if(!req.headers.authorization){
      return res.send({code: 403, message: "Unauthorized User"})
    }
    const decodeUser = await jwt.verify(req.headers.authorization, "MYKEY")
    console.log(decodeUser.exp, Date.now() / 1000, "12");

    if (Date.now()/1000 >= decodeUser.exp){
      return res.send({code: 403, message: "TOKEN_EXPIRED"})
    }

    req["user"] = decodeUser
    req["permissions"] = decodeUser.roles[0].permissions

    next()
  }catch(err){
    // console.log(err, "err");
    return res.send({code: 403, message: "TOKEN_EXPIRED"})
    
  }
}