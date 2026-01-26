import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/authSlice";
import "./card.css";

function Card({ product }: { product: any }) {
  const dispatch = useDispatch();

  const imageUrl = Array.isArray(product.photoUrl)
    ? product.photoUrl[0]
    : product.photoUrl;

  return (
    <div className="card">
      <img src={imageUrl} alt={product.productName} style={{ width: "100%" }} />

      <div className="container">
        <h4><b>{product.productName}</b></h4>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
      </div>

      <div className="button-group">
        <button className="addCartButton" onClick={() => dispatch(addToCart(product))}>
          Add to cart
        </button>
        <button className="viewButton">View</button>
      </div>
    </div>
  );
}

export default Card;
