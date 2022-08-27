import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.css';
import "./Login.css"
import { Link } from "react-router-dom";


function Login({setIsAuth}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isAuth, setIsAuth] = useState(false)

  const cookies = new Cookies();
  const login = () => {
    Axios.post(" https://tictac5.herokuapp.com/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
    console.log("******", login)
  };

  return (
    <>
       <div className="login">
          <label> Login</label>
          
          <input
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />         
          <button onClick={login}> Login</button>
          </div>  
    </>
  );
}

export default Login;