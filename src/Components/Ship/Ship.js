import React from 'react';
import { useForm } from 'react-hook-form'
import './Ship.css'
import { useAuth } from '../Login/useAuth';
import { clearLocalShoppingCart, getDatabaseCart } from '../../utilities/databaseManager.js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';


const Ship = () => {
    const { register, handleSubmit, errors } = useForm()
    const [shipInfo, setShipInfo]= useState(null)
    const [orderId, setOrderId]= useState(null)

    const auth= useAuth();
    const stripePromise= loadStripe('pk_test_3VrOSPAtgrxjOqMdgNcKaC6G00yjZArwcs')
                                    
    
    const onSubmit = data => {
        setShipInfo(data)
    }

    const handlePlaceOrder=(payment)=>{
        //Raphael Changed This
        console.log(auth.user.email);
        const savedCart= getDatabaseCart()

        const orderDetails={ 
            email: auth.user.email, 
            cart: savedCart,
            shipment: shipInfo,
            payment: payment
        }
        fetch('https://morning-sands-78552.herokuapp.com/placeOrder',{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res=> res.json())
        .then(order=>{
            setOrderId(order._id)
            clearLocalShoppingCart()
        })
    }
    

    return (
        <div className="container">
            <div className="row">
                            {/* hide after address information fill up */}
                <div style={{display: shipInfo && 'none'}} className="col-md-6">

                    <h3>Shipment Information</h3>
                        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
                        
                        <input name="name" ref={register({ required: true })} placeholder="your name"/>
                        {
                            errors.name && <span className="error">Exact Address is required</span>
                        }

                        <input name="address" ref={register({ required: true })} placeholder="your exact address"/>
                        {
                            errors.address && <span className="error">Exact Address is required</span>
                        }
                        

                        <input name="phone" ref={register({ required: true })} placeholder="your phone"/>
                        {errors.phone && <span className="error">Phone is required</span>}

                        <textarea style={{resize:"none"}} rows="5" name="instruction" ref={register({ required: false })} placeholder="your instructions"/>
                        {errors.instruction && <span>This field is required</span>}
                        
                        <input type="submit" />
                    </form>

                </div>
                                     {/* shows after address information fill up */}
                <div style={{marginTop: '200px' , display: shipInfo ? 'block' : 'none' }} className="col-md-6">
                    <h3>Payment Information</h3>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
                    </Elements>

                    <br/>
                    {
                        orderId && <div>
                            <h3>Thank you for ordering</h3>
                    <p>Your order is :{orderId}</p>
                        </div>
                    }
                </div>
            </div>
        </div>

        
    )
};

export default Ship;