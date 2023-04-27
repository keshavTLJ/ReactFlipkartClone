import React,{ useState,useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/home/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import ProductDetails from './components/ProductDetails'
import Wishlist from './components/Wishlist'
import MenFashion from './components/MenFashion'
import WomenFashion from './components/WomenFashion'
import SearchResults from './components/SearchResults'
import Success from './components/Success'
import Cancel from './components/Cancel'
import Loader from './components/Loader'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getHomeProductsAsync } from './reducers/products/productSlice'
import { getWomenFashionProductsAsync } from './reducers/products/productSlice'
import { getMenFashionProductsAsync } from './reducers/products/productSlice'
import { getCartItemsAsync } from './reducers/cart/cartSlice'
import { getWishlistItemsAsync } from './reducers/wishlist/wishlistSlice'
import {useSelector, useDispatch} from 'react-redux'
import { auth } from './firebase-config'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { setUser } from './reducers/auth/authSlice'

function App() {

  const [loginModal, setLoginModal] = useState(false)

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.auth.currentUser)
  
  useEffect(() => {
    dispatch(getHomeProductsAsync())
    dispatch(getWomenFashionProductsAsync())
    dispatch(getMenFashionProductsAsync())
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        user ? dispatch(setUser(user.displayName)) : dispatch(setUser(null))

        if(currentUser) {
          dispatch(getCartItemsAsync())
          dispatch(getWishlistItemsAsync())
        }
      })
      
      return () => {
        unsubscribe()
      }
    }, [currentUser])
    
      
  const signout = () => {
    signOut(auth)
      .catch((err) => console.log(err))
  }

  return (
    <BrowserRouter>
      <div>
        <Loader />
        <Header setLoginModal={setLoginModal} signout={signout} />
        {loginModal && <Login loginModal={loginModal} setLoginModal={setLoginModal} />}
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/products/:id' element={<ProductDetails setLoginModal={setLoginModal} />} />
          <Route path='/cart' element={<Cart setLoginModal={setLoginModal} />} />
          <Route path='/wishlist' element={<Wishlist setLoginModal={setLoginModal} />} />
          <Route path='/fashion/men' element={<MenFashion />} />
          <Route path='/fashion/women' element={<WomenFashion setLoginModal={setLoginModal} />} />
          <Route path='/search/:query' element={<SearchResults />} />    
          <Route path='/success' element={<Success />} />    
          <Route path='/cancel' element={<Cancel />} />    
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App