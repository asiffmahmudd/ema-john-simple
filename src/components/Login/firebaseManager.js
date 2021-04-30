import firebase from "firebase/app";
import "firebase/auth";

export const handleSignInUsing = (provider) => {
    if(provider == "google"){
        provider = new firebase.auth.GoogleAuthProvider();
    }

    return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        return result.user;
    }).catch((error) => {
        alert(error.message);
    });
}

export const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
        return;
    }).catch((error) => {
        alert(error.message);
    });
}

