import React from "react";

const InputRadio = ({ id, name, value, radioHandler }) => {
    return (
        <div>
            <input
                id={id}
                type="radio"
                name={name}
                value={value}
                onClick={(e)=>radioHandler(e.target.value)}
            />
            &nbsp; <label htmlFor={id}>{value}</label>
        </div>
    );
};

export default InputRadio;
