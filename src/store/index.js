import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

export function configureStore() {
  const store = window.store = createStore(rootReducer, applyMiddleware(thunk, logger));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      console.log('nextRootReducer', nextRootReducer);
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
