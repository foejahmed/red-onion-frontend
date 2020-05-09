import React, { useState, useEffect } from 'react';
import { getDatabaseCart} from '../../utilities/databaseManager';
import data from '../../Data';
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = () => {

    const [cart, setCart]=useState([])
    const [orderPlaced, setOrderPlaced]=useState(false)

    let cartProducts=null;
    let price=0;

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys= Object.keys(savedCart)
        cartProducts= productKeys.map( key=> {
            const product= data.find( pd=> pd.key===key);
            product.quantity= savedCart[key]
            return product
        })
        setCart(cartProducts)
        console.log(cartProducts.length)
    },[])

    const handlePlaceOrder=()=>{
        setCart([]);
        setOrderPlaced(true)
        window.location.pathname= '/ship'
        console.log("Order Completed");
    }

    for(let i=0; i < cart.length; i++){
        const product= cart[i];
        price= price + (product.quantity * product.price)
    }

    let shipping=0;
    if(price> 35){
        shipping=0;
    }

    else if(price> 15){
        shipping=4.99;
    }
    else if(price> 0){
        shipping=12.99;
    }

    const tax= (price*.1).toFixed(2);
    const grandTotal= (price+shipping+ Number(tax)).toFixed(2)

    const formatNumber=(num)=>{
        const precision= num.toFixed(2);
        return Number(precision);
    }

    // console.log(price);

    let thankYou;
    if(orderPlaced){
        thankYou= <h1>Thank you</h1>
    }
    return (
        <div className="container">

            <div className="cart-info">
                <h3>Items ordered: {cart.length}</h3>

                <h3>Product Price: ${formatNumber(price)}</h3>
                <h3>Tax: ${tax}</h3>
                <h3>Shipping: ${shipping}</h3>
                <h3>Total Price: ${grandTotal}</h3>

                <Link to="/cart">
                    <button onClick={()=> handlePlaceOrder()} className='btn btn-danger'>Place Order</button>
                </Link>
                {
                    thankYou
                }
                </div>

        </div>
    );
};

export default Cart;