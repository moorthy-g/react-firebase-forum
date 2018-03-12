import { getLastKey } from 'utils/helpers';
import { createReducer, updateObject } from 'store/helpers';
import * as api from 'api/firebase';

//constants
export const STATE_KEY = 'threads';
const threadsLimit = 10;

// action types
const types = {
  GET_THREADS: 'THREADS/GET_THREADS',
  LOADING: 'THREADS/LOADING'
}

// reducer
export default createReducer({
  threadsById: {},
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
      dispatch({ type:types.LOADING, loading: true });
      api.getThreads(state.lastKey, threadsLimit+1)
        .then(threadsById => dispatch(receiveThreads.call(state, threadsById)))
    }
  };
}

function getMoreThreads() {
  return getThreads(true);
}

function receiveThreads(threadsById) {
  const lastKey = getLastKey(threadsById);
  const state = this;
  return {
    type: types.GET_THREADS,
    threadsById: updateObject(state.threadsById, threadsById),
    freeze: lastKey === state.lastKey,
    loading: false,
    firstLoad: true,
    lastKey
  }
}

export const actions = {
  getThreads,
  getMoreThreads
};
