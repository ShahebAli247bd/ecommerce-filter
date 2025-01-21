import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai'
import './Nav.css'
import AddToCart from './AddToCart';


const Nav = ({ inputHandler, addToCartData }) => {
    const [showCart, setShowCart] = useState(false)

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
            {/*<div className="cartContainer">
                <CgClose className="close" onClick={handleClose} />
                {showCart &&
                    addToCartData.map((book) => (
                        <AddToCart
                            book={book}
                            handleClose={() => setShowCart(false)}
                        />
                    ))}
            </div>*/}
            {showCart && (
                <AddToCart
                    addToCartData={addToCartData}
                    handleClose={() => setShowCart(false)}
                />
            )}
        </header>
    );
};

export default Nav
