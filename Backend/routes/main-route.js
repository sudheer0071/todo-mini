const { Router } = require("express");
const { createtodo, updateTodo, createUser, validationMiddleware } = require("../middleware/auth-checks");
const { Todo, User } = require("../db");
const jwt = require("jsonwebtoken"); 
const secretkey = "12345"

const route = Router()
   
route.post('/signup', async (req, res)=> {
  const createPayload = req.body
  const alreadyExist = await User.findOne({username:createPayload.username})  
  if (alreadyExist) {
    return res.json({message:"Email already exist"})
  }
  else{
    const parsePayload = createUser.safeParse(createPayload)
    if (!parsePayload.success) {
      return res.json({message:"Please provide valid email and password (password must have more than 5 characters) "})
    }
    const token = jwt.sign({username:createPayload.username, password:createPayload.password}, secretkey)
    await User.create({username:createPayload.username, password:createPayload.password, token})
    const userr = await User.findOne({username:createPayload.username})
    console.log(userr.token);
    res.json({message:"User created successfully!",token:userr.token})
  }
})  

route.post('/signin', async (req, res)=> {
  const createPayload = req.body
  console.log(createPayload);
  const Exist = await User.findOne({username:createPayload.username})
  // console.log(Exist);
  console.log(createPayload.username);
  if (!Exist) {
    return res.json({message:"User doesn not exist"})
  }
  else{
    const parsePayload = createUser.safeParse(createPayload)
    const credentials = await User.findOne({username:createPayload.username, 
    password:createPayload.password})
    console.log(credentials);


    // if (!parsePayload.success) {
    //   return res.json({message:"Make sure email and password must be valid as per zod"})
    // }
    if (!credentials) {
      return res.json({message:"Invalid Credentials"})
    }
    else{
      // const user = await User.findOne({username:createPayload.username})

      res.json({message:"Fetching Details...",token:credentials.token})
    }
  }
}) 
 
route.post('/todo', validationMiddleware, async (req,res)=>{
  const createPayload = req.body
  const parsePayload = createtodo.safeParse(createPayload)
  const username = req.username

  if (!parsePayload.success) {
    return res.send("You sent wrong inputs")
  }  

  
  // pending logic of already existing todo for a particular user
  
  const alltodos = await Todo.findOne({title:createPayload.title}) 
  if (alltodos) {
    return res.json({message:"You already Created this todo"})
  }
  
  // After adding data in mongoDb databse...  
  console.log(username);
  const todos = await Todo.create({
    title:createPayload.title, description:createPayload.description
  })  
  await User.updateOne({username:username}, {
    "$push":{todos:todos._id}
  })
  const user = await User.findOne({username:username})
  const todoss = await Todo.find({_id:{"$in":user.todos}})
  const newtodos = todoss.map((todo)=>({
    title:todo.title, description:todo.description
  }))
  console.log(newtodos);
  res.json({message:"Todo is created", todos:newtodos}) 
  
}) 
route.get('/todos', validationMiddleware, async (req,res)=>{
  const username = req.username
  const user = await User.findOne({username:username})
    
  const todos = await Todo.find({_id:{"$in":user.todos}})
    const alltodos = todos.map((todo)=>({
      title:todo.title, description:todo.description, id:todo._id
    }))
    console.log("inside GET");
  res.json({
    Todos:alltodos
  })
  
})
 
route.put('/todo/:id', validationMiddleware, async (req,res)=>{
  const createPayload = req.params 
  const {title, description} = req.body
  const username = req.username

  const user = await User.findOne({username:username})
  const parsePayload = updateTodo.safeParse(createPayload)
  if (!parsePayload.success) {
    return res.send("You sent a wrong inputs")
  }  

  // console.log(createPayload.id);
  // console.log(todoid); 
  const todoid = await user.todos.includes(createPayload.id)
  if (!todoid) {
    return res.json({message:"Wrong todo id"})
  }
  await Todo.updateOne({_id:createPayload.id}, {title:title, description:description} ) 
  const userr = await User.findOne({username:username})
  const todos = await Todo.find({_id:{"$in":userr.todos}})
  const newtodos = todos.map((todo)=>({
    title:todo.title, description:todo.description
  }))
  console.log(newtodos);
  // After updating todos in mongodb databse...
  res.json({message:"Todo Updated!",todo:newtodos})
})

route.delete('/todo/:id',validationMiddleware, async (req,res)=>{
    const createPayload = req.params
    const username = req.username

    const user = await User.findOne({username:username})
    const todoid =   user.todos.includes(createPayload.id)
    if (!todoid) {
      return res.json({message:"Something is wrong with todo id"})
    }
    const index =   user.todos.indexOf(createPayload.id)
    console.log(createPayload.id);
    console.log(index);
      // user.todos.splice(index,1)
      await User.updateOne({username:username}, {"$pull":{todos:createPayload.id}})
      await Todo.deleteOne({_id:createPayload.id})

      const userr = await User.findOne({username:username})
      const todos = await Todo.find({_id:{"$in":userr.todos}})
      const newtodos =todos.map((todo)=>({
        title:todo.title, description:todo.description
      }))
      console.log(newtodos); 
    res.json({message:"Todo Deleted!",todo:newtodos})
})
module.exports = route    