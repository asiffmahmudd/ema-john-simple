import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';

import firebase from "firebase/app";
import "firebase/auth";


const Header = () => {
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let signStatus;
    const {displayName, email} = loggedInUser;

    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            setLoggedInUser({});
        }).catch((error) => {
            console.log(error);
        });
    }

    if(loggedInUser.displayName){
        signStatus = <li onClick={handleSignOut}>Sign Out</li>;
    }
    else{
        signStatus = <li><Link to="/login">Sign In</Link></li>;
    }

    

    return (
        <div className="header">
            <div className="logo">
                <a href="/"><img src={logo} alt=""/></a>
            </div>
            <nav className="nav-bar">
                <ul>
                    <Link to="/shop"><li>Shop</li></Link>
                    <Link to="/review"><li>Order Review</li></Link>
                    <Link to="/inventory"><li>Manage Inventory Here</li></Link>
                    {signStatus}
                    <li>{email}</li>
                </ul>
            </nav>
            <div className="search">
                <form action="">
                    <div className="search-box">
                        <input type="text" placeholder="Search Product"/> <FontAwesomeIcon className="cart" icon={faShoppingCart} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Header;