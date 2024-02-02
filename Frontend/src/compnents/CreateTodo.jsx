import { useEffect, useState } from "react"


export function CreateTodo(){  
 const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [popmessage, setPopMessage] = useState("")
  
  async function addtodo(){

     if (title=="" || description=="") {
        setTimeout(() => {
          setPopMessage("")
        }, 1000);
        setPopMessage("Please enter both feilds")
      }
    else{

      const response = await fetch("http://localhost:3000/todo",{
        method:'POST',
      headers:{
        "Content-Type":"application/json",
        "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pY2tAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NSIsImlhdCI6MTcwNjg3NTA5MX0.LVA6EMhX2_sxxYCz9If56Fu0NvamYP24snJxMgPRfH0"
      },
      body: JSON.stringify({title:title , description:description})
    })
    const todos = await response.json()
    
    if (response.ok) {
     console.log(title, description);
     
       
        setTimeout(() => {
          setPopMessage("") 
          setTitle("")
          setDescription("") 
        }, 1000); 
        setPopMessage(todos.message)
  
     } 
      }
  }
  return <div>
    <div className="popups">{popmessage}</div>
    <input type="text" value={title} placeholder="Title" id=""  onChange={(e)=>{
      const value = e.target.value
      setTitle(value)
    }}/> 
    <br />
    <br />
    <input type="text" value={description} placeholder="Description" id="" onChange={(e)=>{
      const value = e.target.value
      setDescription(value)
    }}/>
    <br />
    <br />
    <button onClick={addtodo}>Add a Todo</button>
  </div>
}



