import React, { useState, useEffect } from 'react';
import './Header.css';
import logo2 from "../../resources/logo2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import data from '../../Data';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { useAuth } from '../Login/useAuth';

const Header = () => {

    const [cart, setCart]= useState([]);

    const auth= useAuth();
    console.log(auth.user)

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys= Object.keys(savedCart)
        const cartProducts= productKeys.map( key=> {
            const product= data.find( pd=> pd.key===key);
            product.quantity = savedCart[key];
            return product
        })
        setCart(cartProducts)
        console.log(cartProducts)
    },[])
    return (
        <div className="header">
            <nav className="bg-light fixed-top">
                <img src={logo2}/>
                
                <div className="links">
                    <a href="/review">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {cart.length!==0? cart.length: undefined}
                    </a>
                    {
                        auth.user
                        ?<a href='/login'>Log out ({auth.user.name})</a>
                        :<a href="/login">Log in</a>
                    }
                </div>
            </nav>
        </div>
    );
};

export default Header;