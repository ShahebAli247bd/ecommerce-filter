import Nav from "./component/navigation/Nav";
import Product from "./component/products/Product";
import Sidebar from "./component/sidebar/Sidebar";
import './app.css'
import { useState } from "preact/hooks";
 
export function App() {
    const [input, setInput] = useState("")
    const inputHandler = (inputData) => {
        setInput(inputData);
    }
  return (
      <>
          <Nav inputHandler={inputHandler} />
          <div className="flex mt-6">
              <Sidebar inputHandler={inputHandler} />
              <Product inputTerms={input} />
          </div>
      </>
  );
}
