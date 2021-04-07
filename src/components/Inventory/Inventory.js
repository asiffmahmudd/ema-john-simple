import React from 'react';

const Inventory = () => {
    
    const handleProduct = () => {
        
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-12 text-center">
                    <div className="col-md-6 mx-auto">
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" id="name" placeholder="Enter product name"/>
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" id="price" placeholder="Price"/>
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" id="quantity" placeholder="Quantity"/>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Add product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventory;