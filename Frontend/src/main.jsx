// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import SignIn from './Sign_in.jsx';
// import './index.css';

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


// ReactDOM.createRoot(document.getElementById('root')).render(<Main />);


import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import SignIn from './Sign_in.jsx';
import SignUp from './Sign_up.jsx';
import App from './App.jsx';

const Main = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/" component={SignUp} />
        <Route exact path="/todos" component={App} />
      </Routes> 
    </BrowserRouter>
  );
};

export default Main;
