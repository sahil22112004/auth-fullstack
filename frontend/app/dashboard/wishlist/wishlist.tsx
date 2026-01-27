"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import "./wishlist.css";
import { useSnackbar } from "notistack";
import { fetchwishlist } from "../../service/wishlist";


export default function wishlistpage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [wishlistdata,setWishlistdata] = useState<any[]>([])

  const user = useSelector((state: RootState) => state.auth.currentUser);
  const fetchwishlistdata = async (id:any)=>{
    const wishlist :any = await fetchwishlist(user?.id)||[]
    console.log('data data',wishlist)
    setWishlistdata(wishlist)
  }
  useEffect( ()=>{
    fetchwishlistdata(user?.id)
},[])
  console.log("data",wishlistdata)
  console.log()
  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <button onClick={() => router.push("/dashboard")}>Home</button>
        <h2>Your WishList</h2>
      </div>

      {wishlistdata.length !== 0 ? (
          <div className="cart-container">
            <div className="cart-items">

              {wishlistdata?.map((item: any) => {
                const img = Array.isArray(item.product.photoUrl) ? item.product.photoUrl[0] : item.product.photoUrl;

                  return <div className="cart-item" key={item.id}>
                    <img src={img} alt={item.productName} className="cart-img" />

                    <div className="cart-info">
                      <h3>{item.product.productName}</h3>
                      <p>{item.product.description}</p>
                      <p className="cart-price">₹{item.product.price}</p>
                    </div>
                  </div>
                
              })}
            </div>


        </div>
      ) : (
        <div className="cart-empty">
          <h2>Your wishlist is Empty</h2>
        </div>
      )}
    </div>
  );
}
