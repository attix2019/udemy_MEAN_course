const { Module } = require('module')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

var UserSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

UserSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User',UserSchema)
