import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { handleSignOut } from '../Login/firebaseManager';

const Header = () => {
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let signStatus;
    const {email} = loggedInUser;

    const signOut = () => {
        handleSignOut();
        setLoggedInUser({});
    }

    if(loggedInUser.displayName){
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
                        <input type="text" placeholder="Search Product"/> <FontAwesomeIcon className="cart" icon={faShoppingCart} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Header;