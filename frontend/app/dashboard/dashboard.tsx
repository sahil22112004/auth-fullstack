"use client";

import { useEffect } from "react";
import "./dashboard.css";
import Card from "./card/card";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { loadProducts, loadsellerProducts, setSearch, setCategory } from "../redux/slices/productSlice";
import { useRouter } from "next/navigation";
import { logout } from "../redux/slices/authSlice";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { products, loading, hasMore, offset, productName, category } =
    useSelector((state: RootState) => state.product);

  const user = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    if (user?.role === "seller") {
      dispatch(loadsellerProducts({ id: user?.id ?? '', offset: 0, productName: "", category: "" }))
    } else {
      dispatch(loadProducts({ offset: 0, productName: "", category: "" }))
    }
  }, [user]);

  const handleSearch = (e: any) => {
    dispatch(setSearch(e.target.value));
    if (user?.role === "seller") {
      dispatch(loadsellerProducts({ id: user?.id ?? '', offset: 0, productName: e.target.value, category }));
    } else {
      dispatch(loadProducts({ offset: 0, productName: e.target.value, category }));
    }
  };

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
            value={productName}
            onChange={handleSearch}
            className="nav-search"
          />
          <select value={category} onChange={handleCategory} className="nav-select">
            <option value="">All Categories</option>
            {/* Add dynamic categories if needed */}
          </select>
        </div>

        <div className="nav-right">
          {user?.role === "seller" ? (
            <>
              <button onClick={() => router.push("/components/addform")}>Add Product</button>
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
