var express = require('express');
var Post = require('./models/post');
const mongoose = require('mongoose');
const path = require("path");

const postRouter = require('./routes/posts')

const userRouter = require('./routes/users')

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
app.use("/images", express.static(path.join("backend/images")) );

app.use((req,res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-type,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PUT");
  next();
})

app.use("/api/posts",postRouter);
app.use("/api/users",userRouter);

module.exports = app;
