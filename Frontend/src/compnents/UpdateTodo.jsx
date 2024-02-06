import { useEffect, useState } from "react"


export function UpdateTodo({todoid, onClose, setTodos}){  
 const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [popmessage, setPopMessage] = useState("")
  const [emptyTitle, setEmptyTitle] = useState(false)
  const [emptyDescription, setEmptyDescription] = useState(false) 
  const [showupdateTodo, setShowUpdateTodo] = useState(true)

  
  const updatetodo = async()=>{
   console.log(todoid); 
         if (title=="" && description=="") {
         setEmptyTitle(true)
         setEmptyDescription(true)
         setTimeout(() => {
           setEmptyTitle(false)
           setEmptyDescription(false)  
           setPopMessage("")
          }, 1000);
           setPopMessage("Please enter atleast one feild")   
          }  
          else{
      const response = await fetch("http://localhost:3000/todo/"+todoid,{
        method:'PUT',
        headers:{
          "Content-Type":"application/json",
          "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjNkNDUiLCJpYXQiOjE3MDcwNjI2MDJ9.PijKvueqJLIU2rvn0zJxKJhKgREBAL0ZuBIbDI6w_3o"
      },
      body: JSON.stringify({title:title})
    })
    const todos = await response.json()
    if (response.ok) { 
      setTimeout(() => {
        setTitle("")
        setDescription("") 
        setPopMessage("") 
        setShowUpdateTodo(false)
        onClose() 
      }, 1000);  
      setPopMessage(todos.message)
      setTodos(todos.todo)
    } 
    }
    
  }
  return (<div>
    <div id="pop-message" className={popmessage.includes('atleast')?'warn':'success'}>{popmessage}</div> 
    {showupdateTodo&& (
      <div className="update-todo-section">
    <div className="inputs updatedtodo-inputs">
    <input type="text" value={title} className={ emptyTitle==true ? 'error' :''} placeholder="Title" id="title"  onChange={(e)=>{
      const value = e.target.value
      setTitle(value)
    }}/>  
    <br />
    <br />
     
    <input type="text" value={description} className={emptyDescription==true ? 'error' :''} placeholder="Description" id="description" onChange={(e)=>{
      const value = e.target.value
      setDescription(value)
    }}/> 
    </div>
    <br />
    <br />
    <div className="update-todo">
    <button className="btn updatetodo-btn" type="sibmit" onClick={updatetodo}>Update Todo</button>
    </div> 
     </div>
  )}  
  </div>
  )
}