export function truncate(inputString, limit = 100) {
  if(inputString.length <= limit)
    return inputString;

  return inputString.slice(0, limit) + '...';
}

export function reduceArrayToObject(objectArray) {
  return objectArray.reduce((accumulator,object) => Object.assign(accumulator, object), {});
}

export function getLastKey(object) {
  for(var lastKey in object);
  return lastKey;
}

export function setDocumentTitle(title) {
  if(typeof title === 'string') {
    document.title = title.replace( /./, match => match.toUpperCase() );
  } else {
    document.title = 'React Forum';
  }
}
