import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const placeOrder = () => {
        setCart([]);
        processOrder();
        if(cart.length > 0){
            setOrderPlaced(true);
        }
    }

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

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt="THank you"/>;
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
                    {thankYou}
                </div>
                <div className="col-md-4">
                    <div className="cart">  
                        <Cart cart={cart}>
                            <div className="review-btn">
                                <button onClick={placeOrder} className="btn btn-warning center">Place Your Order</button>
                            </div>
                        </Cart>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
};

export default Review;