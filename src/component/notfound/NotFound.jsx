import React from 'react'
import './NotFound.css'

const NotFound = ({inputTerms}) => {
  return (
      <div className="centerIt">
          <h2>
          
              {inputTerms? inputTerms: "Items "}
          </h2>

          <h1> Not Found</h1>
      </div>
  );
}

export default NotFound
