import React from 'react';
import './Food.css'
import { Link } from 'react-router-dom';

const Food = (props) => {

    const {name, image, short_description, price ,key}=props.food
    return (
        <div className='container'>
            <Link to={"/food/"+key}>
                <div className='card text-center menu-card border-0'>
                    <div className='card-body info'>
                        <img src={image} className="card-img-top rounded mx-auto d-block" alt="..."/>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{short_description}</p>
                        <h4 className="card-text">${price}</h4>
                    </div>
                </div>
            </Link>
            
        </div>
    );
};

export default Food;