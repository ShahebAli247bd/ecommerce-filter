import React, { useEffect, useState } from "react";
import "./Product.css";
import { SiNetdata } from "react-icons/si";
import FetchApi from "../../utiles/FetchApi";
import Card from "./Card";
import NotFound from "../notfound/NotFound";

const Product = ({ inputTerms, HandleAddToCardData }) => {
    // console.log(inputTerms);
    String.prototype.toSentenceCase = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    };

    const [fetchData, setFetchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isItemExistInCart, setIsItemExistInCart] = useState(false);

    //Call data in refresh
    useEffect(() => {
        setIsLoading(true);
        getData();
    }, []);

    const cache = {
        data: localStorage.getItem("data")
            ? JSON.parse(localStorage.getItem("data"))
            : [],
        lastFetched: null,
    };

    //add To cart Object create and save to localstorage
    const handlerBuyNow = (id) => {
        const selectedProd = fetchData.filter((prod) =>
            prod.id.toLowerCase().includes(id.toLowerCase())
        );

        // Get the current cart data from localStorage
        const savedProduct = localStorage.getItem("addToCartData");
        const parsedSavedProduct = savedProduct ? JSON.parse(savedProduct) : [];

        const isItemInCart = parsedSavedProduct.some((book) => {
            (book) =>
                book.id.toLowerCase() === selectedProd[0]?.id.toLowerCase();
        });

        if (isItemInCart) {
            console.log("Item already exists in the cart");
            setIsItemExistInCart(true); // Update the state to reflect the item exists
            return;
        }

        
        const updatedCartData = [...parsedSavedProduct, ...selectedProd];

        
        localStorage.setItem("addToCartData", JSON.stringify(updatedCartData)); // Save as a JSON string

        console.log("Item added to the cart");
            
        setIsItemExistInCart(false); // Reset the state for the next addition
        HandleAddToCardData(updatedCartData);
    };

    const getData = async () => {
        try {
            //Cacheing Machanisum
            if (cache.data.length > 0) {
                console.log("Using cached data");
                console.log(cache.data);
                setFetchData(cache.data);

                setIsLoading(false);
                console.log(cache.data, "i am cache Data from cache block");
                return;
            }

            console.log("Fetching data from API");

            const response =
                cache.data.length <= 0 &&
                (await FetchApi(import.meta.env.VITE_PRODUCT_API));

            localStorage.setItem("data", JSON.stringify(response));

            // cache.data = response;
            cache.lastFetched = new Date();
            setFetchData(response);
            console.log(cache.data, "i am cache Data from api block");
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    //Filtered Data using input Terms
    const filteredData =
        fetchData?.length >= 0
            ? fetchData.filter((data) =>
                  data.volumeInfo.title
                      .toLowerCase()
                      .includes(inputTerms?.toLowerCase()) ||
                  inputTerms == "All"
                      ? data
                      : "" ||
                        data.volumeInfo.printType
                            .toLowerCase()
                            .includes(inputTerms.toLowerCase())
              )
            : fetchData;

    return (
        <div className="product-container">
            <h1>
                Total:
                <span>{filteredData.length ? filteredData.length : 0} </span>
                {inputTerms ? inputTerms.toSentenceCase() : "Items"}
            </h1>
            <div className="product">
                {isLoading ? <span className="loading">Loading...</span> : ""}
                {filteredData.length >= 0 &&
                    filteredData.map((book) => (
                        <Card book={book} handlerBuyNow={handlerBuyNow} />
                    ))}
            </div>
            {!filteredData.length <= 0 && !isLoading && (
                <NotFound inputTerms={inputTerms} />
            )}
        </div>
    );
};

export default Product;
