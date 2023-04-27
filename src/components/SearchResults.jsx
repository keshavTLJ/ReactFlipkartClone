import React, { useEffect, useState, useMemo } from 'react'
import { womenData } from '../products/womenProducts'
import { Link, useParams } from 'react-router-dom'
import flipkartAssuredImg from '../images/flipkart-assured.png'
import { AiFillHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

const SearchResults = () => {
    const [pageItems, setPageItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sortParameter, setSortParameter] = useState('popularity')

    const { query } = useParams()
    const allProducts = useSelector(state => state.products)

    const queryResults = useMemo(() => 
        allProducts.menFashionProducts.filter(product => product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query)).concat(allProducts.womenFashionProducts.filter(product => product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query))).concat(allProducts.homeProducts.filter(product => product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query))), [query])
    let initialQueryResults = [...queryResults]

    const totalResults = queryResults.length
    const pages = Math.ceil(totalResults/40)
    const pageNumbersArray = Array(pages).fill().map((v,i)=>++i);

    useEffect(() => {
        setCurrentPage(1)
    }, [sortParameter])

    useEffect(() => {
        sort()
        setPageItems(initialQueryResults.slice((currentPage-1)*40, currentPage*40))
    }, [sortParameter, currentPage])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setPageItems(initialQueryResults.slice((currentPage-1)*40, currentPage*40))
    }, [currentPage, query])

    function sort() {
        switch(sortParameter) {
            case 'popularity':
                initialQueryResults = queryResults
                break;
            case 'priceLowToHigh': 
                initialQueryResults.sort((a, b) => a.price - b.price)
                break;
            case 'priceHighToLow': 
                initialQueryResults.sort((a, b) => b.price - a.price)
                break;
        }
    }

  return (
    <div className='bg-[#F0F2F5] flex flex-row gap-2 pt-2 pb-4 px-2'>
        <div id='filter-section' className='w-[23%] bg-white'>
            
        </div>
        <div id='product-section' className='bg-white w-full'>
            <div className='h-16 border-b-[1px] pl-4 py-2 flex flex-col gap-2'>
                <div className='flex items-center font-semibold'>
                    {totalResults ? `Showing ${(currentPage-1)*40 + 1} – ${currentPage === pages ? totalResults : (currentPage*40)} of ${totalResults} results for "${query}"` : `No results for "${query}"`}
                </div>
                <div className='flex flex-row items-center gap-4 text-sm'>
                    <span className='font-semibold'>Sort By</span>
                    <button disabled={sortParameter === 'popularity'} onClick={() => setSortParameter('popularity')} className={`${sortParameter === 'popularity' ? 'text-blue-500 font-semibold' : 'text-black'}`}>Popularity</button>
                    <button disabled={sortParameter === 'priceLowToHigh'} onClick={() => setSortParameter('priceLowToHigh')} className={`${sortParameter === 'priceLowToHigh' ? 'text-blue-500 font-semibold' : 'text-black'}`}>Price -- Low to High</button>
                    <button disabled={sortParameter === 'priceHighToLow'} onClick={() => setSortParameter('priceHighToLow')} className={`${sortParameter === 'priceHighToLow' ? 'text-blue-500 font-semibold' : 'text-black'}`}>Price -- High to Low</button>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-2 items-start border-b-[1px]'>
                {pageItems?.map((product, index) => 
                    <Link to={`/products/${product.id}`} key={index} className='relative flex flex-col hover:shadow-md transition-all'>
                        <img src={product?.url} alt={product?.name} className='h-80 object-contain' />
                        <AiFillHeart className={`absolute top-2 right-2 text-black/20 text-3xl hover:text-red-400`} />
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
            {totalResults > 0 && <div className='flex flex-row items-center py-4 px-2'>
                <p className='text-sm'>Page {currentPage} of {pages}</p>
                <div className='flex flex-row items-center gap-6 mx-auto'>
                    {currentPage !==1 && <button onClick={() => setCurrentPage(currentPage-1)} className='text-blue-500 text-sm font-semibold'>PREVIOUS</button>}
                    <div className='flex flex-row items-center gap-3'>
                        {
                            pageNumbersArray?.map((pageNumber, index) => 
                            <div key={index} onClick={() => setCurrentPage(index+1)} className={`flex flex-row justify-center items-center w-8 h-8 rounded-full cursor-pointer ${currentPage === index+1 ? 'bg-blue-500' : 'bg-white'}`}>
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

export default SearchResults