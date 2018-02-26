import { combineReducers } from 'redux';
import { threadsReducer, STATE_NAME as threadsState } from 'screens/threads';
import { singleThreadReducer, STATE_NAME as singleThreadState } from 'screens/single-thread';

export default combineReducers({
  [threadsState]: threadsReducer,
  [singleThreadState]: singleThreadReducer
});
