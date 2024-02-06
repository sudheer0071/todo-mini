import { useEffect, useState } from "react";

// import { useHistory } from 'react-router-dom'; 

function SignUp({onSignUp}){
  const[signin, setSignin] = useState(false)
  // const history = useHistory();
 
  
   return <div>
    {<button onClick={onSignUp}>Sign Up</button>}
   
   </div>
}

export default SignUp