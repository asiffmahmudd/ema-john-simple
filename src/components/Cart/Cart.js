import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    let itemsPrice = cart.reduce((total, product) => total + product.price, 0);
    let shipping = cart.reduce((total, product) => total+product.shipping, 0);
    let tax = itemsPrice*0.10;
    function format(x){
        return x.toFixed(2);
    }
    return (
        <div>
            <h5 className="center">Order Summary</h5>
            <p className="center">Items Ordered: {cart.length}</p>
            <div className="order-details">
                <p><small><span className="left">Items price:</span> <span className="right">{format(itemsPrice)}</span></small></p>
                <p><small><span className="left">Shipping & Handling</span><span className="right">{format(shipping)}</span></small></p>
                <p><small><span className="left">Total Before Tax:</span><span className="right">{format(itemsPrice+shipping)}</span> </small></p>
                <p><small><span className="left">Estimated Tax:</span><span className="right">{format(tax)}</span></small></p>
            </div>
            <h5 className="red">Ordered Total: {format(itemsPrice+shipping+tax)}</h5>
            <button className="btn btn-warning center">Review Your Order</button>
        </div>
    );
};

export default Cart;