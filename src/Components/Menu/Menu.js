import React, { useState, useEffect } from 'react';
import data from '../../Data'
import Food from '../Food/Food';
import './Menu.css'
import { getDatabaseCart } from '../../utilities/databaseManager';

const Menu = () => {

    const [cart, setCart]=useState([]);
    const [products, setProducts]=useState([])

    useEffect(()=>{
        fetch('https://morning-sands-78552.herokuapp.com/fooditems')
        .then(res=> res.json())
        .then(data=> {
            setProducts(data);
            console.log(products)
        })
    })

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys= Object.keys(savedCart)
        console.log(products)
        
        if(products.length){
            const cartProducts= productKeys.map( key=> {
                const product= products.find( pd=> pd.key===key);
                
                product.quantity= savedCart[key]
                return product
            })
            setCart(cartProducts)
            console.log(cartProducts)
        }
        
    },[products])

    return (
        <div className="container">
            <div className="row">
                {
                    products.map(food=> <div className="col-md-4"><Food key={food.key} food={food}></Food></div>)
                }
            </div>

            <div className="row justify-content-center">
                <button className= {cart.length==0?"btn btn-light":"btn btn-danger"}>Proceed Checkout</button>
                {/* {
                    cart.length && <a href="/review"></a>
                } */}
            </div>
        </div>
    );
};

export default Menu;