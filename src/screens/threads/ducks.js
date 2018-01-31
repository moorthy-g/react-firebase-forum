import { updateObject, fetchAndNormalize } from 'utils/helpers';
import { createSelector } from 'reselect';

//constants
export const NAME = 'threads';

// action types
const GET_THREADS = 'THREADS/GET_THREADS';
const GET_USERS = 'THREADS/GET_USERS';
const GET_POSTS = 'THREADS/GET_POSTS';
const DATA_CACHED = 'THREADS/DATA_CACHED';
const ERROR = 'THREADS/ERROR';

// reducer
const initialState = {
  threadsById: {},
  usersById: {},
  postsById: {},
  isCached: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_THREADS:
      return updateObject(state, { threadsById: action.payload });
    case GET_USERS:
      return updateObject(state, { usersById: action.payload });
    case GET_POSTS:
      return updateObject(state, { postsById: action.payload });
    case DATA_CACHED:
      return updateObject(state, { isCached: action.payload });
    default:
      return state;
  }
}

// action creators
function getThreadsData() {
  return (dispatch, getState) => {
    const state = getState()[NAME];
    if (!state.isCached) {
      const threadsPromise = fetchAndNormalize('/data/threads.json');
      const usersPromise = fetchAndNormalize('/data/users.json');
      const postsPromise = fetchAndNormalize('/data/posts.json');

      Promise.all([threadsPromise, usersPromise, postsPromise]).then(data => {
        dispatch({ type: GET_POSTS, payload: data[2] });
        dispatch({ type: GET_USERS, payload: data[1] });
        dispatch({ type: GET_THREADS, payload: data[0] });
        dispatch({ type: DATA_CACHED, payload: true });
      });
    }
  };
}

export const actions = {
  getThreadsData
};
