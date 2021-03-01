import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    return (
        <div className="single-product">
            <div className="product-img">
                <img className="img-fluid" src={props.product.img} alt="Product Image"/>
            </div>
            <div className="product-details">
                <h3>{props.product.name}</h3>
                <p>By: {props.product.key}</p>
                <h4>Price: {props.product.price}</h4>
                <p><small>Only {props.product.stock} left in stock - order soon</small></p>
                <button onClick={() => {props.handleAddButton(props.product)}} className="btn buy-now-btn"><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;<h2>Thsi is a product</h2>