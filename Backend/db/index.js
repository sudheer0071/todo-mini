// const { mongoose } = require("mongoose");

const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb+srv://sam7655677280:cWEBiE7yd4EmEmvo@cluster0.jmh7zz0.mongodb.net/Todo_app")

 const UserSchema = new mongoose.Schema({
   username:String,
   password:String,
   token:String,
   todos: [{
    type:mongoose.Schema.ObjectId,
    ref:"Todo"
   }]
 })

 const TodoSchema = new mongoose.Schema({
    title:String,
    description:String,
    id:String
 })
 
 const User = mongoose.model('User', UserSchema)
 const Todo = mongoose.model('Todo', TodoSchema)

 module.exports = {
  User,Todo
 } 
 