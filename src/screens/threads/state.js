import { updateObject, fetchAndNormalize, getLastKey } from 'utils/helpers';
import * as api from 'api/firebase';

//constants
export const STATE_NAME = 'threads';

// action types
const GET_THREADS = 'THREADS/GET_THREADS';
const GET_USERS = 'THREADS/GET_USERS';
const LAST_THREAD_KEY = 'THREADS/LAST_THREAD_KEY';
const FIRST_LOAD = 'THREADS/FIRST_LOAD';
const LOADING = 'THREADS/LOADING';
const FREEZE = 'THREADS/FREEZE';

// reducer
const initialState = {
  threadsById: {},
  usersById: {},
  lastKey: null,
  firstLoad: false,
  freeze: false, // Once all threads loaded, freeze
  loading: false
};

const reducers = {
  [GET_THREADS]:
  (state, action) => {
    const threads = updateObject(state.threadsById, action.payload);
    return updateObject(state, { threadsById: threads });
  },
  [GET_USERS]:
  (state, action) => {
    const users = updateObject(state.usersById, action.payload);
    return updateObject(state, { usersById: users });
  },
  [FIRST_LOAD]:
  (state, action) => {
    return updateObject(state, { firstLoad: action.payload })
  },
  [LAST_THREAD_KEY]:
  (state, action) => {
    return updateObject(state, { lastKey: action.payload })
  },
  [LOADING]:
  (state, action) => {
    return updateObject(state, { loading: action.payload })
  },
  [FREEZE]:
  (state, action) => {
    return updateObject(state, { freeze: action.payload })
  }
}

export default function(state = initialState, action) {
  const actionType = reducers[action.type];
  if(typeof actionType === 'function')
    return actionType(state, action);
  else
    return state;
}

// action creators
const threadsLimit = 10;

function getThreads(loadNextSet=false) {
  return (dispatch, getState) => {
    const state = getState()[STATE_NAME];
    if (!state.firstLoad || loadNextSet && !state.loading && !state.freeze) {
      const startValue = state.lastKey;
      dispatch({ type: LOADING, payload: true });
      api.getThreads(startValue, threadsLimit+1)
      .then(payload => {
        let lastKey = getLastKey(payload);
        dispatch({ type: GET_THREADS, payload });
        if(lastKey === state.lastKey) {
          dispatch({ type: FREEZE, payload: true });
        } else {
          dispatch({ type: LAST_THREAD_KEY, payload: lastKey });
        }
        dispatch({ type: LOADING, payload: false });
        (startValue === null) && dispatch({ type: FIRST_LOAD, payload: true });
        return payload;
      })
      .then(identifyNewUsersInThreads.bind(state))
      .then(api.getUsersList)
      .then(payload => {
        dispatch({ type: GET_USERS, payload });
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
