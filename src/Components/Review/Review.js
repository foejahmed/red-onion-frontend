import React, { useEffect, useState } from 'react';
import data from '../../Data';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Food from '../Food/Food';
import "./Review.css"
import ReviewItem from '../ReviewItem/ReviewItem';
import { Link } from 'react-router-dom';
import { auth } from 'firebase';
import Auth from '../Login/useAuth';

const Review = () => {

    const auth= Auth()
    const [cart, setCart]=useState([]);

    const removeProduct=(key)=>{
        console.log("remove clicked", key)
        const newCart= cart.filter(food=> food.key!==key)
        removeFromDatabaseCart(key)
        setCart(newCart)
    }

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys= Object.keys(savedCart)

        console.log(productKeys)

        fetch("https://morning-sands-78552.herokuapp.com/getFoodsByKey",{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)

        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            const cartProducts= productKeys.map( key=> {
                const product= data.find( pd=> pd.key===key);
                product.quantity= savedCart[key]
                return product
            })
            setCart(cartProducts)
            // console.log(cartProducts)
        })
    },[])

    if(cart.length){
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <Link to="/cart">

                        {
                            auth.user? <button className='btn btn-danger'>Proceed To Cart</button>
                            :<button className='btn btn-danger'>Sign in/Log in To Proceed</button>
                        }
                    </Link>
                    
                </div>
                <div className='row food-items'>
                    {
                        cart.map(food=> <div className="col-md-4"><ReviewItem removeProduct={removeProduct} key={food.key} food={food}></ReviewItem></div>)
                    }
                </div>
    
            </div>
        );
    }

    else{
        return(
        <div>
            <h1 className="text-center">Please, order something</h1>
        </div>
        )
        
    }
    
};

export default Review;