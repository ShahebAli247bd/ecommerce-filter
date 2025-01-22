import React, { useState } from "react";
import Button from "../minicomp/Button";
import "./AddToCart.css";
import { CgClose } from "react-icons/cg";
import NotFound from "../notfound/NotFound";

const AddToCart = ({ addToCartData, handleClose, handleDelete }) => {
    const [counts, setCounts] = useState({}); // Initialize as an object
    // const [cartData, setCartData] = useState(addToCartData)
    console.log(counts);
    const handleIncrement = (id) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 1) + 1, // Increment count for the given product
        }));
    };

    const handleDecrement = (id) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: prevCounts[id] > 1 ? prevCounts[id] - 1 : 1, // Ensure count doesn't go below 1
        }));
    };

    return (
        <>
            <div className="cartContainer">
                <CgClose className="close" onClick={handleClose} />
                {addToCartData.length > 0 ? (
                    addToCartData.map((book) => (
                        <div className="cartContent" key={book.id}>
                            <div className="img">
                                <img
                                    width={30}
                                    src={`${book.volumeInfo.imageLinks.thumbnail}`}
                                />
                            </div>

                            <div className="title">
                                {book.volumeInfo.title.slice(0, 30)}...
                            </div>
                            <div className="price">
                                ${(counts[book.id] || 1) * 100}
                            </div>

                            <div className="counter">
                                <button
                                    onClick={() => handleIncrement(book.id)}
                                >
                                    +
                                </button>
                                <span>{counts[book.id]||1}</span>
                                <button
                                    onClick={() => handleDecrement(book.id)}
                                >
                                    -
                                </button>
                            </div>
                            <CgClose
                                className="close"
                                onClick={() => handleDelete(book.id)}
                            />
                        </div>
                    ))
                ) : (
                    <NotFound />
                )}
            </div>
        </>
    );
};

export default AddToCart;
