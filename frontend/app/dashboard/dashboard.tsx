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
import { useRouter } from "next/navigation"
import { logout } from "../redux/slices/authSlice"

function Dashboard() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const {
    products, loading, hasMore,
    offset, productName, category
  } = useSelector((state: RootState) => state.product)

  useEffect(() => {
    dispatch(loadProducts({ offset: 0, productName: "", category: "" }))
  }, [])

  function handleSearch(e: any) {
    const val = e.target.value
    dispatch(setSearch(val))
    dispatch(loadProducts({ offset: 0, productName: val, category }))
  }

  function handleCategorySelect(e: any) {
    const category = e.target.value
    dispatch(setCategory(category))
    dispatch(loadProducts({ offset: 0, productName, category: category }))
    if (category) enqueueSnackbar(`Filtered by ${category}`, { variant: "info" })
  }

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

  function handlelogout(){
    dispatch(logout())
    router.push('/auth/login')

  }




  return (
    <>
      <header>
        <h1>DashBoard</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={productName}
          onChange={handleSearch}
        />

        <select
          className="category-dropdown"
          value={category}
          onChange={handleCategorySelect}
        >
          <option value="">All Categories</option>

          <optgroup label="Fashion">
            <option value="2">Men's Wear</option>
            <option value="3">Women's Wear</option>
            <option value="4">Kids Wear</option>
          </optgroup>

          <optgroup label="Electronics">
            <option value="5">Mobiles</option>
            <option value="6">Laptops</option>
            <option value="7">Audio</option>
          </optgroup>

          <optgroup label="Automobile">
            <option value="8">Cars</option>
            <option value="9">Bikes</option>
            <option value="10">Accessories</option>
          </optgroup>

          <optgroup label="Grocery">
            <option value="11">Fruits</option>
            <option value="12">Vegetables</option>
            <option value="13">Snacks</option>
          </optgroup>
        </select>

        <div className="headerbtn">

          <button className="addproductbtn" onClick={
          ()=>router.push('/components/addform')
        }>Add Product</button>

        <button className="logoutbtn" onClick={handlelogout}>Log Out</button>
        </div>

        

      </header>

      <main>
        {products?.length > 0 ? (
          products.map((product: any) => <Card key={product.id} product={product} />)
        ) : (
          <p>No products found</p>
        )}
      </main>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      <footer>Ecommerce site</footer>
    </>
  )
}

export default Dashboard
