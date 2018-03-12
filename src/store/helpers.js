export function createReducer(initialState, actionTypes) {
  const availTypes = {};

  //Store available action types in an object.
  //Later, it helps to identify action for specific substate
  for(let key in actionTypes)
    availTypes[ actionTypes[key] ] = true;

  return (state = initialState, action) => {
    if(availTypes[action.type])
      return updateObject(state, action);
    else
      return state;
  }
}


export function updateObject(...args) {
  let state = Object.assign({}, ...args);
  delete state.type;
  return state;
}
