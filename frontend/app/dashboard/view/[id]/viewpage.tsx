"use client";

import { useEffect, useState } from "react";
import { getProductById } from "../../../service/productApi";
import "./viewpage.css";
import { useRouter } from "next/navigation";

export default function ViewProduct({ id }:any) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductById(String(id));
      setProduct(data);
    }
    loadProduct();
  }, [id]);

  if (!product)
    return <h3 className="loading-text">Loading product...</h3>;

  const images = product?.photoUrl || [];
  const totalImages = images.length;

  const handlePrev = () => {
    currentIndex > 0 && setCurrentIndex(currentIndex - 1);}
  const handleNext = () => {
    currentIndex < totalImages - 1 && setCurrentIndex(currentIndex + 1);
}
  return (
    <>
      <header className="view-header">
        <button onClick={() => router.push("/dashboard")} className="home-btn">
          Home
        </button>
        
      </header>

      <div className="view-container">
        <div className="image-section">
          <img src={images[currentIndex]} alt="product" className="main-image" />

          {totalImages > 1 && (
            <>
              <button
                className="nav-btn left"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                &#60;
              </button>

              <button
                className="nav-btn right"
                onClick={handleNext}
                disabled={currentIndex === totalImages - 1}
              >
                &#62;
              </button>
            </>
          )}
        </div>

        {/* DETAILS SECTION */}
        <div className="details-section">
          <h2>{product.productName}</h2>
          <p className="description">{product.description}</p>
          <h3 className="price">₹{product.price}</h3>
          <h3 className="rating">Rating : {product.rating}</h3>

          {/* <div className="meta">
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Category ID:</strong> {product.categoryId}</p>
            <p><strong>Seller ID:</strong> {product.userId}</p>
          </div> */}
        </div>
      </div>
    </>
  );
}
