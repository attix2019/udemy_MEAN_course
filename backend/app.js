var express = require('express')

const app = express();

app.use((req,res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-type,Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  next();
})

app.use('/api/posts',(req,res,next)=>{
  posts = [{
    "id":"1",
    "title":"title1",
    "content":"content1"
  }]
  res.status(200).json(posts);
})

module.exports = app;
