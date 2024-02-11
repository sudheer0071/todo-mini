import { useEffect, useState } from "react"


export function CreateTodo({setTodos}){  
 const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [popmessage, setPopMessage] = useState("")
  const [emptyTitle, setEmptyTitle] = useState(false)
  const [addtodobtn, setAddTodobtn] = useState('Add Todo')
  const [emptyDescription, setEmptyDescription] = useState(false) 

  const Token = localStorage.getItem('Token')

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
           setPopMessage("Please enter both feilds")   
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
      const response = await fetch("https://todo-mini.onrender.com/todo",{
        method:'POST',
      headers:{
        "Content-Type":"application/json",
        "authorization":Token
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
          setTodos(todos.todos)
          setAddTodobtn('Add Todo')
        }, 1000); 
        setAddTodobtn('Done')
        setPopMessage(todos.message)
        console.log(todos.todos);
     } 
      }
  }
 
  return <div className="add-todo-section">
    <div id="pop-message" className={popmessage.includes('alredy') || popmessage.includes('both') || popmessage.includes('title')||popmessage.includes('description')?'warn':'success'}>{popmessage}</div> 
    <div className="inputs">
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
    <br/>
    <br/>
    <button className={addtodobtn=='Done'?'done':'btn'} onClick={addtodo}>{addtodobtn}</button>
    <br/><br />
  </div>
}



