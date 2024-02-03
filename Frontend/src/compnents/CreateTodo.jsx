import { useEffect, useState } from "react"


export function CreateTodo(){  
 const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [popmessage, setPopMessage] = useState("")
  const [emptyTitle, setEmptyTitle] = useState(false)
  const [emptyDescription, setEmptyDescription] = useState(false)

  async function addtodo(){

     if (title=="" || description=="") {
         if (title=="" && description=="") {
         setEmptyTitle(true)
         setEmptyDescription(true)
         setTimeout(() => {
           setEmptyTitle(false)
           setEmptyDescription(false)
           setPopMessage("")
          }, 1000);
        //  setPopMessage("Please enter both feilds") 
         setTitle("Please enter title")
        }
      else if (title=="") {
        setEmptyTitle(true)
         setTimeout(() => {
           setEmptyTitle(false)
           setPopMessage("")
         }, 1000);
         setPopMessage("Please enter title")
         }
      else if (description=="") {
        setEmptyDescription(true)
         setTimeout(() => {
           setEmptyDescription(false)
           setPopMessage("")
         }, 1000);
         setPopMessage("Please enter description")
         } 
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
    <div className={popmessage.includes('alredy') || popmessage.includes('both') ?'warn':'success'}>{popmessage}</div>
    <input type="text" value={title} className={ emptyTitle==true ? 'error' :''} placeholder="Title" id=""  onChange={(e)=>{
      const value = e.target.value
      setTitle(value)
    }}/> 
    <br />
    <br />
    <input type="text" value={description} className={emptyDescription==true ? 'error' :''} placeholder="Description" id="" onChange={(e)=>{
      const value = e.target.value
      setDescription(value)
    }}/>
    
    <br />
    <br />
    <button onClick={addtodo}>Add a Todo</button>
  </div>
}



