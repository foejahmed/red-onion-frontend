import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from '../../Data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Food_Detail.css"
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Food_Detail = () => {
    const {foodId}=useParams();

    const [food, setFood]= useState(null)

    useEffect(()=>{
        fetch('https://morning-sands-78552.herokuapp.com/fooditems/'+foodId)
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            setFood(data)
            
        })
    },[])


    let [count, setCount]=useState(1)
    const [cart, setCart]=useState([])
    
    // const food=data.find(item=> foodId===item.key)
    //console.log(food);

    useEffect(()=>{
        const savedCart=getDatabaseCart()
        const productKeys=Object.keys(savedCart);
        const previousCart= productKeys.map(existingKey=>{
            const product= data.find(pd=> pd.key===existingKey)
            product.quantity= savedCart[existingKey]
            count= product.quantity
            console.log(existingKey, savedCart[existingKey])
            return product;
        })
        setCart(previousCart);
    },[])

    const handlePlus=()=>{
        count=count+1;
        let newCount=count;
        setCount(newCount);
    }

    const handleMinus=()=>{

        if(count==0){
            setCount(0);
        }
        else{
            count=count-1;
            let newCount=count;
            setCount(newCount);
        }
    }

    const handleButton=()=>{
        const toBeAddedKey=food.key;
        const sameProduct= cart.find(pd=> pd.key === toBeAddedKey);

        // let count=1;
        let newCart;
        if(sameProduct){
            // count = sameProduct.quantity+1;
            sameProduct.quantity= count;
            const others= cart.filter(pd=> pd.key !== toBeAddedKey);
            newCart=[...others,sameProduct]
        }

        else{
            food.quantity=count;
            newCart=[...cart, food]
        }
        setCart(newCart);
        console.log(cart)
        addToDatabaseCart(food.key, count);
    }


    if(food){
        return (
        <div className="food-detail">
            <div className='container food-info'>
                <h4>{food.name}</h4>
                <p>{food.long_description}</p>
                <h4><span>${food.price}</span> 
                <span className="btn">
                    <span onClick={handleMinus}> - </span>
                    <span> {count} </span>
                    <span onClick={handlePlus}> + </span>
                </span>
            </h4>
                <button onClick={()=>handleButton()} className="btn btn-danger"><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Add to Cart</button>
            </div>
            
            <div className='container food-image'>
                <img src={food.image} alt="image"/>
            </div>

            
        </div>
    );
        }

        else{
            return(
                <div>
                    <h1>No data available</h1>
                </div>
            )
        }
};

export default Food_Detail;