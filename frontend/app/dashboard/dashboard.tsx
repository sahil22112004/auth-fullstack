"use client";

import { useEffect } from "react"
import "./dashboard.css"
import Card from "./card/card"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../redux/store"
import { loadProducts, setSearch, setCategory, loadsellerProducts} from "../redux/slices/productSlice"
import { enqueueSnackbar } from "notistack"
import { useRouter } from "next/navigation"
import { logout } from "../redux/slices/authSlice"

function Dashboard() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const {
    products, loading, hasMore,offset, productName, category} = useSelector((state: RootState) => state.product)

  const user = useSelector((state: RootState) => state.auth.currentUser)

  useEffect(() => {
    if(user?.role =="seller"){
      const id:any = user.id
      dispatch(loadsellerProducts({ id,offset: 0, productName: "", category: "" }))

    }else{
      dispatch(loadProducts({ offset: 0, productName: "", category: "" }))
    }
   
  }, [])

  function handleSearch(e: any) {
    const val = e.target.value
    dispatch(setSearch(val))
    dispatch(loadProducts({ offset: 0, productName: val, category }))
  }

  function handleCategorySelect(e: any) {
    const val = e.target.value
    dispatch(setCategory(val))
    if(user?.role=='seller'){
      const id:any = user.id
      dispatch(loadsellerProducts({ id,offset: 0, productName, category: val }))
    }else{
      dispatch(loadProducts({ offset: 0, productName, category: val }))
    }
    
  }

  function loadMore() {
    if (!loading && hasMore) {
      if(user?.role=='seller'){
        const id:any = user.id 
        dispatch(loadsellerProducts({id, offset, productName, category }))
      }else{
        dispatch(loadProducts({ offset, productName, category }))
      }
      
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

  function handlelogout() {
    dispatch(logout())
    router.push('/auth/login')
  }

  return (
    <>
      <header className="navbar">
        <div className="nav-left">
          <h2 className="nav-logo">FlipKart</h2>
        </div>

        {user?.role === "seller" ? (
          
          <div className="nav-right">
            <input
                type="text"
                placeholder="Search products..."
                value={productName}
                onChange={handleSearch}
                className="nav-search"
              />
            <button className="nav-btn" onClick={() => router.push("/components/addform")}>
              Add Product
            </button>

            <button className="nav-btn" onClick={() => router.push("/dashboard/sellerorder")}>
              Orders
            </button>

            <button className="nav-btn nav-logout" onClick={handlelogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className="nav-center">
              <input
                type="text"
                placeholder="Search products..."
                value={productName}

                onChange={handleSearch}
                className="nav-search"
              />

              <select
                value={category}
                onChange={handleCategorySelect}
                className="nav-select"
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
            </div>


            <div className="nav-right">
              <button className="wishlistbutton"> WishList</button>
              <button className="nav-btn" onClick={() => router.push("/dashboard/cart")}>
                Cart
              </button>

              <button className="nav-btn nav-logout" onClick={handlelogout}>
                Logout
              </button>
            </div>
          </>
        )}
      </header>

      <main>
        {products?.length > 0 ? (
          products.map((product: any) => <Card key={product.id} product={product} />)
        ) : (
          <p>No products found</p>
        )}
      </main>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      <footer className="footer">Ecommerce site</footer>
    </>
  )
}

export default Dashboard
