import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai'
import './Nav.css'
import AddToCart from './AddToCart';


const Nav = ({ inputHandler, addToCartData, handleDelete }) => {
    const [showCart, setShowCart] = useState(false);

    return (
        <header>
            <nav>
                <div className="logo">
                    <img src={logo} width={80} />
                </div>
                <div className="inputField">
                    <input
                        placeholder="Search book..."
                        type="text"
                        name="input"
                        onChange={(e) => inputHandler(e.target.value)}
                    />
                </div>
                <div className="headerIcon">
                    <AiOutlineUserAdd className="icon" />
                    <span
                        className="addToCartIconContainer"
                        onClick={() => setShowCart(true)}
                    >
                        <AiOutlineShoppingCart className="icon" />
                        <span className="items">{addToCartData.length}</span>
                    </span>
                </div>
            </nav>

            {showCart && (
                <AddToCart
                    addToCartData={addToCartData}
                    handleClose={() => setShowCart(false)}
                    handleDelete={handleDelete}
                />
            )}
        </header>
    );
};

export default Nav
