import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../serverUrl';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = ({search}) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.getElementById("spinner").style.display = "block";
        setLoading(true);
        let url = "";
        if(search === ""){
            url = serverUrl+'/products';
        }
        else{
            url = serverUrl+"/products/"+search;
        }
        fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById("spinner").style.display = "none";
            setProducts(data);
            setLoading(false);
        })
    }, [search])

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch(serverUrl+'/productsByKeys', {
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
            <div className="row">
                <div className="product-container col-md-9" style={{paddingRight:'0px'}}>
                    <div className="text-center mt-3 mr-5" id="spinner" style={{display:'none'}}> 
                        <div className="spinner-border text-secondary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    {
                        !loading && products.length === 0 &&
                        <div className="text-center mt-3 mr-5"> 
                            <h1>No Products found</h1>
                        </div>
                    }
                    {
                        products.map(product => <Product showButton={true} handleAddButton={handleAddButton} product={product} key={product.key}></Product>)
                    }
                </div>
                <div className="cart-details col-md-3">
                    <Cart cart={cart}>
                        <Link to={"/review/"}>
                            <div className="review-btn">
                                <button className="btn btn-warning center">Review Your Order</button>
                            </div>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;