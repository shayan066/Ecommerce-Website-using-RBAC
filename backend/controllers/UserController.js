// User APIs

const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const rolesModel = require("../models/roleModel")

// Signup 
module.exports.signup = async (req, res) => {

  const name = req.body.name
  const password = req.body.password
  const url = req.body.url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
  const type = req.body.type || 'USER'

  const roleData = await rolesModel.findOne({role: type}) 
  console.log(roleData, "13");
  const roles = [roleData._id]

  if (!name){
    return res.send({code: 400, message: "Name is Required"});
  }
  else if (!password){
    return res.send({code: 400, message: "Password is Required"});
  }
  else{
    // Logic here
    const newUser = await new userModel({name, password, type, url, roles})
    const savedUser = await newUser.save()
    if (savedUser){
      res.send({code: 200, message: "Signup Successfully"})
    }
    else{
      res.send({code: 500, message: "Signup Failed"})
    }
  }
}

// Login
module.exports.login = async (req, res) => {

  const name = req.body.name
  const password = req.body.password

  if(!name){
    return res.send({code: 400, message: "Name is Required"})
  }
  else if (!password){
    return res.send({code: 400, message: "Password is Required "})
  }
  else{
    // Logic here
    const isDataExists = await userModel.findOne({name: name, password: password}).populate('roles')

    if(isDataExists){
      const token = jwt.sign({ 
        // expAfter: Math.floor(Date.now() / 1000) + (60 * 60),     // Session Expires After 1 hour
        name: isDataExists.name, 
        password: isDataExists.password, 
        type: isDataExists.type,
        roles: isDataExists.roles,
      }, 'MYKEY', {expiresIn: "1h"});                // Session Expires After 1 hour
      return res.send({code: 200, message: "Login Successfully", 
        token: token, 
        user: isDataExists
      })
    }else{
      return res.send({code: 400, message: "Data not Found"})
    }
  }
}

// Add to Cart
module.exports.addToCart = async(req, res) => {
  console.log(req.body, "115");
  
  const isUpdate = await userModel.updateOne({_id: req.body.userId}, {
    $addToSet: {cart: req.body.productId}
  })

  if(isUpdate){
    return res.send({code: 200, message: "Add to cart success"})
  }
  else{
    return res.send({code: 500, message: "Product not added to cart"})
  }
}

// Get Cart
module.exports.getCart = async (req,res) => {
  const userId = req.body.userId
  const data = await userModel.findOne({_id: userId}).populate('cart')

  if(data){
    return res.send({code: 200, message: "Get cart success", data: data})
  }
  else{
    return res.send({code: 500, message: "Server Err.."})
  }
}
