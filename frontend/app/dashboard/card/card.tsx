import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/authSlice";
import "./card.css";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/app/service/productApi";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToWishlist, fetchonewishlist } from "../../service/wishlist";


 function Card({ product }: { product: any }) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser)
  const router =  useRouter()

  const wishlistdata =  fetchonewishlist(product.id)
  console.log("data fro ",wishlistdata)

  const handlewishList = async (ProductId:any,userId:any) =>{
    const wishlist = {
      productId:ProductId,
      userId:userId
    }


    const res = addToWishlist(wishlist)
  }


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

      {(user?.role=='seller')
      ?(<div className="button-group">
         <button className="addCartButton" onClick={() =>router.push(`/dashboard/editProduct/${product.id}`)}>
          Edit
        </button>
        <button className="viewButton" onClick={()=>deleteProduct(product.id)}>Delete</button>
      </div>):(
        <div className="button-group">
        <button className="addCartButton" onClick={() => dispatch(addToCart(product))}>
          Add To Cart
        </button>
        <button className="viewButton">View</button>
        <button onClick={()=>handlewishList(product.id,user?.id)}><FavoriteBorderIcon/></button>
        
      </div>
      )}

      {/* <div className="button-group">
        <button className="addCartButton" onClick={() => dispatch(addToCart(product))}>
          Add to cart
        </button>
        <button className="viewButton">View</button>
      </div> */}
    </div>
  );
}

export default Card;
