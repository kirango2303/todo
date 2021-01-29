import firebase from "firebase/app"
import 'firebase/firestore'
const app = firebase.initializeApp({
    apiKey: "AIzaSyC-DPhl5v-YHULnQ7LikianqeYFvvnxovk",
    authDomain: "todoapp-12386.firebaseapp.com",
    databaseURL: "todoapp-12386.firebaseio.com",
    projectId: "todoapp-12386",
    storageBucket: "todoapp-12386.appspot.com",
    messagingSenderId: "854213791694",
    appId: "1:854213791694:web:04f160574b5d531af0659f"  
})

export const db = app.firestore()
export default app