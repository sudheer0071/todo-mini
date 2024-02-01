const { json } = require("express")
const jwt = require("jsonwebtoken")
const zod = require("zod")
const secretkey = "12345"

// Zod validations

const createtodo = zod.object({
  title: zod.string(),
  description: zod.string()
})

const updateTodo = zod.object({
  id:zod.string()
})

const createUser = zod.object({
  username:zod.string().email(),
  password:zod.string().min(5)
})

async function validationMiddleware(req, res, next){
  try {
    const token = req.headers.authorization
    const decode = jwt.decode(token) 
    
    const verify = jwt.verify(token,secretkey)
    
    if (verify) {
      req.username = decode.username
      req.password = decode.password 
      return next()
    }
    else{
      res.json({message:"Something went wrong"})
    }
  }
  
  catch (error) {
    console.log(error);
    res.json({message:"Something went wront"})
} 
}

module.exports = {createtodo:createtodo, updateTodo:updateTodo, createUser:createUser, validationMiddleware}