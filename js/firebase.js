import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDZ3yngmqaPqVkcIwCGXIx4qTygUoTK9HA",
  authDomain: "viserion-dfc3d.firebaseapp.com",
  databaseURL: "https://viserion-dfc3d.firebaseio.com",
  projectId: "viserion-dfc3d",
  storageBucket: "viserion-dfc3d.appspot.com",
  messagingSenderId: "875676917845"
};

firebase.initializeApp(firebaseConfig);

export default firebase; 
