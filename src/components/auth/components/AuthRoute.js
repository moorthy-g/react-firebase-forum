import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { STATE_KEY } from '../state';
import Login from './Login';

const AuthRoute = ({component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={ props => {
      return (
        authenticated
        ? <Component {...rest} {...props} />
        : <Login {...rest} />
      )
    }}
  />
)

function mapStateToProps(state) {
  return state[STATE_KEY];
}

export default withRouter(connect(mapStateToProps, null)(AuthRoute));
