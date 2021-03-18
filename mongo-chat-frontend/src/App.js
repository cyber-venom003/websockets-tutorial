import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import ChatroomPage from './Pages/ChatroomPage';
import io from 'socket.io-client';
import makeToast from './Toaster';

function App() {
  const [socket, setSocket] = React.useState(null);
  const openSocketConnection = () => {
    const token = localStorage.getItem('CC_Token');
    if (token != null && !socket){
      const newSocket = io("http://localhost:8000" , {
        withCredentials: true,
        query: {
            token: localStorage.getItem('CC_Token'),
        }
      });

      newSocket.on("disconnect" , () => {
        setSocket(null);
        setTimeout(openSocketConnection , 3000);
        makeToast("error", "Socket Disconnected");
      });

      newSocket.on('connect', () => {
        makeToast("success", "Socket Connected!");
      });
      setSocket(newSocket);
    } else {
      console.log('Token Null');
    }
  }
  React.useEffect(() => {
    openSocketConnection();
    //eslint-disable-next-line
  }, []);
  return (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={IndexPage} exact/>
      <Route path="/login" render={() => <LoginPage setupSocket={openSocketConnection} />} exact/>
      <Route path="/register" component={RegisterPage} exact />
      <Route path="/dashboard" render={() => <DashboardPage socket={socket}/>} exact />
      <Route path="/chatroom/:id" render={() => <ChatroomPage socket={socket}/>} exact />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
