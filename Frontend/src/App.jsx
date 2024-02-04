import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './compnents/CreateTodo'
import { Todos } from './compnents/Todos' 

  function App() {
  const [todolist, setTodoList] = useState([])
  const [todos, setTodos] = useState([])
 
  function todoList(){
     const todoss = todos.map((todo,index)=>{
     return <div>

     <li><span>{index+1}</span>{todo.title}
     <div className='actions'>
      <button className='list-btns'><i class="far fa-trash-alt"></i></button>
      <button className='list-btns'><i class="far fa-edit"></i></button>
      <button className='list-btns check'><i class="fas fa-check"></i></button>
     </div>
     </li>
     </div>
     })
     setTodoList(todoss)
  }

  useEffect(()=>{
    todoList()
  },[todos])
  return (
      <div >   
            <h1>Todos</h1>
            <CreateTodo ></CreateTodo>  
         <div className='all-todos'> 
            <div className="display-todos"> 
              <Todos
                todos={todos} setTodos={setTodos}
                ></Todos>
             </div> 
             <div className="right-bar">
                <h2>Todos list</h2>
              <div className="todolist">
                <ul>{todolist}</ul>
              </div>
             </div>
          </div>
      
       </div>
  )
}

export default App
