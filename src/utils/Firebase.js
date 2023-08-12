
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDALJOs0hGAwigThOVLR2r7Sp40leEzk3U",
    authDomain: "todo-app-2f1dc.firebaseapp.com",
    projectId: "todo-app-2f1dc",
    storageBucket: "todo-app-2f1dc.appspot.com",
    messagingSenderId: "191177406779",
    appId: "1:191177406779:web:aac401122bee7ff6555f1e",
    measurementId: "G-1QDZGSYEYM"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const todosRef = firestore.collection("todos");
export default firebase;