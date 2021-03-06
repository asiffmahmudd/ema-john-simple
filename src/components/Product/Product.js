import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, seller, img, price, stock, key} = props.product;
    return (
        <div className="single-product">
            <div className="product-img">
                <img className="img-fluid" src={img} alt="Product Image"/>
            </div>
            <div className="product-details">
                <h4><Link to={"/product/"+key}>{name}</Link></h4>
                <p>By: {seller}</p>
                <h4>Price: {price}</h4>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {
                    props.showButton &&
                    <button onClick={() => {props.handleAddButton(props.product)}} className="btn buy-now-btn btn-warning"><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>    
                }
                
            </div>
        </div>
    );
};

export default Product;