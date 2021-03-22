import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import './Login.css';
import firebaseConfig from '../../firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            // var credential = result.credential;
            // var token = credential.accessToken;
            // var user = result.user;
            setLoggedInUser(result.user);
            history.replace(from);
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    }
    
    

    return (
        <div className="row p-5">
            <div className="col-md-4 shadow-lg mx-auto mt-3 p-4 rounded">
                <form className="mt-4">
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="col-md-12 btn btn-primary">Sign In</button>
                </form>
                <hr/>
                <button onClick={handleSignIn} className="btn btn-danger mt-3 shadow col-md-12">Sign in with Google</button>
            </div>
            
        </div>
    );
};

export default Login;