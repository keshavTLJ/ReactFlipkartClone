import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    }
  }
});

export const { setUser } = authSlice.actions

export default authSlice.reducer