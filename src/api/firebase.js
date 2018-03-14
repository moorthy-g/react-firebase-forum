import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { reduceArrayToObject } from 'utils/helpers';

const config = {
  apiKey: "AIzaSyACfc2-Fq7HYVN_HjrJJaxCZ6c9tPO8piw",
  authDomain: "react-forum-e2f27.firebaseapp.com",
  databaseURL: "https://react-forum-e2f27.firebaseio.com",
  projectId: "react-forum-e2f27",
  messagingSenderId: "905596638940"
};
firebase.initializeApp(config);

const db = firebase.database();

export const auth = firebase.auth();
export const timestamp = firebase.database.ServerValue.TIMESTAMP;

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => createUser(result.user))
}

export function signOut() {
  auth.signOut();
}

export function getThreads(start, limit) {
  return new Promise((resolve, reject) => {
    let threadsRef;
    if(start === null)
      threadsRef = db.ref('threads').orderByKey().limitToFirst(limit);
    else
      threadsRef = db.ref('threads').orderByKey().startAt(start).limitToFirst(limit);
    threadsRef.once('value', snap => resolve(snap.val()));
  });
}

export function getUser(userId) {
  return new Promise((resolve, reject) => {
    const userRef = db.ref('users').orderByKey().equalTo(userId);
    userRef.once('value', snap => resolve(snap.val()));
  });
}

export function getUsersList(userIds) {
  const userPromises = userIds.map(userId =>
    getUser(userId).then(user => {
       return { [userId]:user }
    })
  );
  return Promise.all(userPromises).then(users => reduceArrayToObject(users));
}

export function getPosts(threadId) {
  return new Promise((resolve, reject) => {
    const postsQuery = db.ref('posts').orderByChild('thread_id').equalTo(threadId);
    postsQuery.once('value', snap => {
      const posts = [];
      snap.forEach(childSnap => {
        let post = childSnap.val();
        post.id = childSnap.key;
        posts.push(post);
      })
      resolve(posts);
    });
  });
}

export function createUser(currentUser) {
  const { photoURL, email, displayName, uid } = currentUser;
  return db.ref('users').child(uid).update({
    avatar: photoURL,
    email: email,
    first_name: displayName,
    last_name: null
  })
}

export function createPost(postData) {
  return db.ref('posts').push(postData);
}
