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
        const {displayName, photoURL, email} = result.user;
        const signedInUser = {
            isSignedIn: true,
            displayName: displayName,
            email: email,
            photo: photoURL,
            success: true
        };
        return signedInUser;
        // return result.user;
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

