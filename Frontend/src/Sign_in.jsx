import { useEffect, useState } from "react";

// import { useHistory } from 'react-router-dom'; 

function SignIn({onSignIn}){
  // const[signin, setSignin] = useState(false)
  const[popmessage, setPopMessage] = useState('')
  // const history = useHistory();
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("") 
  const [emptyusername, setEmptyusername] = useState(false)
  const [emptypassword, setEmptypassword] = useState(false) 
  const handlleOnclick = async ()=>{
  const response = fetch("",{
    method:'POST',
    headers:{
      "Counter-Type":"application/json",
    },
    body:JSON.stringify({username:username,password:password})
  })
 const res = await response.json()
 console.log(res.token);
    setTimeout(() => {
      setPopMessage('')
      onSignIn()
    }, 1000);
    setPopMessage(res.message)
  }

   return <div>
      <div id="pop-message" className= 'success'>{popmessage}</div> 
      <div className="inputs">
    <input type="text" value={username} className={ emptyusername==true ? 'error' :''} placeholder="Username or Email" id="username"  onChange={(e)=>{
      const value = e.target.value
      setusername(value)
    }}/>  
    <br />
    <br />
     
    <input type="text" value={password} className={emptypassword==true ? 'error' :''} placeholder="Password" id="password" onChange={(e)=>{
      const value = e.target.value
      setpassword(value)
    }}/> 
    </div>
    <br /><br />
    <button className="btn" onClick={handlleOnclick}>Sign In</button>
   
   </div>
}

export default SignIn