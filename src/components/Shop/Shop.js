import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const data = fakeData;
    const [products, setProducts] = useState(data);

    const [cart, setCart] = useState([]);


    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const existingKeys = Object.keys(savedCart);
        
        const newCart = existingKeys.map(key => {
            const singleProduct = products.find(product => product.key === key);
            singleProduct.quantity = savedCart[key];
            return singleProduct;
        });
        setCart(newCart);
    },[]);

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
                <Cart cart={cart}>
                    <Link to={"/review/"}>
                        <div className="review-btn">
                            <button className="btn btn-warning center">Review Your Order</button>
                        </div>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;