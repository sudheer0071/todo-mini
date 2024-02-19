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
    <div className="show-todo">   
    {/* <button className="btn" onClick={fetchTodos}>Show todo</button>  */}
    <div className="rgb-btn">
      <a className= 'button-85' role="button" onClick={fetchTodos} >
        Show Todo
      </a>
    </div>
    </div>
    <div>
    
    <div className="displaytodos"> 
    {displayTodos.length==0&&
    <div className="no-todoss">
    {displayTodos.length==0?"No Todos to show":''} <br /> {displayTodos.length==0&& <svg width="44" height="34" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 11.5V16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> <path d="M12 7.51L12.01 7.49889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> </svg>}
    </div>
    }
      {displayTodos}</div>
    </div>
  </div>
 
}