import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts } from '../../service/productApi'

export const loadProducts = createAsyncThunk(
  'products',
  async (props: { offset: number; productName: string; category: string }) => {
    const list = await fetchProducts(props.offset, 10, props.productName, props.category)
    return list
  }
)

interface ProductState {
  products: any[]
  loading: boolean
  error: string | null
  offset: number
  hasMore: boolean
  productName: string
  category: string
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  offset: 0,
  hasMore: true,
  productName: '',
  category: ''
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.productName = action.payload
      state.products = []
      state.offset = 0
      state.hasMore = true
    },
    setCategory(state, action) {
      state.category = action.payload
      state.products = []
      state.offset = 0
      state.hasMore = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadProducts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loadProducts.fulfilled, (state, action) => {
      state.loading = false
      const list = action.payload ? action.payload : []
      state.products = [...state.products, ...list]
      state.offset += 10
      if (list.length < 10) state.hasMore = false
    })
    builder.addCase(loadProducts.rejected, (state, action) => {
      state.loading = false
      state.error = String(action.error)
    })
  }
})

export const { setSearch, setCategory } = productSlice.actions
export default productSlice.reducer
