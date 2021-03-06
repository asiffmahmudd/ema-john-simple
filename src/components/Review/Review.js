import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';

const Review = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        const cartProducts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

    const removeItem = (key) => {
        const newCart = cart.filter(item => item.key !== key);
        setCart(newCart);
        removeFromDatabaseCart(key);
    }

    return (
        <div className="review">
            <div className="row">
                <div className="col-md-8 cart-items-container">
                    <div className="cart-items">
                        {
                            cart.map(pd => <ReviewItem removeItem={removeItem} cart={cart} product={pd} key={pd.key}></ReviewItem>)
                        }
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="cart">  
                        <Cart cart={cart}></Cart>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
};

export default Review;