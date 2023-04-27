import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'

const Cart = ({setLoginModal}) => {
  
  const currentUser = useSelector(state => state.auth.currentUser)
  const cartItems = useSelector(state => state.cart?.cart)
  const totalMrp = cartItems?.length && cartItems?.map(item => item?.originalprice * item.quantity).reduce((acc, mrp) => acc + mrp)
  const totalCost = cartItems?.length && cartItems?.map(item => item?.price * item.quantity).reduce((acc, cost) => acc + cost)
  const totalDiscount = totalMrp - totalCost

  const placeOrder = async () => {
    cartItems &&
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({items: cartItems})
    })
    .then(async res => {
      if(res.ok) {
        return res.json()
      }
      const json = await res.json()
      return await Promise.reject(json)
    })
    .then(({url}) => {
      window.location = url
    })
    .catch(e => {
      console.log(e.error)
    })
  }

  return (
    <div className='bg-[#F1F3F6] w-full'>
      {currentUser ? 
      <>
      {cartItems.length ?
      <div className='flex flex-row justify-center'>
          <div className='w-[57%] my-5 shadow flex flex-col bg-[#F1F3F6]'>
              <div className='text-xl text-blue-500 bg-white py-4 text-center mb-2'>
                Cart
              </div>
              <div className='flex flex-col divide-y-[1px] bg-white'>
              {
                cartItems?.map((item, index) => <CartItem key={index} item={item} /> )
              }
              </div>
              <div className='bg-white py-4 px-5 shadow-[0_-4px_6px_-5px_rgba(0,0,0,0.3)]'>
                <button onClick={placeOrder} className='bg-[#FB641B] text-white float-right py-4 px-20 font-semibold'>PLACE ORDER</button>
              </div>
          </div>
          <div className='w-[25%] my-5 flex flex-col items-center gap-7'>
              <div className='bg-white shadow divide-y-[1px] w-[90%]'>
                  <h2 className='text-black/50 text-sm font-bold pl-5 py-4'>PRICE DETAILS</h2>
                  <div className='py-2'>
                    <div className='flex flex-row justify-between items-center px-5 py-2'>
                      <span>price ({cartItems.length} items)</span>
                      <span>₹{totalMrp}</span>
                    </div>
                    <div className='flex flex-row justify-between items-center px-5 py-2'>
                      <span>Discount</span>
                      <span className='text-green-600'>− ₹{totalDiscount}</span>
                    </div>
                    <div className='flex flex-row justify-between items-center px-5 py-2'>
                      <span>Delivery Charges</span>
                      <span className='text-green-600'>Free</span>
                    </div>
                  </div>
                  <div className='flex flex-row justify-between items-center px-5 py-4'>
                    <span className='text-black font-semibold text-lg'>Total Amount</span>
                    <span className='text-black font-semibold text-lg'>₹{totalCost}</span>
                  </div>
                  <p className='text-green-600 pl-5 py-3'>You will save ₹{totalDiscount} on this order</p>
              </div>
              <p className='text-center text-sm font-semibold text-black/50 w-[90%]'>Safe and Secure Payments.Easy returns.100% Authentic products.</p>
          </div>
      </div>
      :
      <div className='w-[80%] flex flex-col mx-auto'>
          <div className='text-xl text-blue-500 bg-white py-4 text-center mb-2 rounded mt-5'>
            Cart
          </div>
          <div className='flex flex-col justify-center items-center gap-3 bg-white py-8 shadow'>
            <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" width={220} />
            <p className='mt-2 text-lg'>Your cart is empty!</p>
            <p className='text-xs'>Explore our wide selection and find something you like</p>
          </div>
      </div>
    }
    </>
    :
    <div className='w-[80%] flex flex-col mx-auto'>
          <div className='text-xl text-blue-500 bg-white py-4 text-center mb-2 rounded mt-5'>
            Cart
          </div>
          <div className='flex flex-col justify-center items-center gap-3 bg-white py-8 shadow'>
            <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" width={220} />
            <p className='mt-2 text-lg'>Missing Cart items?</p>
            <p className='text-xs'>Login to see the items you added previously</p>
            {!currentUser && <button onClick={() => setLoginModal(true)} className='bg-[#FF7518] text-white w-1/5 text-center rounded-sm font-semibold py-2'>Login</button>}
          </div>
      </div>
    }
    </div>
  )
}

export default Cart
