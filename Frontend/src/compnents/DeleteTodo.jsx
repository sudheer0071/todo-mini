 
import { useEffect, useState } from "react" 


export function DeleteTodo({todoid, setTodos}){ 
  async function deletetodo(){
    try {
      
      const response = await fetch("http://localhost:3000/todo/"+todoid,{
        method:'DELETE',
        headers:{
       "Content-Type":"application/json",
       "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjNkNDUiLCJpYXQiOjE3MDcwNjI2MDJ9.PijKvueqJLIU2rvn0zJxKJhKgREBAL0ZuBIbDI6w_3o"
      },
    //  body:{}
  })
  
  if (response.ok) {
    console.log("inside deletetodo");
    const todos = await response.json()
    setTimeout(() => {
      setPopMessage("")
    }, 2000);
    console.log(todos.message);
     setPopMessage(todos.message) 
     setTodos(todos.todo)
     console.log(todos.todo);
    }
    else {
      throw new Error("Failed to delete todo");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
      setPopMessage("Failed to delete todo");
   } 
  } 
 useEffect(()=>{
  if (todoid) {
    deletetodo()
  }
},[todoid])

const [popmessage, setPopMessage] = useState("") 

  return (<div>
    <div id="pop-message" className= 'success'>{popmessage}</div>  
    </div>)
}