import { useEffect, useState } from "react"

export function Todos({todos, setTodos}){
const Token = localStorage.getItem("Token")

const[displayTodos, setDisplayTodos] = useState([])

const fetchTodos = async ()=>{
  try {
    const response = await fetch("https://todo-mini.onrender.com/todos", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": Token
      },
    });
    if (response.ok) {
      const todosData =
     await response.json();
      console.log(todosData.Todos);
      setTodos(todosData.Todos);
      showtodos()
    } else {
      console.error("Failed to fetch todos:", response.status);
    }
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
};
 

  function showtodos(){
    console.log(todos.length); 
     const todoss = todos.map((todo,index)=>{
        return <div className="todoChild" key={index}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
        </div>
      })
      setDisplayTodos(todoss) 
  } 
  useEffect(()=>{ 
    if (todos) {
      fetchTodos()
    }
  },[])   
  return <div> 
    <div>   
    <button className="btn" onClick={fetchTodos}>Show todo</button> 
    </div>
    <div>
    <div className="displaytodos">{displayTodos}</div>
    </div>
  </div>
 
}