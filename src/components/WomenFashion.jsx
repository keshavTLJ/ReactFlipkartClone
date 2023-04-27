import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWishlistItemFromRedux, deleteWishlistItemAsync, addWishlistItemAsync } from '../reducers/wishlist/wishlistSlice'
import flipkartAssuredImg from '../images/flipkart-assured.png'
import { AiFillHeart } from 'react-icons/ai'

const WomenFashion = ({setLoginModal}) => {

    const products = useSelector(state => state.products.womenFashionProducts)
    let sortedProducts = [...products]
    
    const [pageItems, setPageItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sortParameter, setSortParameter] = useState('popularity')

    const totalProducts = products.length
    const pages = Math.ceil(totalProducts/40)
    const pageNumbersArray = Array(pages).fill().map((v,i)=>++i);

    useEffect(() => {
        setCurrentPage(1)
    }, [sortParameter])

    useEffect(() => {
        sort()
        setPageItems(sortedProducts.slice((currentPage-1)*40, currentPage*40))
    }, [sortParameter, currentPage])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setPageItems(sortedProducts.slice((currentPage-1)*40, currentPage*40))
    }, [currentPage])

    function sort() {
        switch(sortParameter) {
            case 'popularity':
                sortedProducts = products
                break;
            case 'priceLowToHigh': 
                sortedProducts.sort((a, b) => a.price - b.price)
                break;
            case 'priceHighToLow': 
                sortedProducts.sort((a, b) => b.price - a.price)
                break;
        }
    }

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.currentUser)
    const wishlistItems = useSelector(state => state.wishlist.wishlist)
    
    function presentInWishlist(id) {
        if(currentUser) return wishlistItems.some(item => id === item.id)
        return false;
    }
    
    function addToWishlist(id) {
        if(currentUser) {
            const product = pageItems.filter(item => item.id === id)[0]
            if(!presentInWishlist(id)) {
                dispatch(addWishlistItemAsync(product))
            }
            else {
                dispatch(deleteWishlistItemAsync(product))
                dispatch(deleteWishlistItemFromRedux(product))  //manually deleting the item from redux coz store not updating after dispatch(deleteWishlistItemAsync(product))
            }
        }
        else {
            setLoginModal(true)
        }
    }

  return (
    <div className='bg-[#F2F2F2] flex flex-row gap-2 pt-2 pb-4 px-2'>
        <div id='filter-section' className='w-[23%] bg-white'>
            
        </div>
        <div id='product-section' className='bg-white w-full'>
            <div className='h-16 border-b-[1px] pl-4 py-2 flex flex-col gap-2'>
                <div className='flex flex-row items-center gap-2'>
                    <p className='font-semibold'>Women's Clothing</p>
                    <p className='text-xs text-black/60 mt-[2px] font-semibold'>
                    {totalProducts ? `(Showing ${(currentPage-1)*40 + 1} – ${currentPage === pages ? totalProducts : (currentPage*40)} products of ${totalProducts} products)` : `No results for women`}
                    </p>
                </div>
                <div className='flex flex-row items-center gap-4 text-sm'>
                    <span className='font-semibold'>Sort By</span>
                    <button disabled={sortParameter === 'popularity'} onClick={() => setSortParameter('popularity')} className={`${sortParameter === 'popularity' ? 'text-blue-500 font-semibold' : 'text-black'}`}>Popularity</button>
                    <button disabled={sortParameter === 'priceLowToHigh'} onClick={() => setSortParameter('priceLowToHigh')} className={`${sortParameter === 'priceLowToHigh' ? 'text-blue-500 font-semibold' : 'text-black'}`}>Price -- Low to High</button>
                    <button disabled={sortParameter === 'priceHighToLow'} onClick={() => setSortParameter('priceHighToLow')} className={`${sortParameter === 'priceHighToLow' ? 'text-blue-500 font-semibold' : 'text-black'}`}>Price -- High to Low</button>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-2 items-start'>
                {pageItems && pageItems?.map((product, index) => 
                    <Link to={`/products/${product.id}`} key={index} className='relative flex flex-col hover:shadow-md transition-all'>
                        <img src={product?.url} alt={product?.name} className='h-80 object-contain' />
                        <AiFillHeart onClick={(e) => {e.preventDefault(); e.stopPropagation(); addToWishlist(product.id)}} className={`absolute top-2 right-2 text-3xl hover:text-red-400 ${presentInWishlist(product.id) ? 'text-red-400' : 'text-black/20'}`} />
                        <div className='flex flex-col h-1/5 px-4 py-2'>
                            <h3 className='text-black/50 font-semibold'>{product?.brand === "NaN" ? "Clothing Brand" : product?.brand}</h3>
                            <div className='flex flex-row items-center gap-2'>
                                <p className='text-sm truncate'>{product.name}</p>
                                <img src={flipkartAssuredImg} alt="" width='64px' />
                            </div>
                            <div className='flex flex-row items-center gap-2 mt-2'>
                                <h1 className='font-semibold'>₹{product?.price}</h1>
                                <h3 className='line-through text-black/50 text-sm'>₹{product?.originalprice}</h3>
                                <h3 className='text-green-600 text-xs font-semibold'>{product?.discount}</h3>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
            {totalProducts > 0 && <div className='flex flex-row items-center py-4 px-2'>
                <p className='text-sm'>Page {currentPage} of {pages}</p>
                <div className='flex flex-row items-center gap-6 mx-auto'>
                    {currentPage !==1 && <button onClick={() => setCurrentPage(currentPage-1)} className='text-blue-500 text-sm font-semibold'>PREVIOUS</button>}
                    <div className='flex flex-row items-center gap-3'>
                        {
                            pageNumbersArray?.map((pageNumber, index) => 
                            <div key={index} onClick={() => setCurrentPage(index+1)} className={`flex flex-row justify-center items-center w-8 h-8 rounded-full ${currentPage === index+1 ? 'bg-blue-500' : 'bg-white'}`}>
                                <button className={`text-black text-sm font-semibold ${currentPage === index+1 ? 'text-white' : 'text-black'}`}>{pageNumber}</button>
                            </div> )
                        }
                    </div>
                    {currentPage !== pages && <button onClick={() => setCurrentPage(currentPage+1)} className='text-blue-500 text-sm font-semibold'>NEXT</button>}
                </div>
            </div>}
        </div>
    </div>
  )
}

export default WomenFashion