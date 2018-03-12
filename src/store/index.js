import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { actions } from 'components/auth';
import rootReducer from './rootReducer';

export function configureStore() {
  let enhancers;

  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger').createLogger;
    const logger = createLogger({
      collapsed: true
    })
    const composeEnhancers =
      typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
    enhancers = composeEnhancers(applyMiddleware(thunk, logger));
  } else {
    //prod only middlewares
    enhancers = compose(applyMiddleware(thunk));
  }

  const store = createStore(rootReducer, enhancers);
  store.dispatch(actions.listenAuthStatus());

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
