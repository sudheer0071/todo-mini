const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

const todos = require("../Backend/routes/main-route")

app.use(cors())
app.use('/', todos)

 
app.listen(3000) 

