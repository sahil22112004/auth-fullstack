"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import "./card.css";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  addToWishlist,
  removeFromWishlist,
  fetchwishlist
} from "../../service/wishlist";

function Card({ product }: { product: any }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.currentUser);

  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    if (user?.id) loadWishlist();
  }, [user]);

  const loadWishlist = async () => {
    try {
      const data = await fetchwishlist(user?.id);
      const exists = data.some((item: any) => item.productId === product.id);
      setInWishlist(exists);
    } catch (err) {
      console.log("Error checking wishlist");
    }
  };

  const toggleWishlist = async () => {
    if (!user) return alert("Please login first!");

    if (inWishlist) {
      await removeFromWishlist(user.id, product.id);
      setInWishlist(false);
    } else {
      await addToWishlist({ userId: user.id, productId: product.id });
      setInWishlist(true);
    }
  };

  const imageUrl = Array.isArray(product.photoUrl)
    ? product.photoUrl[0]
    : product.photoUrl;

  const isOutOfStock = Number(product.stock) <= 0;

  if (user?.role !== "seller" && product.isBanned) {
    return null;
  }

  return (
    <div className="card">

      <img src={imageUrl} alt={product.productName} className="card-img" />

      <div className="container">
        <h4><b>{product.productName}</b></h4>
        <p>{product.description}</p>
        <h2>₹{product.price}</h2>
        <p style={{ fontSize: "12px", color: "gray" }}>Stock: {product.stock}</p>
      </div>

      {user?.role === "seller" ? (
        product.isBanned ? (
          <p className="banned-text">Your product is banned. Contact admin.</p>
        ) : (
          <div className="button-group">
            <button
              className="addCartButton"
              onClick={() => router.push(`/dashboard/editProduct/${product.id}`)}
            >
              Edit
            </button>
            <button className="viewButton">Delete</button>
          </div>
        )
      ) : (
        <div className="button-group">
          {isOutOfStock ? (
            <button className="outStockButton" disabled>
              Out of Stock
            </button>
          ) : (
            <button className="addCartButton" onClick={() => dispatch(addToCart(product))}>
              Add To Cart
            </button>
          )}

          <button
            className="viewButton"
            onClick={() => router.push(`/dashboard/view/${product.id}`)}
          >
            View
          </button>

          <button className="wishlist-button" onClick={toggleWishlist}>
            {inWishlist ? (
              <FavoriteIcon style={{ color: "black" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
        </div>
      )}

    </div>
  );
}

export default Card;
