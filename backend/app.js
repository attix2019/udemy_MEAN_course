var express = require('express')

const app = express();

app.use((req,res, next)=>{
  console.log("first middleware when visiting" + req.originalUrl);
  next();
})

app.use((req,res, next)=>{
  res.send('hello from express');
})

module.exports = app;
