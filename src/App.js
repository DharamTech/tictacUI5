import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { StreamChat } from 'stream-chat';
import Cookies from "universal-cookie";
import { Chat } from "stream-chat-react";
import { useState } from 'react';
import JoinGame from './components/JoinGame';
// import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import Home from './Home';

function App() {
  const api_key = "4zds8sfcsjrw";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false)

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };


  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
        console.log(user)
      });
  }
  return (
    <div className="App">
     {/* <div>
      <Home />
     </div> */}
      { 
      isAuth ? ( 
        <Chat client={client}>
          <JoinGame /> 
          <button className='button' onClick={logOut}> Log Out</button>
      </Chat>
      ) : (
        <>
       
          {/* <SignUp setIsAuth={setIsAuth} />   */}
          <Login setIsAuth={setIsAuth} /> 
         
        
          {/* <Routes>
          <Route exact path="/signUp" setIsAuth={setIsAuth} element={<SignUp/>}/>
          <Route exact path="/login" setIsAuth={setIsAuth} element={<Login/>}/>
          </Routes>  */}
    
      </>
      )
      }
   </div>
  );
}

export default App;
