import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItemsAsync, addCartItemAsync, deleteCartItemAsync } from '../reducers/cart/cartSlice'
import { deleteCartItem, addCartItem } from '../reducers/cart/cartFirebaseApi'
import { incrementQuantity, decrementQuantity, deleteCartItemFromRedux } from '../reducers/cart/cartSlice'
import flipkartAssuredImg from '../images/flipkart-assured.png'
import { Link } from 'react-router-dom'

const CartItem = ({item}) => {

    const dispatch = useDispatch()

    function handleDelete(item) {
        dispatch(deleteCartItemAsync(item))
        dispatch(deleteCartItemFromRedux(item))
    }

    const handleDecrement = () => {
        if(item.quantity === 1) {
            handleDelete(item)
            return
        }
        else {
            dispatch(decrementQuantity(item))
            deleteCartItem(item)  //deleting item from firestore
            addCartItem({...item, quantity: item.quantity - 1})  //adding item with updated quantity to firestore
        }
    }

    const handleIncrement = () => {
        dispatch(incrementQuantity(item))
        deleteCartItem(item)  //deleteing item from firestore
        addCartItem({...item, quantity: item.quantity + 1})  //adding item with updated quantity to firestore
    }


  return (
    <div className='flex flex-row gap-6 p-5'>
        <div className='flex flex-col items-center gap-3'>
            <Link to={`/Products/${item.id}`}>
                <div className='h-[17vh]'>
                    <img src={item.url} alt={`${item.name}`} className='h-full' />
                </div>
            </Link>
            <div className="flex flex-row gap-1 h-6 w-28 rounded-lg relative bg-transparent mt-1">
                <button onClick={handleDecrement} id='decrement' className="border-[1px] bg-gray-50 border-gray-400 h-[26px] w-[42px] rounded-full cursor-pointer">
                    <span className="m-auto font-thin">−</span>
                </button>
                <div className="border-[1px] border-gray-400 text-center text-sm rounded-sm w-[70%] h-[26px] font-semibold flex flex-row items-center justify-center focus:outline-none">{item.quantity}</div>
                <button onClick={handleIncrement} id='increment' className="border-[1px] bg-gray-50 border-gray-400 h-[26px] w-[42px] rounded-full cursor-pointer ">
                    <span className="m-auto font-thin">+</span>
                </button>
            </div>
        </div>
        <div className='flex flex-col'>
            <Link to={`/Products/${item.id}`}>
                <h3 className='text-black hover:text-blue-500'>{item.name}</h3>
            </Link>
            <span className='h-8 mt-3'><img src={flipkartAssuredImg} alt="" width='64px' /></span>
            <span className='flex flex-row items-center gap-3'>
                <h3 className='line-through text-black/50 text-sm'>₹{item?.originalprice}</h3>
                <h1 className='font-semibold text-lg'>₹{item?.price}</h1>
                <h3 className='text-green-600'>{item?.discount}</h3>
            </span>
            <button onClick={() => handleDelete(item)} className='font-semibold text-left mt-[6vh] w-[20%]'>REMOVE</button>
        </div>
    </div>
  )
}

export default CartItem