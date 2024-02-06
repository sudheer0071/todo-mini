const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

const todos = require("../Backend/routes/main-route") 
app.use(cors())
app.use('/', todos)


app.get('/',(req,res)=>{
  res.send("backend is working fine")
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
   
