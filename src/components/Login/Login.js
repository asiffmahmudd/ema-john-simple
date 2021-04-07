import React, { useContext, useState } from 'react';
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { initializeLoginFramework, handleSignInUsing } from './firebaseManager';

initializeLoginFramework();

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        email: '',
        password: '',
        photo: ''    
    });

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleSignIn = (medium) => {
        handleSignInUsing(medium)
        .then( result => {
            setUser(result);
            setLoggedInUser(result);
            history.replace(from);
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
                <button onClick={() => {handleSignIn("google")}} className="btn btn-danger mt-3 shadow col-md-12">Sign in with Google</button>
            </div>
            
        </div>
    );
};

export default Login;