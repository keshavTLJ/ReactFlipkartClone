import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { getCartItems, addCartItem, deleteCartItem } from './cartFirebaseApi'

const initialState = {
    cart : []
}

export const getCartItemsAsync = createAsyncThunk(
    "cart/getCartItems", 
    async () => {
        const docSnap = await getCartItems()
        return (
            docSnap.data().cart.map((item) => {
            return item
        }))
    }
)

export const addCartItemAsync = createAsyncThunk(
    "cart/addCartItem",
    async (product) => {
        await addCartItem(product)
        return product
    }
)

export const deleteCartItemAsync = createAsyncThunk(
    "cart/deleteCartItem",
    async (item) => {
        await deleteCartItem(item)
        return item.id
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id)
            item.quantity = item.quantity + 1
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id)
            item.quantity = item.quantity - 1
        },
        deleteCartItemFromRedux: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id)
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getCartItemsAsync.fulfilled, (state, action) => {
                state.cart = action.payload
            })
            .addCase(addCartItemAsync.fulfilled, (state, action) => {
                state.cart.push(action.payload)
            })
            .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
                state.cart.filter(item => item.id !== action.payload)
            })
    }
})

export const { incrementQuantity, decrementQuantity, deleteCartItemFromRedux } = cartSlice.actions;

export default cartSlice.reducer;