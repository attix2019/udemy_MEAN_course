var express = require('express')

const app = express();

app.use('/api/posts',(req,res,next)=>{
  posts = [{
    "id":"1",
    "title":"title1",
    "content":"content1"
  }]
  res.status(200).json(posts);
})

module.exports = app;
