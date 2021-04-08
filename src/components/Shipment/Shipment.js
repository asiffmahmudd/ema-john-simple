import React, { useContext } from 'react';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'
import { useHistory } from 'react-router';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = {user: loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};

        fetch('https://vast-lowlands-27498.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                processOrder();
                alert('your order placed successfully');
                history.push('/');
            }
        })
        
    }

    // console.log(watch("name")); // watch input value by passing the name of it
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-12 text-center">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input name="name" className="form-control" defaultValue={loggedInUser.displayName} {...register("name", { required: true })} placeholder="Your Name" />
                                {errors.name && <span className="error">Name is required</span>}
                            </div>
                            <div className="form-group">
                                <input name="email" type="email" className="form-control" defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email"/>
                                {errors.email && <span className="error">Email is required</span>}
                            </div>
                            <div className="form-group">
                                <input name="phone" type="number" className="form-control" {...register("phone", { required: true })}  placeholder="Your Phone Number"/>
                                {errors.phone && <span className="error">Phone Number is required</span>}
                            </div>
                            <div className="form-group">
                                <input name="address" className="form-control" {...register("address", { required: true })}  placeholder="Your Address" />
                                {errors.address && <span className="error">Address is required</span>}
                            </div>
                            <input type="submit" className="btn btn-primary w-100"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;