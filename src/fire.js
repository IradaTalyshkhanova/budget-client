
import firebase from'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD003ufftY0qRa_iG_DQ7WSIrR20gFuDsw",
    authDomain: "budget-8dcb6.firebaseapp.com",
    projectId: "budget-8dcb6",
    storageBucket: "budget-8dcb6.appspot.com",
    messagingSenderId: "552289799222",
    appId: "1:552289799222:web:aa5c7fe603cdf490845c97"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;