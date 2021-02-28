import React from "react"
// import { Button, Form } from 'react-bootstrap';
// import Item from './components/Item'
// import {db} from './services/firebase'
import { Route, Switch } from 'react-router-dom'
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import Todo from "./components/ToDoList/Todo";
import { AuthProvider } from "./contexts/authContext";
import SearchMovie from "./components/SearchMovie/SearchMovie"
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const currentUser = null;
  return (
    <div className="ToDoApp">
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/todo" component={Todo} />
          <PrivateRoute path="/movie" component={SearchMovie} />
        </Switch>
      </AuthProvider>
    </div>
  );
}


export default App;