import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const data = fakeData.slice(0,10);
    const [products, setProducts] = useState(data);
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product product={product} key={product.key}></Product>)
                }
            </div>
            <div className="cart-details">
                <h3>this is cart details</h3>
            </div>
        </div>
    );
};

export default Shop;