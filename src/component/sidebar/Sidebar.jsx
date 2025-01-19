import React, { useState } from 'react'
import './Sidebar.css'
import InputRadio from './../minicomp/InputRadio';

const Sidebar = ({ inputHandler }) => {
    
    const radioHandler = (value) => {
     inputHandler(value)
    };

 
    return (
        <div className="sidebar">
            <h2>Category</h2>
            <InputRadio
                value="All"
                name="category"
                id="all"
                radioHandler={radioHandler}
            />
            <InputRadio
                value="BOOK"
                name="category"
                id="book"
                radioHandler={radioHandler}
            />
            <InputRadio
                value="MAGAZINE"
                name="category"
                id="magazine"
                radioHandler={radioHandler}
            />
        </div>
    );
};

export default Sidebar
