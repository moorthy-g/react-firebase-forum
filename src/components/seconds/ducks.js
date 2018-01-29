//action types
const UPDATE = 'SECONDS/UPDATE';

//reducer
export default function (state = 0, action) {
  switch(action.type) {
    case UPDATE:
      return action.payload;
    default:
      return state;
  }
}

//action creators
export function updateSeconds() {
  return {
    type: UPDATE,
    payload: new Date().getSeconds()
  }
}

