import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <a href="/"><img src={logo} alt=""/></a>
            </div>
            <nav className="nav-bar">
                <ul>
                    <a href="/shop"><li>Shop</li></a>
                    <a href="/review"><li>Order Review</li></a>
                    <a href="/inventory"><li>Manage Inventory Here</li></a>
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