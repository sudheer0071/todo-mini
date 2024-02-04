import { useEffect, useState } from "react"


export function UpdateTodo({todoid}){  
 const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [popmessage, setPopMessage] = useState("")
  const [emptyTitle, setEmptyTitle] = useState(false)
  const [emptyDescription, setEmptyDescription] = useState(false) 

  async function updatetodo(){
   console.log(todoid); 
         if (title=="" && description=="") {
         setEmptyTitle(true)
         setEmptyDescription(true)
         setTimeout(() => {
           setEmptyTitle(false)
           setEmptyDescription(false)  
           setPopMessage("")
          }, 1000);
           setPopMessage("Please enter both feilds")   
        } 
      
          
    else{
      const response = await fetch("http://localhost:3000/todo/"+todoid,{
        method:'PUT',
      headers:{
        "Content-Type":"application/json",
        "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjNkNDUiLCJpYXQiOjE3MDcwNjI2MDJ9.PijKvueqJLIU2rvn0zJxKJhKgREBAL0ZuBIbDI6w_3o"
      },
      body: JSON.stringify({title:title , description:description})
    })
    const todos = await response.json()
    console.log(todos.message);
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
    <div className={popmessage.includes('alredy') || popmessage.includes('both') || popmessage.includes('title')||popmessage.includes('description')?'warn':'success'}>{popmessage}</div> 
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
    <button className="btn updatetodo-btn" onClick={updatetodo}>Update Todo</button>
    <br /><br />
  </div>
}