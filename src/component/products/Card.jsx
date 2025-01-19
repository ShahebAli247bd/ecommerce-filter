import React from 'react'
import Button from '../minicomp/Button';

const Card = ({ book }) => {
    const handlerBuyNow = (e) => {
        console.log(e,'clicked buy now')
    }
  return (
      <div className="card">
          <div className="img">
              <img src={`${book.volumeInfo.imageLinks.thumbnail}`} />
          </div>

          <div className="title">{book.volumeInfo.title}</div>
          <div className="price">Price: ${Math.floor(Math.random() * 200)}</div>
          <div className="publishedDate">
              Puhlish Data: {book.volumeInfo.publishedDate}
          </div>
          <div className="pageCount">
              Total Page: {book.volumeInfo.pageCount}
          </div>
          <div className="canonicalVolumeLink">
              <a
                  href={`${book.volumeInfo.canonicalVolumeLink}`}
                  target="_blank"
              >
                  Volume Link
              </a>
          </div>
          <Button handlerBuyNow={handlerBuyNow} id={book.id}>
              Buy Now
          </Button>
      </div>
  );
}

export default Card;
