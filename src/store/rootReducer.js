import { combineReducers } from 'redux';
import { reducer as authReducer, STATE_KEY as authState } from 'components/auth';
import { reducer as UsersReducer, STATE_KEY as UsersState } from 'components/user';
import { reducer as threadsReducer, STATE_KEY as threadsState } from 'screens/threads';
import { reducer as singleThreadReducer, STATE_KEY as singleThreadState } from 'screens/single-thread';

export default combineReducers({
  [authState]: authReducer,
  [threadsState]: threadsReducer,
  [UsersState]: UsersReducer,
  [singleThreadState]: singleThreadReducer
});
