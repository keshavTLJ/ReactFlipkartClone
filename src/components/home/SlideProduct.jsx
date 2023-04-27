import React from 'react'
import { Link } from 'react-router-dom'

const SlideProduct = ({product}) => {
  return (
    <Link to={`/products/${product.id}`}>
        <div className='flex flex-col items-center gap-1 py-4 justify-center cursor-pointer'>
            <div className='flex flex-col justify-center items-center w-32 hover:scale-105'>
                <img src={product.url} alt="" className='h-36' />
            </div>
            <span className='font-semibold text-sm mt-3'>{product.category || product.brand}</span>
            <span className='text-green-600'>{product.discount}</span>
            <span className='text-gray-500 text-sm'>{product.tagline || product.name.split(' ').slice(0,3).join(' ')}</span>
        </div>
    </Link>
  )
}

export default SlideProduct