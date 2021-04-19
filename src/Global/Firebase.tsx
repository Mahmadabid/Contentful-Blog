import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAue6tntchg5c8sUxZdneiRkFE3nh4rISU",
    authDomain: "contentful-blog-5ffad.firebaseapp.com",
    projectId: "contentful-blog-5ffad",
    storageBucket: "contentful-blog-5ffad.appspot.com",
    messagingSenderId: "858257695239",
    appId: "1:858257695239:web:5d6ce28cb9398e114480a2"
  };

  firebase.initializeApp(config);

  let instance: any;

export default function getFirebase() {
if (typeof window !== 'undefined') {
if (instance) return instance;
instance = firebase.initializeApp(config);
return instance;
}

return null;
}
  
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();