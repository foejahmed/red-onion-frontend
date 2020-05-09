import React from 'react';
import { Link } from 'react-router-dom';

const CategoryHeader = () => {
    return (
        <div>
            <div>
            <nav className="nav justify-content-center">
                <Link to="/">See All</Link>
                <Link to="/breakfast">Breakfast</Link>
                <Link to="/lunch">Lunch</Link>
                <Link to="/dinner">Dinner</Link>
            </nav>
            </div>
        </div>
    );
};

export default CategoryHeader;