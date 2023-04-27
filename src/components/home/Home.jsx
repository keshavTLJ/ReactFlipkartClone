import React,{ useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import Slide from './Slide'
import Footer from './footer/Footer'
import { db } from '../../firebase-config'
import { collection, getDocs, setDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { getHomeProductsAsync } from '../../reducers/products/productSlice'
import {useSelector, useDispatch} from 'react-redux'
import { products } from '../../products/products'
import { menData } from '../../products/menProducts'

const Home = () => {

    const navData = [
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100', text: 'Grocery' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100', text: 'Mobile' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100', text: 'Fashion' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100', text: 'Electronics' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/ee162bad964c46ae.png?q=100', text: 'Home' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100', text: 'Appliances' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100', text: 'Travel' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100', text: 'Top Offers' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100', text: 'Beauty, Toys & More' }
    ]
    const homeProducts = useSelector(state => state.products?.homeProducts)
    const womenFashionProducts = useSelector(state => state.products?.womenFashionProducts)
    const menFashionProducts = useSelector(state => state.products?.menFashionProducts)

    function shuffledWomenProducts() {
      return [...womenFashionProducts].sort(() => 0.5 - Math.random()).slice(0, 7)
    }
    function shuffledMenProducts() {
      return [...menFashionProducts].sort(() => 0.5 - Math.random()).slice(0, 7)
    }

  return (
    <div className='bg-[#F2F2F2]'>
        <div className='flex justify-center gap-14 p-3 shadow w-full'>
            {navData.map((item, index) => {
                if(item.text === 'Fashion') {
                    return (
                        <div key={index} className="flex flex-col justify-center items-center cursor-pointer group relative" >
                            <img src={item.url} alt={item.text} width={66} />
                            <p className='text-center text-sm font-semibold group-hover:text-blue-500'>{item.text}</p>
                            <ul className="hidden z-30 absolute w-52 top-[88px] text-black pt group-hover:block shadow-lg bg-white">
                                <Link to='/fashion/men'>
                                  <li className="">
                                    <p className=" flex flex-row items-center justify-start gap-2 bg-white hover:bg-gray-100 py-2 px-4 whitespace-no-wrap cursor-pointer">
                                      Men 
                                    </p>
                                  </li>
                                </Link>
                                <Link to='/fashion/women'>
                                    <li className="">
                                      <p className="flex flex-row items-center justify-start gap-2 bg-white hover:bg-gray-100 py-2 px-4 whitespace-no-wrap cursor-pointer">
                                        Women
                                      </p>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={index} className="flex flex-col justify-center items-center cursor-pointer group" >
                            <img src={item.url} alt={item.text} width={66} />
                            <p className='text-center text-sm font-semibold group-hover:text-blue-500'>{item.text}</p>
                        </div>
                    )
                }
            })}
        </div>
        <div className='flex flex-col gap-[10px] p-2'>
            <Banner />
            <Slide title="Deals of the Day" products={homeProducts} autoplay={true} />
            <Slide title="Discounts for You" products={shuffledWomenProducts()} autoplay={false} />
            <Slide title="Suggesting Items" products={shuffledMenProducts()} autoplay={false} />
            <Slide title="Trending Offers" products={shuffledWomenProducts()} autoplay={false} />
            <Slide title="Season's top Picks" products={shuffledMenProducts()} autoplay={false} />
            <Slide title="Top Deals on Accessories" products={shuffledWomenProducts()} autoplay={false} />
            <Footer />
        </div>
    </div>
  )
}

export default Home