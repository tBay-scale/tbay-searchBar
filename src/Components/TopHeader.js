import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const TopHeader = (props) => {
    return (
        <div className="top-header">
            <p>Hi sign-in or register</p>
            <p>Daily Deals</p>
            <p>Brand Outlet</p>
            <p>Help & Contact</p>
            <p>Sell</p>
            <p>My Tbay</p>
            <FontAwesomeIcon className="top-header-icons" icon={faBell} />
            <FontAwesomeIcon className="top-header-icons" icon={faShoppingCart}/>
        </div>
    )
}


export default TopHeader