const express = require('express')
const app = express()

app.use(express.json())

// app.use('/todo')
// app.use('/todo')

// app.use('all/')
app.post('/todo', (req,res)=>{

})

app.get('/todos', (req,res)=>{

})

app.put('todos/:id',(req,res)=>{

})

app.delete('todo/:id',(req,res)=>{

})
app.listen(3000)
module.exports = app