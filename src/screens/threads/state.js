import { updateObject, fetchAndNormalize, getLastKey } from 'utils/helpers';
import { createReducer } from 'store/helpers';
import * as api from 'api/firebase';

//constants
export const STATE_KEY = 'threads';
const threadsLimit = 10;

// action types
const types = {
  GET_THREADS: 'THREADS/GET_THREADS',
  GET_USERS: 'THREADS/GET_USERS',
  LAST_THREAD_KEY: 'THREADS/LAST_THREAD_KEY',
  FIRST_LOAD: 'THREADS/FIRST_LOAD',
  LOADING: 'THREADS/LOADING',
  FREEZE: 'THREADS/FREEZE',
}


// reducer
export default createReducer({
  threadsById: {},
  usersById: {},
  lastKey: null,
  firstLoad: false,
  freeze: false, // Once all threads loaded, freeze
  loading: false
}, types);


// action creators
function getThreads(loadNextSet=false) {
  return (dispatch, getState) => {
    const state = getState()[STATE_KEY];
    if (!state.firstLoad || loadNextSet && !state.loading && !state.freeze) {
      const startValue = state.lastKey;
      dispatch({ type:types.LOADING, loading: true });
      api.getThreads(startValue, threadsLimit+1)
      .then(payload => {
        let lastKey = getLastKey(payload);
        dispatch({ type: types.GET_THREADS, threadsById: updateObject(state.threadsById, payload), loading: false });
        if(lastKey === state.lastKey) {
          dispatch({ type: types.FREEZE, freeze: true });
        } else {
          dispatch({ type: types.LAST_THREAD_KEY, lastKey });
        }
        (startValue === null) && dispatch({ type: types.FIRST_LOAD, firstLoad: true });
        return payload;
      })
      .then(identifyNewUsersInThreads.bind(state))
      .then(api.getUsersList)
      .then(payload => {
        dispatch({ type: types.GET_USERS, usersById: updateObject(state.usersById, payload) });
      })
    }
  };
}

function getMoreThreads() {
  return getThreads(true);
}

// action helpers
function identifyNewUsersInThreads(threads) {
  const usersState = this.usersById, newUserIds=[];
  for (const key in threads) {
    const userId = threads[key].user_id;
    if(!(userId in usersState)) {
      usersState[userId] = null;
      newUserIds.push(userId);
    }
  }
  return newUserIds;
}

export const actions = {
  getThreads,
  getMoreThreads
};
