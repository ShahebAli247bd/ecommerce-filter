import React from 'react'
import './NotFound.css'

const NotFound = ({inputTerms}) => {
  return (
      <div className="centerIt">
          <h2>
          
              {inputTerms? inputTerms: "No Item "}
          </h2>

          <h1> Found</h1>
      </div>
  );
}

export default NotFound
