export function normalize(data) {
  return data.reduce((accumulator, current) => {
    accumulator[current.id] = current
    return accumulator;
  }, {})
}

export function fetchAndNormalize(url) {
  return fetch(url)
    .then(response => response.json())
    .then(normalize);
}

export function truncate(inputString, limit = 100) {
  if(inputString.length <= limit)
    return inputString;

  return inputString.slice(0, limit) + '...';
}

export function copyObject(object) {
  return Object.assign({}, object);
}

export function updateObject(...args) {
  let state = Object.assign({}, ...args);
  delete state.type;
  return state;
}

export function reduceArrayToObject(objectArray){
  return objectArray.reduce((accumulator,object) => Object.assign(accumulator, object), {});
}

export function getLastKey(object) {
  for(var lastKey in object);
  return lastKey;
}
