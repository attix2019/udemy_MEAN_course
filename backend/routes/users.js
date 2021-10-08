const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const jwt = require('jsonwebtoken')

const router = express.Router();

router.post("/signup",(req, res, next)=>{
  bcrypt.hash(req.body.password,10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(result=>{
      res.status(201).json({
        message: 'User created',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })
  });
})


router.post("/login", (req, res, next)=>{
  user.findOne({email: req.body.email})
  .then(user=>{
    if(!user){
      console.log("invalid email")
      res.status(404).json({
        message: " auth failed"
      });
    }
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(legalPass =>{
    if(!legalPass){
      console.log("invalid password")
      res.status(404).json({
        message: " auth failed"
      });
    }
    // 不明白为什么下面可以用user.email这个值，user不是前一个.then里的参数吗
    // 视频里后来果然因为这个原因失败了。但我自己直接这样还能成功
    const token = jwt.sign(
      {email: user.email, userId: user._id},
      'secret_this_should_be_longer',
      {
        expiresIn: "1h"
      });
    res.status(200).json({
      token: token
    })
  })
  .catch(err =>{
    console.log(err)
    res.status(404).json({
      message: " auth failed"
    });
  })
})

module.exports = router;
