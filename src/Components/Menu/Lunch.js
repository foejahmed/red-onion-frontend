import React, { useState, useEffect } from 'react';
import data from '../../Data'
import Food from '../Food/Food';
import './Menu.css'
import { getDatabaseCart } from '../../utilities/databaseManager';
import lunch from '../../Data/lunch';


const Lunch = () => {
    const [cart, setCart]=useState([]);

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys= Object.keys(savedCart)
        const cartProducts= productKeys.map( key=> {
            const product= data.find( pd=> pd.key===key);
            product.quantity= savedCart[key]
            return product
        })
        setCart(cartProducts)
        console.log(cartProducts)
    },[])

    return (
        <div className="container">
            <div className="row">
                {
                    lunch.map(food=> <div className="col-md-4"><Food key={food.key} food={food}></Food></div>)
                }
            </div>

            <div className="row justify-content-center">
                <button className= {cart.length==0?"btn btn-light":"btn btn-danger"}>Proceed Checkout</button>
                {/* <p>cart length:{cart.length}</p> */}
            </div>
        </div>
    );
};

export default Lunch;