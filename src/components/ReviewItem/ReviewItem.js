import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItem = (props) => {
    const {name, img, price,key,seller, quantity, star, starCount} = props.product;

    
    return (
        <div className="row single-product">
            <div className="col-md-4">
                <div className="product-img">
                    <img src={img} alt="product image"/>
                </div>
            </div>
            <div className="col-md-8">
                <div className="product-details">
                    <a href={"/product/"+key}><h4>{name}</h4></a>
                    <p>Price: {price}</p>
                    <p>By {seller}</p>
                    <p>Quantity: {quantity}</p>
                    <button onClick={() => props.removeItem(key)} className="btn btn-warning">Remove Item</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;