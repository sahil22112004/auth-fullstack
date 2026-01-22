import { useState } from "react";
import "./card.css"

function Card({product}:{product:any}) {
    const [cartItem,setCartItem]=useState([])


  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} style={{ width: '100%' }} />
      <div className="container">
        <h4><b>{product.title}</b></h4>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
      </div>
       <div className="button-group">
      <button className="addCartButton">Add to cart</button>
      <button className="viewButton">View</button>
      </div>
    </div>
  );
}

export default Card