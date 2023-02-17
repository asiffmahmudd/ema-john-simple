import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../serverUrl';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [singleProduct, setSingleProduct] = useState({});

    useEffect(() => {
        fetch(serverUrl+`/product/${productKey}`)
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