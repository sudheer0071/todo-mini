import { useEffect, useState } from 'react'
import React from 'react';
import Modal from 'react-modal'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './compnents/CreateTodo'
import { UpdateTodo } from './compnents/UpdateTodo'
import { Todos } from './compnents/Todos'
import { DeleteTodo } from './compnents/DeleteTodo'

Modal.setAppElement("#root")

function App() {
  const [todolist, setTodoList] = useState([])
  const [todos, setTodos] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [updateTodoId, setUpdateTodoId] = useState('')
  const [deleteTodoId, setDeleteTodoId] = useState('')
  const [showdeleteTodo, setShowDeleteTodo] = useState(false)
  const [showmobileTodoList, setShowmobileTodoList] = useState(false)
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);
  const [notodos, setNotodos] = useState(false)

  function todoList() {
    if (!todos) return;

    const todoss = todos.map((todo, index) => {
      return <div key={index}>
        <li><span>{index + 1}</span>{todo.title}
          <div className='actions'>
            <button className='list-btns' onClick={() => {
              setDeleteTodoId(todo.id); setShowDeleteTodo(true); setTimeout(() => {
                window.location.reload()
              }, 1000);
            }}><i class="far fa-trash-alt"></i></button>
            <button className='list-btns' onClick={() => { setUpdateTodoId(todo.id); toggleModal() }} ><i class="far fa-edit"></i></button>
            <button className='list-btns check'><i class="fas fa-check"></i></button>
          </div>
        </li>
      </div>
    })
    setTodoList(todoss)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };


  const toogleMobileTodolist = () => {
    setShowmobileTodoList(!showmobileTodoList);
  };
  useEffect(() => {
    todoList()
  }, [todos])
  return (
    <div >
      <Modal isOpen={isOpen} onRequestClose={toggleModal} className="Modal" overlayClassName="Overlay">
        <button className="ModalCloseButton" onClick={toggleModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <UpdateTodo todoid={updateTodoId} setTodos={setTodos} onClose={toggleModal}></UpdateTodo>
      </Modal>
      <h1>Todos</h1>
      <CreateTodo setTodos={setTodos}></CreateTodo>
      {showdeleteTodo && <DeleteTodo todoid={deleteTodoId} setTodos={setTodos}></DeleteTodo>}
      <div className='all-todos'>
        <div className="display-todos">
          <Todos
            todos={todos} setTodos={setTodos}
          ></Todos>
        </div>
        <div className="right-bar">
          <h2>Todos list</h2>
          <div className="todolist">
          <h2 className='notodos'>{todolist.length==0?"No Todos to show":''} <br />{todolist.length==0 && <svg width="44" height="34" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 11.5V16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> <path d="M12 7.51L12.01 7.49889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> </svg>}</h2>
            <ul>{todolist}</ul>
          </div>
        </div>
        <div className="mobile-todo-list">
          <button className='mobile-list' onClick={toogleMobileTodolist}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-list"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
          {showmobileTodoList && (
            <div className={`blur-wrapper ${showmobileTodoList ? 'show' : ''}`}>
              <div className="todolist">
                <h2 className='notodos'>{todolist.length == 0 ? "No Todos to show" : ''} <br />{todolist.length==0 && <svg width="44" height="34" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 11.5V16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> <path d="M12 7.51L12.01 7.49889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /> </svg>}</h2>

                <ul>{todolist}</ul>
              </div>
              <button className='close-btn' onClick={toogleMobileTodolist}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
