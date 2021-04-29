import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { handleSignOut } from '../Login/firebaseManager';
import { useAuth } from '../../Context/AuthContext';

const Header = ({handleSearch}) => {

    const {loggedInUser, setLoggedInUser} = useAuth();
    let signStatus;
    
    let email;
    if(loggedInUser?.email)
        email = loggedInUser.email;

    const signOut = () => {
        handleSignOut();
        setLoggedInUser({});
    }

    if(loggedInUser?.displayName){
        signStatus = <li onClick={signOut}>Sign Out</li>;
    }
    else{
        signStatus = <Link to="/login"><li>Sign In</li></Link>;
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
                    <Link to="/inventory"><li>Manage Inventory</li></Link>
                    {signStatus}
                    <li>{email}</li>
                </ul>
            </nav>
            <div className="search">
                <form action="">
                    <div className="search-box">
                        <input type="text" onChange={handleSearch} placeholder="Search Product"/> <FontAwesomeIcon className="cart" icon={faShoppingCart} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Header;