const express = require('express')
const app = express()
app.use(express.json())

const todos = require("../Backend/routes/main-route")

app.use('/', todos)

 
app.listen(3000) 

