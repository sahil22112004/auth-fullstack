"use client";

import { useEffect, useState } from "react";
import "./dashboard.css";
import Card from "./card/card";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { loadProducts, loadsellerProducts, setSearch, setCategory } from "../redux/slices/productSlice";
import { useRouter } from "next/navigation";
import { logout } from "../redux/slices/authSlice";
import { fetchCategories } from "../service/productApi";
import { fetchImagesThunk } from "../redux/slices/advertisementSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();



  const { products, loading, hasMore, offset, productName, category } =
    useSelector((state: RootState) => state.product);

  const { images } = useSelector((state: RootState) => state.Advertisement);

  const [searchInput, setSearchInput] = useState(productName);

  const user = useSelector((state: RootState) => state.auth.currentUser);
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
    dispatch(fetchImagesThunk())
  }, []);


  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearch(searchInput));

      if (user?.role === "seller") {
        dispatch(loadsellerProducts({ id: user?.id ?? '', offset: 0, productName: searchInput, category }));
      } else {
        dispatch(loadProducts({ offset: 0, productName: searchInput, category }));
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput, category]);


  const handleCategory = (e: any) => {
    dispatch(setCategory(e.target.value));
    if (user?.role === "seller") {
      dispatch(loadsellerProducts({ id: user?.id ?? '', offset: 0, productName, category: e.target.value }));
    } else {
      dispatch(loadProducts({ offset: 0, productName, category: e.target.value }));
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      if (user?.role === "seller") {
        dispatch(loadsellerProducts({ id: user?.id ?? '', offset, productName, category }));
      } else {
        dispatch(loadProducts({ offset, productName, category }));
      }
    }
  };

  const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset, productName, category, loading, hasMore]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <>
      <header className="navbar">
        <h2 className="nav-logo">FlipKart</h2>

        <div className="nav-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="nav-search"
          />
          <select value={category} onChange={handleCategory} className="nav-select">
            <option value="">All Category</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="nav-right">
          {user?.role === "seller" ? (
            <>
              <button onClick={() => router.push("/dashboard/addform")}>Add Product</button>
              <button onClick={() => router.push("/dashboard/sellerorder")}>Orders</button>
            </>
          ) : (
            <>
              <button onClick={() => router.push("/dashboard/wishlist")}>WishList</button>
              <button onClick={() => router.push("/dashboard/cart")}>Cart</button>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      {user?.role !== "seller" && images?.length > 0 && (
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          showThumbs={false}
          useKeyboardArrows={true}
        >
          {images.map((img: any) => (
            <div key={img.id}>
              <div>
                <img
                  style={{
                    objectFit: "fill",
                    width: "95%",
                    height: "500px",
                    marginTop: "40px",
                  }}
                  src={img.url}
                  alt="carousel"
                />
              </div>
            </div>
          ))}
        </Carousel>
      )}

      <main>
        {products.length ? (
          products
            .filter((p: any) => (user?.role === "seller" ? true : !p.isBanned))
            .map((p: any) => <Card key={p.id} product={p} />)
        ) : (
          <p>No products found</p>
        )}
      </main>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      <footer className="footer">Ecommerce site</footer>
    </>
  );
}

export default Dashboard;
