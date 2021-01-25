import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyApwgt5Jmmlw3QZbs4X-vnuRNtxWlr-5Oc",
    authDomain: "inventarios-1d84e.firebaseapp.com",
    databaseURL: "https://inventarios-1d84e.firebaseio.com",
    projectId: "inventarios-1d84e",
    storageBucket: "inventarios-1d84e.appspot.com",
    messagingSenderId: "391386312559",
    appId: "1:391386312559:web:d08a24a32494e79468c29a",
    measurementId: "G-RNBSG1MRZM"
}

firebase.initializeApp(firebaseConfig);

export default firebase;

