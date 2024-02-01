const route = require("../index.js");

route.get('/todos',(req,res)=>{
  res.send("its working")
})