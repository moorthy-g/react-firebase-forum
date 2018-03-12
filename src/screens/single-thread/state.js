import { createReducer, updateObject } from 'store/helpers';
import { STATE_KEY as THREADS_KEY } from 'screens/threads';
import * as api from 'api/firebase';

// Constants
export const STATE_KEY = 'single';

// Action Types
const types = {
  GET_THREAD: 'SINGLE_THREAD/GET_THREAD',
  GET_POSTS: 'SINGLE_THREAD/GET_POSTS',
  LOADING: 'SINGLE_THREAD/LOADING',
  POSTS_LOADING: 'SINGLE_THREAD/POSTS_LOADING'
}

// Reducer
export default createReducer({
  id: null,
  thread: {},
  posts: {},
  postsLoading: true,
  loading: true
}, types);


// Action creators
function getThread(id) {
  return (dispatch, getState) => {
    const state = getState()[STATE_KEY];
    const threadsState = getState()[THREADS_KEY];
    const thread = threadsState.threadsById[id];

    dispatch(getPosts(id));

    if(state.id !== id && thread) {
      dispatch({ type: types.GET_THREAD, id, thread, loading: false });
    } else if(state.id !== id) {
      dispatch({ type: types.LOADING, loading:true });
      api.getThreads(id,1)
        .then(thread => {
          dispatch({ type: types.GET_THREAD, id, thread: thread[id], loading: false })
        })
    }
  }
}

function getPosts(threadId) {
  return (dispatch, getState) => {
    const state = getState()[STATE_KEY];
    if(state.id !== threadId && !state.posts[threadId]) {
      dispatch({ type: types.POSTS_LOADING, postsLoading: true });
      api.getPosts(threadId)
        .then(posts => {
          dispatch({
            type: types.GET_POSTS,
            posts: updateObject(state.posts, { [threadId]: posts }),
            postsLoading: false
          });
        })
    }
  }
}

export const actions = {
  getThread,
  getPosts
};
