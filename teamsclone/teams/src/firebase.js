import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyB4CKshjk_oH_Ehm3UaQko7OXirH_ne75U",
    authDomain: "teams-development-23622.firebaseapp.com",
    projectId: "teams-development-23622",
    storageBucket: "teams-development-23622.appspot.com",
    messagingSenderId: "447943096363",
    appId: "1:447943096363:web:cd9d64d64f5db04df0526e"
} 
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
