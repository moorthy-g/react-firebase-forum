import { combineReducers } from 'redux';
import { reducer as threadsReducer, STATE_KEY as threadsState } from 'screens/threads';
import { reducer as UsersReducer, STATE_KEY as UsersState } from 'components/user';
import { reducer as singleThreadReducer, STATE_KEY as singleThreadState } from 'screens/single-thread';

export default combineReducers({
  [threadsState]: threadsReducer,
  [UsersState]: UsersReducer,
  [singleThreadState]: singleThreadReducer
});
