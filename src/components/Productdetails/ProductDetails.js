import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [singleProduct, setSingleProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:4000/product/${productKey}`)
        .then(res => res.json())
        .then(data => setSingleProduct(data))
    }, [])

    return (
        <div className="">
            <Product product={singleProduct} showButton={false}></Product>
        </div>
    );
};

export default ProductDetails;