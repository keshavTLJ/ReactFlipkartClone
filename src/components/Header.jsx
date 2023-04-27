import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { RiShutDownLine } from 'react-icons/ri'
import {AiFillHeart} from 'react-icons/ai'
import { useSelector } from "react-redux";

const Header = ({setLoginModal, signout}) => {
  const logoURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subURL =
      "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

  const currentUser = useSelector(state => state.auth.currentUser)
  const cartLength = useSelector(state => state.cart?.cart).length
  const wishlistLength = useSelector(state => state.wishlist?.wishlist).length

  const allProducts = useSelector(state => state.products)
  const navigate  = useNavigate()
  const [input, setInput] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const inputRef = useRef()
  const location  = useLocation()
  
  const handleChange = (e) => {
    const value = e.target.value
    setInput(value)

    const results = allProducts.menFashionProducts.filter(product => product.name.toLowerCase().includes(value) || product.brand.toLowerCase().includes(value)).concat(allProducts.womenFashionProducts.filter(product => product.name.toLowerCase().includes(value) || product.brand.toLowerCase().includes(value))).concat(allProducts.homeProducts.filter(product => product.name.toLowerCase().includes(value) || product.category.toLowerCase().includes(value))).slice(0,8)

    if(value === "") {
      setFilteredData([])
    }
    else {
      setFilteredData(results)
    }
  }

  const searchQueryHandler = (e) => {
    if((e?.key === "Enter" || e === "searchButton") && input?.length > 0) 
      {
        navigate(`/search/${input}`);
        setFilteredData([])
      }
  }

  //hiding the filtered data when clicked outside the input
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.tagName !== 'INPUT' && e.target.parentNode.tagName !== 'A') {
        setFilteredData([]);
      }
    };

    if(filteredData.length) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filteredData]);

  //clearing the input when on homepage,women or men page
  useEffect(() => {
    if(location.pathname === '/' || location.pathname === '/fashion/women' || location.pathname === '/fashion/men') {
      setInput("")
    }
    if(location.pathname.split('/')[1] === 'search') {
      setInput(location.pathname.split('/')[2])
      inputRef.current.blur()
    }
  
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-10 bg-blue-500 w-full flex items-center justify-center h-14 shadow-md">
      <div className="flex items-center gap-3 mr-14">
          <Link to='/'>
            <div className="flex">
                <div className="flex-col relative">
                    <img src={logoURL} alt="Flipkart logo" width={70} style={{background: ""}} />
                    <span className="absolute right-1 top-3 text-yellow-300 text-lg font-semibold italic">Plus</span>
                </div>
                <div className=""><img src={subURL} alt="star logo" /></div>
            </div>
          </Link>
          <div className="relative">
            <input ref={inputRef} type="text" onChange={handleChange} onKeyUp={searchQueryHandler} value={input} placeholder="Search for products, brands and more" className="w-[36vw] h-9 placeholder-black/60 pl-4 focus:outline-none shadow-md rounded-sm focus:border-b-[1px]" />
              <button onClick={() => searchQueryHandler("searchButton")} className="absolute right-3 top-3">
                <svg
                  className=""
                  width="20"
                  height="20"
                  viewBox="0 0 17 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#2874F1" fillRule="evenodd">
                    <path
                      className="_34RNph"
                      d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"
                    ></path>
                    <path
                      className="_34RNph"
                      d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"
                    ></path>
                  </g>
                </svg>
              </button>
              {filteredData.length > 0 && <ul className='absolute bg-white w-[36vw] shadow-lg'>
                {
                  filteredData.map((product, index) => 
                    <Link to={`/products/${product.id}`} key={index} className="flex flex-row gap-4 px-2 py-1 hover:bg-black/10" onClick={() => setFilteredData([])}>
                      <img src={product.url} alt="" width='32'className="h-12 object-contain" />
                      <span className="truncate my-auto">{product.name}</span>
                    </Link>
                  )
                }
              </ul>}
          </div>
      </div>
      <div className="flex items-center gap-10">
          { !currentUser ?
          <button className="w-[112px] h-7 rounded-sm text-blue-500 text-[17px] cursor-pointer bg-white" onClick={() => setLoginModal(true)}>Login</button>
            :
            <div className="group inline-block relative">
              <button className="text-white py-2 px-4 rounded inline-flex items-center">
                <span className="mr-1">{currentUser}</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
              <ul className="hidden group-hover:block w-56 absolute -left-16 text-black pt-1 shadow-lg bg-white">
                <Link to='/wishlist'>
                  <li className="hover:bg-gray-100 flex flex-row items-center">
                    <p className=" flex flex-row items-center justify-start gap-2 bg-white hover:bg-gray-100 py-2 px-4 whitespace-no-wrap cursor-pointer">
                      <AiFillHeart className='text-blue-600' />
                      Wishlist 
                      <span className="bg-white w-7 h-6 rounded-md bg-black/5 text-black/50 text-center absolute right-4">{wishlistLength}</span>
                    </p>
                  </li>
                </Link>
                <li className="" onClick={signout}>
                  <p className="flex flex-row items-center justify-start gap-2 bg-white hover:bg-gray-100 py-2 px-4 whitespace-no-wrap cursor-pointer">
                    <RiShutDownLine className="text-blue-600" />
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          }
          <div className="text-white text-[17px] cursor-pointer">Become a Seller</div>
          <div className="text-white text-[17px] cursor-pointer">More</div>
          <Link to='/cart'>
            <div className="text-white text-[17px] flex items-center gap-2">
              <span className="relative">
                <svg width="18" height="18" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                    fill="#fff">
                  </path>
                </svg>
                {(currentUser && cartLength > 0) && <span className="absolute -top-3 -right-1 w-[20px] h-[19px] rounded-lg bg-red-400 text-sm text-white flex flex-row justify-center items-center border-white border-[1px]">{cartLength}</span>}
              </span>
              cart
            </div>
          </Link>
      </div>
    </header>
  );
};

export default Header;
