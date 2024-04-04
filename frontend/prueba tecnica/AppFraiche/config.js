import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig ={
    apiKey: "AIzaSyAafwpae7RMYZF1bAZyA9MfkrvqMN1PQ2U",
    authDomain: "posdev-app.firebaseapp.com",
    projectId: "posdev-app",
    storageBucket: "posdev-app.appspot.com",
    messagingSenderId: "979151679278",
    appId: "1:979151679278:web:1f109496119a86b55f94bf"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

