import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { configureStore } from './store';
import { AuthRoute, Login, actions } from 'components/auth';
import Threads from 'screens/threads';
import SingleThread from 'screens/single-thread';
import rootReducer from 'store/rootReducer';
import './polyfills';

if (module.hot) {
  module.hot.accept();
  //clear console on hot reload
  window.addEventListener('message', console.clear());
}

const store = configureStore();
store.dispatch(actions.listenAuthStatus());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <Switch>
          <Route path='/' exact render={ () => <Redirect to='/threads' /> }></Route>
          <Route path='/login' exact component={Login}></Route>
          <AuthRoute path='/threads' exact component={Threads}></AuthRoute>
          <AuthRoute path='/threads/:id' exact component={SingleThread}></AuthRoute>
        </Switch>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.container')
)
