import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWishlistItems, addWishlistItem, deleteWishlistItem } from './wishlistFirebaseApi'

const initialState = {
    wishlist : []
}

export const getWishlistItemsAsync = createAsyncThunk(
    "cart/getWishlistItems", 
    async () => {
        const docSnap = await getWishlistItems()
        return (
            docSnap.data().wishlist.map((item) => {
            return item
        }))
    }
)

export const addWishlistItemAsync = createAsyncThunk(
    "cart/addWishlistItem",
    async (product) => {
        await addWishlistItem(product)
        return product
    }
)

export const deleteWishlistItemAsync = createAsyncThunk(
    "cart/deleteWishlistItem",
    async (item) => {
        await deleteWishlistItem(item)
        return item.id
    }
)

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        deleteWishlistItemFromRedux: (state, action) => {
            state.wishlist = state.wishlist.filter(item => item.id !== action.payload.id)
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getWishlistItemsAsync.fulfilled, (state, action) => {
                state.wishlist = action.payload
            })
            .addCase(addWishlistItemAsync.fulfilled, (state, action) => {
                state.wishlist.push(action.payload)
            })
            .addCase(deleteWishlistItemAsync.fulfilled, (state, action) => {
                state.wishlist.filter(item => item.id !== action.payload)
            })
    }
})

export const { deleteWishlistItemFromRedux } = wishlistSlice.actions;

export default wishlistSlice.reducer;