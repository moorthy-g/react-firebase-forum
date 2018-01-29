import { combineReducers } from 'redux';
import secondsReducer from 'components/seconds/ducks';

export default combineReducers({
  seconds: secondsReducer
})
