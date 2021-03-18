import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={IndexPage} exact/>
      <Route path="/login" component={LoginPage} exact/>
      <Route path="/register" component={RegisterPage} exact />
      <Route path="/dashboard" component={DashboardPage} exact />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
