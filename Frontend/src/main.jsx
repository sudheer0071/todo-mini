// import React, { useState, useEffect } from 'react';
// import App from './App.jsx';
// import SignIn from './Sign_in.jsx';

// const Main = () => {
  //   const [isSignIn, setIsSignIn] = useState(false);
  
  //   // useEffect(() => {
    //   //   // Check local storage for sign-in state
    //   //   const storedIsSignIn = localStorage.getItem('isSignIn');
    //   //   if (storedIsSignIn) {
      //   //     setIsSignIn(JSON.parse(storedIsSignIn));
      //   //   }
      //   // }, []);
      
      //   const handleIsSignIn = () => {
        //     setIsSignIn(true);
        //     // Store sign-in state in local storage
        //     localStorage.setItem('isSignIn', true);
        //     console.log('isSignIn set to true');
        //   };
        
        //   console.log('Initial isSignIn state:', isSignIn);
        
        
        //   if (!isSignIn) {
          //     console.log('Rendering SignIn component');
          //     return (
            //       <React.StrictMode>
            //         <SignIn onSignIn={handleIsSignIn} />
            //       </React.StrictMode>
            //     );
            //   }
            
            
            //   return (
              //     <React.StrictMode>
              //       <App />
              //     </React.StrictMode>
              //   );
              // };
              
              
              
              
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
  import { BrowserRouter } from 'react-router-dom';
  import SignIn from './Sign_in.jsx';
  import './index.css';
  import SignUp from './Sign_up.jsx';
  import App from './App.jsx';
 

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter> 
        <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/todos" element={<App />} />
        <Route exact path="/signin" element={<SignIn />} />
        </Routes> 
      </BrowserRouter> 
    </React.StrictMode>
  )

// ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
// export default Main;
