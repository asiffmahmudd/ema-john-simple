import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleSignInUsing = (provider) => {
    if(provider == "google"){
        provider = new firebase.auth.GoogleAuthProvider();
    }

    return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        return result;
    }).catch((error) => {
        console.log(error);
    });
}

export const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
        
    }).catch((error) => {
        console.log(error);
    });
}

