import { useEffect, useState } from "react"

export function Todos({todos, setTodos}){
const[displayTodos, setDisplayTodos] = useState([])

const fetchTodos = async  ()=>{
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjNkNDUiLCJpYXQiOjE3MDcwNjI2MDJ9.PijKvueqJLIU2rvn0zJxKJhKgREBAL0ZuBIbDI6w_3o"
      },
    });
    if (response.ok) {
      const todosData = await response.json();
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
    fetchTodos()
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