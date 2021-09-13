var express = require('express')
var Post = require('./models/post')
const mongoose = require('mongoose');

const app = express();
//uwNLEcLJpaSrbEyX
const uri = "mongodb+srv://cr3:uwNLEcLJpaSrbEyX@crudemy1.hjx7z.mongodb.net/crdatabase?retryWrites=true&w=majority";
mongoose.connect(uri)
.then(()=>{
  console.log("connected");
}).catch(()=>{
  console.log("connect failed")
})

app.use(express.json());

app.use((req,res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-type,Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  next();
})

app.post('/api/posts',(req,res,next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  post.save();
  res.status(201).json(req.body);
})

app.get('/api/posts',(req,res,next)=>{
  posts = [{
    "id":"1",
    "title":"title1",
    "content":"content1"
  }]
  res.status(200).json(posts);
})

module.exports = app;
