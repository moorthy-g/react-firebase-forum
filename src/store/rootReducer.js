import { combineReducers } from 'redux';
import { threadsReducer, NAME as threadsState } from 'screens/threads';

export default combineReducers({
  [threadsState]: threadsReducer
});
