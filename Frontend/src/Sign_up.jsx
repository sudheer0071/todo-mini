import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import { useHistory } from 'react-router-dom'; 

function SignUp() {
  // const[signin, setSignin] = useState(false)
  const [popmessage, setPopMessage] = useState('') 
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [emptyusername, setEmptyusername] = useState(false)
  const [emptypassword, setEmptypassword] = useState(false)
  const navigate = useNavigate()

  const handlleOnclick = async () => {

    if (username == "" || password == "") {
      if (username == "" && password == "") {
        setEmptyusername(true)
        setEmptypassword(true)
        setTimeout(() => {
          setEmptyusername(false)
          setEmptypassword(false)
          setPopMessage("")
        }, 1000);
        setPopMessage("Please enter both feilds")
      }
      else if (username == "") {
        setEmptyusername(true)
        setTimeout(() => {
          setEmptyusername(false)
          setPopMessage("")
        }, 1000);
        setPopMessage("Please enter username")
      }
      else if (password == "") {
        setEmptypassword(true)
        setTimeout(() => {
          setEmptypassword(false)
          setPopMessage("")
        }, 1000);
        setPopMessage("Please enter password")
      }
    }
    else { 
      const response = await fetch("https://todo-mini.onrender.com/signup", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify({username: username, password: password})
      })
      console.log(username,password);
      const res = await response.json() 
      if (response.ok) {
       const messaage = res.message 
       if (messaage.includes('not')||messaage.includes('Please')) {
         setTimeout(() => {
          setPopMessage('')
          setpassword('')
          setusername('')
        }, 1000); 
        console.log("inside zod error");
        setPopMessage(messaage)
      }
      else{
        const token = res.token
        setTimeout(() => {
          setpassword('')
          setusername('')
          setPopMessage('')
          localStorage.setItem('Token',token)
          navigate('/todos')
        }, 1000);
        setPopMessage(res.message)
      }
      }

      else {
        setTimeout(() => {
          setPopMessage("Something went wrong")
        }, 1000);
      }
    }
  }

  return <div>
    <div id="pop-message" className={popmessage.includes('both')|| popmessage.includes('username')|| popmessage.includes('password')|| popmessage.includes('Please')||popmessage.includes('not')?'warn':'success'}>{popmessage}</div>
    <div className="inputs">
      <h1>Todos</h1>
      <p>create your own todos </p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <input type="text" value={username} className={emptyusername == true ? 'error' : ''} placeholder="Username or Email" id="username" onChange={(e) => {
        const value = e.target.value
        setusername(value)
      }} />
      <br />
      <br />

      <input type="text" value={password} className={emptypassword == true ? 'error' : ''} placeholder="Password" id="password" onChange={(e) => {
        const value = e.target.value
        setpassword(value)
      }} />
    </div>
    <br /><br />
    <button className="btn" onClick={handlleOnclick}>Sign Up</button>
    <br /><br />
    <p>Already have an accout? {<Link to="/signin">Sign In</Link>}</p>
  </div>
}

export default SignUp