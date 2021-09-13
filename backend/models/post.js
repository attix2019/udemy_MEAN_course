const { Module } = require('module')
const mongoose = require('mongoose')

var postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true}
})

module.exports = mongoose.model('Post',Schema)