const express = require('express');
const multer = require("multer");
const checkAuth = require('../middleware/check-auth');

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
    // console.log(file.originalname.toLocaleLowerCase)
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.'+ext );
  }
})

router.post('', checkAuth, multer({storage: storage}).single("image"), (req,res,next)=>{
  const url = req.protocol+"://"+req.get("host");
  console.log(req.userData)
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then((createdPost)=>{
    // console.log(post._id);
    res.status(201).json({
      id: createdPost._id,
      title: createdPost.title,
      content: createdPost.content,
      imagePath: createdPost.imagePath,
      creator: createdPost.creator
    });
  })
  .catch(err =>{
    res.status(500).json({
      message: "creating post failed"
    })
  });
})

router.get('',(req,res,next)=>{
  console.log(req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  console.log(pageSize + " " + currentPage);
  let fetchedPosts;
  if(pageSize && currentPage){
    //实际执行时仍然会扫描所有数据，所以这里的性能要提升需要参考课程后续的一个链接里os的讨论
    postQuery.skip( pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery.then((documents)=>{
    fetchedPosts = documents;
    return Post.count();
    // console.log(documents);
    // res.status(200).json(documents);
  })
  .then((count)=>{
    res.status(200).json({
      total: count,
      posts: fetchedPosts
    })
  })
  .catch(err =>{
    res.status(500).json({
      message: "fetching post failed"
    })
  });
})

router.put('/:postId',  checkAuth, multer({storage: storage}).single("image"),(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol+"://"+req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post( {
    title: req.body.title,
    content: req.body.content,
    imagePath : imagePath
    // 这里没有creator好像对更新后的结果也没有影响？查到的新的psot仍然还是有creator的
  });
  post._id = req.params.postId;
  Post.updateOne({_id: req.params.postId,creator: req.userData.userId}, post).then((result)=>{
    console.log(result);
    if(result.modifiedCount > 0){
      res.status(200).json({message: " updated successfully"});
    }else{
      res.status(401).json({message: " unauthorized"});
    }
  })
  .catch(err =>{
    res.status(500).json({
      message: "updating post failed"
    })
  });
})

router.delete('/:id', checkAuth, (req, res, next)=>{
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result=>{
    console.log(result);
    if(result.deletedCount > 0){
      res.status(200).json({message: " updated successfully"});
    }else{
      res.status(401).json({message: " unauthorized"});
    }
  })
  .catch(err =>{
    res.status(500).json({
      message: "deleting post failed"
    })
  })
})


router.get('/:id', (req, res, next)=>{
  Post.findById( req.params.id).then(result =>{
    if(result){
      // console.log(result);
      res.status(200).json(result);
    }else{
      res.status(404).json("not found");
    }
  })
  .catch(err =>{
    res.status(500).json({
      message: "fetching post failed"
    })
  })
})


module.exports = router
