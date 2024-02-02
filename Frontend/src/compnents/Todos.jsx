import { useEffect, useState } from "react"

export function Todos({todos}){
const[displayTodos, setDisplayTodos] = useState([])

  function showtodos(){
    console.log(todos);
   if (todos && todos.length > 0) {
    
     const todoss = todos.map((todo,index)=>{
        return <div className="todoChild" key={index}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
        </div>
      })
      setDisplayTodos(todoss)
   }
   else{
    setDisplayTodos([])
   }
  }
  
  return <div>
    <button onClick={showtodos}>Show todo</button>
    <div className="displaytodos">{displayTodos}</div>
  </div>
}