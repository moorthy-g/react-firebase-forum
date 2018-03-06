import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { configureStore } from './store';
import Threads from 'screens/threads';
import SingleThread from 'screens/single-thread';
import rootReducer from './store/rootReducer';
import './polyfills';

if (module.hot) {
  module.hot.accept();
  //clear console on hot reload
  window.addEventListener('message', console.clear());
}

ReactDOM.render(
  <Provider store={configureStore()}>
      <Router>
        <main className="container">
          <Route path='/' exact component={Threads}></Route>
          <Route path='/threads/:id' exact component={SingleThread}></Route>
        </main>
      </Router>
  </Provider>,
  document.querySelector('.container')
)
