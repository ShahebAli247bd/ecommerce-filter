import Nav from "./component/navigation/Nav";
import Product from "./component/products/Product";
import Sidebar from "./component/sidebar/Sidebar";
import './app.css'
import { useEffect, useState } from "preact/hooks";
 
export function App() {
    const [input, setInput] = useState("")
    const [addToCartData, setAddToCartData] = useState(() => {
        const savedData = localStorage.getItem("addToCartData");
        return savedData ? JSON?.parse(savedData) : []; // Parse JSON string to object/array
    });

    const inputHandler = (inputData) => {
        setInput(inputData);
    }
    const HandleAddToCardData = (data) => {
          setAddToCartData(data);       
    };
// console.log(addToCartData, "app jsx");
 
    const handleDelete = (id) => {
        const deleteData = addToCartData.filter((book) => book.id != id);

        setAddToCartData(deleteData);
        localStorage.setItem("addToCartData", JSON.stringify(deleteData)); // Save as a JSON string
    };
    
  return (
      <>
          <Nav
              inputHandler={inputHandler}
              handleDelete={handleDelete}
              addToCartData={addToCartData}
          />
          <div className="flex mt-6">
              <Sidebar inputHandler={inputHandler} />
              <Product
                  inputTerms={input}
                  HandleAddToCardData={HandleAddToCardData}
              />
          </div>
      </>
  );
}
