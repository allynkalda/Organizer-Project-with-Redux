import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCFH5ixUGXeV_dFYMyh_GE3_C2SeqHj8hM",
    authDomain: "organizer-project-with-redux.firebaseapp.com",
    databaseURL: "https://organizer-project-with-redux.firebaseio.com",
    projectId: "organizer-project-with-redux",
    storageBucket: "organizer-project-with-redux.appspot.com",
    messagingSenderId: "496211745636",
    appId: "1:496211745636:web:22c486a6c5f858f4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true })

  const storage = firebase.storage()

  export {
    storage, firebase as default
  }