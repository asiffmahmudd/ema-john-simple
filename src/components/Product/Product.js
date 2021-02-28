import React from 'react';
import './Product.css';

const Product = (props) => {
    console.log(props.product);
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
            </div>
        </div>
    );
};

export default Product;<h2>Thsi is a product</h2>