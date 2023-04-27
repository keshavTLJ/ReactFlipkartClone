import React from 'react'
import { useSelector } from 'react-redux'

export default function Loader() {

  const isLoading = useSelector(state => state.loading.isLoading)

  return (
    isLoading ? <div className='fixed top-0 left-0 bg-black/50 flex justify-center items-center w-full h-screen z-100'>
        <div className='loader'></div>
    </div> : null
  )
}

//css for the loader div is in App.css
