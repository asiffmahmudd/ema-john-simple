import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import { useHistory } from 'react-router';

const Review = () => {

    const [cart, setCart] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://vast-lowlands-27498.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(products => {
            products.map(product => product.quantity = savedCart[product.key]);
            setCart(products);
        })

        
        // const cartProducts = productKeys.map( key => {
        //     const product = fakeData.find(pd => pd.key === key);
        //     product.quantity = savedCart[key];
        //     return product;
        // });
        // setCart(cartProducts);
    }, []);

    const removeItem = (key) => {
        const newCart = cart.filter(item => item.key !== key);
        setCart(newCart);
        removeFromDatabaseCart(key);
    }

    const toCheckout = () => {
        if(cart.length > 0){
            history.push('/shipment');
        }
        else{
            alert("Please add an item in the cart");
        }
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
                        <Cart cart={cart}>
                            <div className="review-btn">
                                <button onClick={toCheckout} className="btn btn-warning center">Proceed To Checkout</button>
                            </div>
                        </Cart>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
};

export default Review;