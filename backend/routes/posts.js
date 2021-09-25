const express = require('express');
const multer = require("multer");

const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
}

//cb第一个参数表示是否有错误，第二个参数是存储路径，相对于server.js文件的位置
const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images")
  },
  filename:(req, file, cb)=>{
    const name = file.originalname.toLocaleLowerCase.split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.'+ext );
  }
})

router.post('', multer(storage).single("image"), (req,res,next)=>{
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
