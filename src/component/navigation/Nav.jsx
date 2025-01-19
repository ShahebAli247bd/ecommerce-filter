import React from 'react'
import logo from '../../assets/logo.png'
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai'
import './Nav.css'


const Nav = ({ inputHandler }) => {
    return (
        <header>
            <nav>
                <div className="logo">
                    <img src={logo} width={80} />
                </div>
                <div className="inputField">
                    <input
                        placeholder='Search book...'
                        type="text"
                        name="input"
                        onChange={(e) => inputHandler(e.target.value)}
                    />
                </div>
                <div className="headerIcon">
                    <AiOutlineUserAdd className="icon" />
                    <AiOutlineShoppingCart className="icon" />
                </div>
            </nav>
        </header>
    );
};

export default Nav
