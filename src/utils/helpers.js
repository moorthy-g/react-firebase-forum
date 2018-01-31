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

export function updateObject(object, updates) {
  return Object.assign({}, object, updates);
}
