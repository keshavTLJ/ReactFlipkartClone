import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getHomeProducts, getWomenFashionProducts, getMenFashionProducts } from './getProducts'

const initialState = {
    homeProducts : [],
    womenFashionProducts: [],
    menFashionProducts: []
}

export const getHomeProductsAsync = createAsyncThunk(
    "products/getHomeProducts", 
    async () => {
        const snapshot = await getHomeProducts()
        return (
            snapshot.docs.map((doc) => {
            return {...doc.data(), id:doc.id}
        }))
    }
)

export const getWomenFashionProductsAsync = createAsyncThunk(
    "products/getWomenFashionProducts", 
    async () => {
        const snapshot = await getWomenFashionProducts()
        return (
            snapshot.docs.map((doc) => {
            return doc.data()
        }))
    }
)

export const getMenFashionProductsAsync = createAsyncThunk(
    "products/getMenFashionProducts", 
    async () => {
        const snapshot = await getMenFashionProducts()
        return (
            snapshot.docs.map((doc) => {
            return doc.data()
        }))
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getHomeProductsAsync.fulfilled, (state, action) => {
                state.homeProducts = action.payload
        })
            .addCase(getWomenFashionProductsAsync.fulfilled, (state, action) => {
                state.womenFashionProducts = action.payload
        })
            .addCase(getMenFashionProductsAsync.fulfilled, (state, action) => {
                state.menFashionProducts = action.payload
        })
    }
})

export const {  } = productSlice.actions;

export default productSlice.reducer;