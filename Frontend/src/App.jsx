import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './compnents/CreateTodo'
import { Todos } from './compnents/Todos' 

  function App() {
  const [todos, setTodos] = useState([])
 
useEffect(() => {
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pY2tAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NSIsImlhdCI6MTcwNjg3NTA5MX0.LVA6EMhX2_sxxYCz9If56Fu0NvamYP24snJxMgPRfH0"
        },
      });
      if (response.ok) {
        const todosData = await response.json();
        setTodos(todosData.Todos);
      } else {
        console.error("Failed to fetch todos:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };
  const intervalId = setInterval(fetchTodos, 5000); // Fetch todos every 5 seconds

  return () => clearInterval(intervalId); // Clean up interval on component unmount
}, [todos]);

  return (
    <div> 
      <div className="card"> 
      <CreateTodo ></CreateTodo>
      <Todos
        todos={todos}
      ></Todos>
      </div> 
    </div>
  )
}

export default App
