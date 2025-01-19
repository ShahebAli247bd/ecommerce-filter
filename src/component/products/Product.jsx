import React, { useEffect, useState } from "react";
import "./Product.css";
import { SiNetdata } from "react-icons/si";
import FetchApi from "../../utiles/FetchApi";
import Card from "./Card";
import NotFound from "../notfound/NotFound";

const Product = ({ inputTerms }) => {
    console.log(inputTerms);
    String.prototype.toSentenceCase = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    };
    
    const [fetchData, setFetchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        const response = await FetchApi(import.meta.env.VITE_PRODUCT_API);
        setFetchData(response);
        setIsLoading(false);
    };

    //Call data in refresh
    useEffect(() => {
        setIsLoading(true);
        getData();
    }, []);

//Filtered Data using input Terms 
    const filteredData =
        fetchData?.length >= 0
            ? fetchData.filter(
                  (data) =>
                      data.volumeInfo.title
                          .toLowerCase()
                          .includes(inputTerms?.toLowerCase()) ||
                      inputTerms == "All"? data:"" ||
                          data.volumeInfo.printType.toLowerCase()
                        .includes(inputTerms.toLowerCase())
              
              )
            : fetchData;

    return (
        <div className="product-container">
            <h1>
                Total:{" "}
                <span>{filteredData.length ? filteredData.length : 0} </span>
                {inputTerms ? inputTerms.toSentenceCase() : "Items"}
            </h1>
            <div className="product">
                {isLoading ? <span className="loading">Loading...</span> : ""}
                {filteredData.length >= 0 &&
                    filteredData.map((book) => <Card book={book} />)}
            </div>
            {!filteredData.length && !isLoading && (
                <NotFound inputTerms={inputTerms} />
            )}
        </div>
    );
};

export default Product;
