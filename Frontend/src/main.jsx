import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SignIn from './Sign_in.jsx'
import './index.css'

const Main = () => {
 const[isSignIn, setIsSignIn] = useState(false)

 const handleIsSignIn = () =>{
  setIsSignIn(true)
 }

  return (
    <React.StrictMode>
      {!isSignIn?<SignIn onSignIn={handleIsSignIn}/>:<App />}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main/>
)
