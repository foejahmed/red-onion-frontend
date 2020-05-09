import React from 'react';
import data from '../../Data';

const Inventory = () => {

    const handleAddProduct=()=>{
        console.log(data.length)
        fetch('https://morning-sands-78552.herokuapp.com/addfood',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=> res.json())
        .then(data=>{
            console.log("post successful", data.length);
        })
    }
    return (
        <div>
            <h1>Add inventory to sell more.</h1>
            <button onClick={handleAddProduct}>Add Inventory</button>
        </div>
    );
};

export default Inventory;