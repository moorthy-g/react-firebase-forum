import { combineReducers } from 'redux';
import { reducer as threadsReducer, STATE_KEY as threadsState } from 'screens/threads';
import { reducer as singleThreadReducer, STATE_KEY as singleThreadState } from 'screens/single-thread';

export default combineReducers({
  [threadsState]: threadsReducer,
  [singleThreadState]: singleThreadReducer
});
