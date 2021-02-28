import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useAuth} from "../contexts/authContext"

const PrivateRoute = ({component: Component, ...rest}) => {
  const {currentUser} = useAuth()
  return (
    // wrapped around the current route
    <Route
      {...rest} 
      render={props => {
        // if we have a current user then we will render out the component with all the props
        // private Route chính là checkAuth higher order component
        return currentUser ? <Component {...props}/> : <Redirect to="/"/>
      }}
    >
    </Route>
  );
}

export default PrivateRoute;