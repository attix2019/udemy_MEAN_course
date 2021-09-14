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
  res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PUT");
  next();
})

app.post('/api/posts',(req,res,next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((responseData)=>{
    console.log(post._id);
    res.status(201).json(post._id);
  });
})

app.get('/api/posts',(req,res,next)=>{
  Post.find().then((documents)=>{
    console.log(documents);
    res.status(200).json(documents);
  });
})

app.put('/api/posts/:postId',(req,res,next)=>{
  const post = new Post( {
    title: req.body.title,
    content: req.body.content
  });
  post._id = req.params.postId;
  Post.updateOne({_id: req.params.postId}, post).then((result)=>{
    console.log(result);
    res.status(200).end();
  });
})

app.delete('/api/posts/:id', (req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then(()=>{
    console.log(req.params.id + " deleted");
    res.status(200).end();
  })
})


app.get('/api/posts/:id', (req, res, next)=>{
  Post.findById( req.params.postId).then(result =>{
    if(result){
      console.log(result);
      res.status(200).json(result);
    }else{
      res.status(404).json("not found");
    }
  })
})

module.exports = app;
