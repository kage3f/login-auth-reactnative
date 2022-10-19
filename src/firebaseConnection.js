import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB65Aq0xk80R5ekWMVY0RNDK3GQs13CzF4",
    authDomain: "meu-app-5ca10.firebaseapp.com",
    databaseURL: "https://meu-app-5ca10-default-rtdb.firebaseio.com",
    projectId: "meu-app-5ca10",
    storageBucket: "meu-app-5ca10.appspot.com",
    messagingSenderId: "114424116324",
    appId: "1:114424116324:web:0d4316b9f267edd123db71",
    measurementId: "G-LTSCY0DRQL"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;