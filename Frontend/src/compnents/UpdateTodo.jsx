import { useEffect, useState } from "react"


export function UpdateTodo({ todoid, onClose, setTodos }) {
  const Token = localStorage.getItem("Token")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [popmessage, setPopMessage] = useState("")
  const [emptyTitle, setEmptyTitle] = useState(false)
  const [emptyDescription, setEmptyDescription] = useState(false)
  const [showupdateTodo, setShowUpdateTodo] = useState(true)
  const [updatebtn, setUpdateBtn] = useState('Update Todo')


  const updatetodo = async () => {
    console.log(todoid);
    if (title == "" && description == "") {
      setEmptyTitle(true)
      setEmptyDescription(true)
      setTimeout(() => {
        setEmptyTitle(false)
        setEmptyDescription(false)
        setPopMessage("")
      }, 1000);
      setPopMessage("Please enter atleast one feild")
    }
    else {
      let requestBody = {};
      if (title) {
        requestBody.title = title;
      }
      if (description) {
        requestBody.description = description;
      }

      const response = await fetch("https://todo-mini.onrender.com/todo/" + todoid, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "authorization": Token
        },
        body: JSON.stringify(requestBody)
      });

      const todos = await response.json();
      if (response.ok) {
        setTimeout(() => {
          setTitle("");
          setDescription("");
          setPopMessage("");
          setUpdateBtn('Update Todo')
          setShowUpdateTodo(false);
          onClose();
        }, 1000);
        setUpdateBtn("Done")
        setPopMessage(todos.message);
        setTodos(todos.todo);
      }
    }
  }
  return (<div>
    <div id="pop-message" className={popmessage.includes('atleast') ? 'warn' : 'success'}>{popmessage}</div>
    {showupdateTodo && (
      <div className="update-todo-section">
        <div className="inputs updatedtodo-inputs">
          <input type="text" value={title} className={emptyTitle == true ? 'error' : ''} placeholder="Title" id="title" onChange={(e) => {
            const value = e.target.value
            setTitle(value)
          }} />
          <br />
          <br />

          <input type="text" value={description} className={emptyDescription == true ? 'error' : ''} placeholder="Description" id="description" onChange={(e) => {
            const value = e.target.value
            setDescription(value)
          }} />
        </div>
        <br /><br />
        <div className="update-todo">
          <button className={updatebtn == 'Done' ? 'done updatetodo-btn-done' : 'btn updatetodo-btn'} type="sibmit" onClick={updatetodo}>{updatebtn}</button>
        </div>

        <p className="update-warn">Please reload page before updating todos</p>
      </div>
    )}
  </div>
  )
}