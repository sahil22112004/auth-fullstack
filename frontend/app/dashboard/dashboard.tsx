"use client"
import { useEffect } from "react"
import "./dashboard.css"
import Card from "./card/card"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../redux/store"
import {
  loadProducts,
  setSearch,
  setCategory
} from "../redux/slices/productSlice"
import { enqueueSnackbar } from "notistack"

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()

  // Getting state from Redux
  const {
    products, loading, hasMore,
    offset, productName, category
  } = useSelector((state: RootState) => state.product)

  // Load initial products
  useEffect(() => {
    dispatch(loadProducts({ offset: 0, productName: "", category: "" }))
  }, [])

  // Search Handler
  function handleSearch(e: any) {
    const val = e.target.value
    dispatch(setSearch(val))
    dispatch(loadProducts({ offset: 0, productName: val, category }))
  }

  // Category Select Handler
  function handleCategorySelect(e: any) {
    const cat = e.target.value
    dispatch(setCategory(cat))
    dispatch(loadProducts({ offset: 0, productName, category: cat }))
    if (cat) enqueueSnackbar(`Filtered by ${cat}`, { variant: "info" })
  }

  // Infinite Scroll Logic
  function loadMore() {
    if (!loading && hasMore) {
      dispatch(loadProducts({ offset, productName, category }))
    }
  }

  function onScroll() {
    if (window.innerHeight + window.scrollY + 2 >= document.body.scrollHeight) {
      loadMore()
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [offset, productName, category, loading, hasMore])

  return (
    <>
      {/* HEADER */}
      <header>
        <h1>DashBoard</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={productName}
          onChange={handleSearch}
        />

        {/* CATEGORY SELECT */}
        <select
          className="category-dropdown"
          value={category}
          onChange={handleCategorySelect}
        >
          <option value="">All Categories</option>

          <optgroup label="Fashion">
            <option value="Men's Wear">Men's Wear</option>
            <option value="Women's Wear">Women's Wear</option>
            <option value="Kids Wear">Kids Wear</option>
          </optgroup>

          <optgroup label="Electronics">
            <option value="Mobiles">Mobiles</option>
            <option value="Laptops">Laptops</option>
            <option value="Audio">Audio</option>
          </optgroup>

          <optgroup label="Automobile">
            <option value="Cars">Cars</option>
            <option value="Bikes">Bikes</option>
            <option value="Accessories">Accessories</option>
          </optgroup>

          <optgroup label="Grocery">
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Snacks">Snacks</option>
          </optgroup>
        </select>
      </header>

      {/* PRODUCTS GRID */}
      <main>
        {products?.length > 0 ? (
          products.map((product: any) => <Card key={product.id} product={product} />)
        ) : (
          <p>No products found</p>
        )}
      </main>

      {/* LOADING */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      <footer>Ecommerce site</footer>
    </>
  )
}

export default Dashboard
