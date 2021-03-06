import React, { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const data = fakeData.slice(0,10);
    const [products, setProducts] = useState(data);

    const [cart, setCart] = useState([]);

    const handleAddButton = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd => product.key === pd.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product showButton={true} handleAddButton={handleAddButton} product={product} key={product.key}></Product>)
                }
            </div>
            <div className="cart-details">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;