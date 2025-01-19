import React, { useEffect, useState } from "react";
import "./Product.css";
import { SiNetdata } from "react-icons/si";
import FetchApi from "../../utiles/FetchApi";
import Card from "./Card";
import NotFound from "../notfound/NotFound";

const Product = ({ inputTerms }) => {
    // console.log(inputTerms);
    String.prototype.toSentenceCase = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
    };

    const [fetchData, setFetchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const cache = {
        data: localStorage.getItem("data")
            ? JSON.parse(localStorage.getItem("data"))
            : [],
        lastFetched: null,
    };

    const getData = async () => {
        try {
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

    //Call data in refresh
    useEffect(() => {
        setIsLoading(true);
        getData();
    }, []);

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
                    filteredData.map((book) => <Card book={book} />)}
            </div>
            {!filteredData.length && !isLoading && (
                <NotFound inputTerms={inputTerms} />
            )}
        </div>
    );
};

export default Product;
