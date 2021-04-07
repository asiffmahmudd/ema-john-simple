import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    
    const handleProduct = () => {
        fetch('http://localhost:4000/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(fakeData)
        })
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-12 text-center">
                    <button className="btn btn-primary" onClick={handleProduct}>Add Product</button>
                </div>
            </div>
        </div>
    );
};

export default Inventory;