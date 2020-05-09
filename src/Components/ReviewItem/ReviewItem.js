import React from 'react';


const ReviewItem = (props) => {

    const {name, image, short_description, price ,key, quantity}=props.food
    return (
        <div className='container'>
            
                <div className='card text-center menu-card border-0'>
                    <div className='card-body info'>
                        <img src={image} className="card-img-top rounded mx-auto d-block" alt="..."/>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{short_description}</p>
                        <h4 className="card-text">${price}</h4>
                        <p>Ordered Amount: {quantity}</p>
                        <button className='btn btn-danger' onClick={()=> props.removeProduct(key)}>Remove Item</button>
                    </div>
                </div>
            
            
        </div>
    );
};

export default ReviewItem;