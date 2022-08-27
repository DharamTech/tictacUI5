import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.css';
import "./Login.css"
import { Link } from "react-router-dom";



function SignUp({ setIsAuth }) {

  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  // const [isAuth, setIsAuth] = useState(false)

  const signUp = () => {
    Axios.post("https://tictac5.herokuapp.com/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
    console.log("******", signUp)
  };

  return (
   
    <>
     <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder"></h1> 
            <p className="lead text-center">Enter Your Details To Register</p>
            
          
   <div className="cover">
       <h1>Sign Up</h1>
        <input placeholder="First Name"
            onChange={(event) => {
              setUser({ ...user, firstName: event.target.value });
            }}/>
    
    <input 
              placeholder="Last Name"
            onChange={(event) => {
              setUser({ ...user, lastName: event.target.value });
            }}/>
    
    <input 
        placeholder="Username"
            onChange={(event) => {
              setUser({ ...user, username: event.target.value });
            }} />
    
        <input 
             placeholder="Password"
            type="password"
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}/>
    
        <button className="login-btn" onClick={signUp}>Sign Up</button>
    
        <p className="text">Or SignUp using</p>
    
        <div className="alt-login">
            <div className="facebook"></div>
            <div className="google"></div>
        </div>
     </div>
     <h5 className="mb-4">OR</h5>
            <Link to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50">
              Login</Link>
     </div>
     </>
  );
}
export default SignUp;