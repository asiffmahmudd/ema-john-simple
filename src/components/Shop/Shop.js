import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = ({search}) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    console.log(search);

    useEffect(() => {
        document.getElementById("spinner").style.display = "block";
        let url = "";
        if(search === ""){
            url = 'https://vast-lowlands-27498.herokuapp.com/products';
        }
        else{
            url = "https://vast-lowlands-27498.herokuapp.com/products/"+search;
        }
        fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById("spinner").style.display = "none";
            setProducts(data);
        })
    }, [search])

    useEffect(() =>{
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
        
        // if(products.length){
        //     const newCart = productKeys.map(key => {
        //         const singleProduct = products.find(product => product.key === key);
        //         singleProduct.quantity = savedCart[key];
        //         return singleProduct;
        //     });
        //     setCart(newCart);
        // }
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
            <div className="product-container" >
                <div className="text-center mt-3 mr-5" id="spinner" style={{display:'none'}}> 
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
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