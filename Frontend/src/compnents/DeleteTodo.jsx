 
import { useEffect, useState } from "react" 


export function DeleteTodo({todoid, setTodos}){ 
  const Token = localStorage.getItem("Token")
  async function deletetodo(){
    try {
      
      const response = await fetch("http://localhost:3000/todo/"+todoid,{
        method:'DELETE',
        headers:{
       "Content-Type":"application/json",
       "authorization":Token
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