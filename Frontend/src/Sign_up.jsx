import { useEffect, useState } from "react";

// import { useHistory } from 'react-router-dom'; 

function SignUn({onSignUp}){
  const[signin, setSignin] = useState(false)
  // const history = useHistory();
 
  
   return <div>
    {<button onClick={onSignUp}>Sign Up</button>}
   
   </div>
}

export default SignIn