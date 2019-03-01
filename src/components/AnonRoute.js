import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

const AnonRoute = ({ component: Component, isLogged, ...rest }) => {
  return (
    <Route
      render={props => {
        if (!isLogged) {
          return <Component {...props} {...rest} />
        } else {
          return <Redirect to={{ pathname: '/profile', state: { from: props.location } }} />
        }
      }
      }
    />
  )
}
export default withAuth(AnonRoute);