import React, { useEffect } from 'react'
import { getWishlistItemsAsync, deleteWishlistItemAsync } from '../reducers/wishlist/wishlistSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import flipkartAssuredImg from '../images/flipkart-assured.png'
import {RiStarFill} from 'react-icons/ri'
import {MdDelete} from 'react-icons/md'

const Wishlist = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentUser = useSelector(state => state.auth.currentUser)
    const wishlistItems = useSelector(state => state.wishlist?.wishlist)

    useEffect(() => {
        if(!currentUser) navigate('/')
    }, [currentUser])

    function handleDelete(item) {
        dispatch(deleteWishlistItemAsync(item))
        dispatch(getWishlistItemsAsync())
    }

  return (
    <div className='w-full bg-[#F1F3F6]'>
        <div className='w-[60%] flex flex-col items-center mx-auto'>
            <div className='w-full text-black font-semibold pl-7 py-4 border-b-[1px] border-b-black/10 bg-white mt-4'>My Wishlist ({wishlistItems.length})</div>
            <div className='w-full flex flex-col divide-y-[1px] mb-4'>
                {wishlistItems?.map((item, index) => 
                    <Link to={`/Products/${item.id}`} key={index} className='relative flex flex-row gap-6 bg-white group py-5 px-7'>
                        <div className='h-[20vh] p-2'>
                            <img src={item.url} alt={`${item.name}`} width={100} className='h-full object-contain' />
                        </div>
                        <div className='flex flex-col w-[75%]'>
                            <h3 className='text-black group-hover:text-blue-500 truncate'>{item?.name}</h3>
                            <span className='flex flex-row items-center gap-5'>
                                <span className='flex flex-row h-5 rounded-[4px] justify-center items-center gap-[2px] bg-green-600 text-white text-xs px-[5px]'>4<RiStarFill />
                                </span>
                                <img src={flipkartAssuredImg} alt="" width='78px' />
                            </span>
                            <span className='flex flex-row items-center gap-3 mt-6'>
                                <h1 className='font-semibold text-xl'>₹{item?.price}</h1>
                                <h3 className='line-through text-black/50 text-sm'>₹{item?.originalprice}</h3>
                                <h3 className='text-green-600 text-xs font-semibold'>{item?.price?.discount} off</h3>
                            </span>
                        </div>
                        <MdDelete onClick={(e) => {e.preventDefault(); e.stopPropagation(); handleDelete(item)}} className='absolute right-8 text-xl text-black/30 hover:text-blue-500' />
                    </Link> 
                )}
            </div>
        </div>
    </div>
  )
}

export default Wishlist