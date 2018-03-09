import { updateObject } from 'utils/helpers';
import { createReducer } from 'store/helpers';
import { auth } from 'api/firebase';

// Constants
export const STATE_KEY = 'auth';

// Action types
const types = {
  SIGNED_IN: 'AUTH/SIGNED_IN',
  SIGNED_OUT: 'AUTH/SIGNED_OUT'
}

// Reducer
export default createReducer({
  authenticated: false,
  loading: true
}, types);

// Action Creators
let removeAuthListener;
//Once listener attached don't create another one
function listenAuthStatus() {
  if(process.env.NODE_ENV === 'development') {
    if(typeof removeAuthListener === 'function')
      return () => false;
  }
  return dispatch => {
    removeAuthListener =
    auth.onAuthStateChanged(user => {
      if(user)
        dispatch(signedIn());
      else
        dispatch(signedOut());
    });
  }
}

function signedIn() {
  return {
    type: types.SIGNED_IN,
    authenticated: true,
    loading: false
  }
}

function signedOut() {
  return {
    type: types.SIGNED_OUT,
    authenticated: false,
    loading: false
  }
}

export const actions = {
  listenAuthStatus
}
