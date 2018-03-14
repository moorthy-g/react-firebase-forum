import { createReducer, updateObject } from 'store/helpers';
import { STATE_KEY as THREADS_KEY } from 'screens/threads';
import * as api from 'api/firebase';

// Constants
export const STATE_KEY = 'single';

// Action Types
const types = {
  GET_THREAD: 'SINGLE_THREAD/GET_THREAD',
  GET_POSTS: 'SINGLE_THREAD/GET_POSTS',
  SUBMIT_POST: 'SINGLE_THREAD/SUBMIT_POST',
  ADD_POST: 'SINGLE_THREAD/ADD_POST',
  LOADING: 'SINGLE_THREAD/LOADING',
  POSTS_LOADING: 'SINGLE_THREAD/POSTS_LOADING'
}

// Reducer
export default createReducer({
  id: null,
  thread: {},
  posts: {},
  postInput: '',
  postsLoading: true,
  submitting: false,
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

function submitPost(message) {
  return (dispatch, getState) => {
    const state = getState()[STATE_KEY];
    const post = {
      message,
      thread_id: state.id,
      user_id: api.auth.getUid(),
      timestamp: api.timestamp
    }
    dispatch({
      type: types.SUBMIT_POST,
      postInput: message,
      submitting: true
    })
    api.createPost(post).then(result => {
      post.key = result.key;
      dispatch( addPost(state, post) );
    })
  }
}

// action helpers
function addPost(state, post) {
  return {
    type: types.ADD_POST,
    postInput: '',
    posts: {
      [state.id]: [...state.posts[state.id], post]
    },
    submitting: false
  }
}

export const actions = {
  getThread,
  getPosts,
  submitPost
};
