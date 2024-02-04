import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './compnents/CreateTodo'
import { Todos } from './compnents/Todos' 

  function App() {
  const [todos, setTodos] = useState([])
 
  
  return (
    <div> 
      <div className="card"> 
      <h1>Todos</h1>
      <CreateTodo ></CreateTodo>
      <Todos
        todos={todos} setTodos={setTodos}
      ></Todos>
      </div> 
    </div>
  )
}

export default App
