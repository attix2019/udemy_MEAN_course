const express = require('express');

const Post = require('../models/post');

const router = express.Router();

router.post('',(req,res,next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((responseData)=>{
    console.log(post._id);
    res.status(201).json(post._id);
  });
})

router.get('',(req,res,next)=>{
  Post.find().then((documents)=>{
    console.log(documents);
    res.status(200).json(documents);
  });
})

router.put('/:postId',(req,res,next)=>{
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

router.delete('/:id', (req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then(()=>{
    console.log(req.params.id + " deleted");
    res.status(200).end();
  })
})


router.get('/:id', (req, res, next)=>{
  Post.findById( req.params.id).then(result =>{
    if(result){
      console.log(result);
      res.status(200).json(result);
    }else{
      res.status(404).json("not found");
    }
  })
})


module.exports = router
