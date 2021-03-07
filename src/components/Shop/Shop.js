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
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            product.quantity = product.quantity + 1;
            count = product.quantity;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, product];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
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