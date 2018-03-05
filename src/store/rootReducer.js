import { combineReducers } from 'redux';
import { reducer as threadsReducer, STATE_KEY as threadsState } from 'screens/threads';
import { reducer as UsersReducer, STATE_KEY as UsersState } from 'components/user';

export default combineReducers({
  [threadsState]: threadsReducer,
  [UsersState]: UsersReducer
});
