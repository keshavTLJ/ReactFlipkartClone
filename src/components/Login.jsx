import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../reducers/loadingSlice'
import SignUp from './SignUp'
import { AiOutlineClose } from 'react-icons/ai'
import { auth, db } from '../firebase-config'
import { signInWithEmailAndPassword} from 'firebase/auth'

const Login = ({setLoginModal}) => {

    const [toggleSignUp, setToggleSignUp] = useState(false)  //for switching b/w login and signUp page
    const [allowLogin, setAllowLogin] = useState(true)  //for verifying wrong email/pwd on login
    const [error, setError] = useState('')
    const [loginBtnDisabled, setLoginBtnDisabled] = useState(false)
    const [input, setInput] = useState(
        {
        loginEmail: '', 
        loginPwd: '' 
        })

    const dispatch = useDispatch()

        const handleChange = (e) => {
            setInput({
                ...input, [e.target.id]: e.target.value
            })
        }

        const login = async (e) => {
            e.preventDefault()
            // dispatch(setLoading(true))
            setLoginBtnDisabled(true)
            signInWithEmailAndPassword(auth, input.loginEmail, input.loginPwd)
                .then((res) => {
                    // dispatch(setLoading(false))
                    setLoginBtnDisabled(false)
                    setLoginModal(false)
                })
                .catch(err => {
                    setdisableBtn(false)
                    if(err.code === "auth/invalid-email") {
                        setError("Email is incorrect!")
                        setAllowLogin(false)
                        setTimeout(() => {
                            setAllowLogin(true)
                        }, 3000);
                    }
                    else if(err.code === "auth/wrong-password") {
                        setError("Incorrrect password!")
                        setAllowLogin(false)
                        setTimeout(() => {
                            setAllowLogin(true)
                        }, 3000);
                    }
                    else if(err.code === "auth/internal-error") {
                        setError("Please Enter all the Fields!")
                        setAllowLogin(false)
                        setTimeout(() => {
                            setAllowLogin(true)
                        }, 3000);
                    }
                    else if(err.code === "auth/user-not-found") {
                        setError("Please Enter a valid email!")
                        setAllowLogin(false)
                        setTimeout(() => {
                            setAllowLogin(true)
                        }, 3000);
                    }
                })
        }


    const emailRef = useRef()
    useEffect(() => {
        emailRef.current.focus()
    }, [])

  return (
    <>
    {!toggleSignUp ? 
    <div className='fixed top-0 left-0 bg-black/50 flex justify-center items-center w-full h-screen z-30' onClick={() => setLoginModal(false)}>
        <div className="w-[44vw] h-[73vh] flex flex-row relative" onClick={(e) => e.stopPropagation()}>
            <div className='flex h-full w-[40%]'>
                <div className="bg-[url('https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png')] flex-1 bg-no-repeat bg-blue-500 bg-[center_bottom_3.5rem]">
                {!toggleSignUp ?
                    <div className='flex flex-col justify-center ml-8 mt-7 w-40 gap-2'>
                        <h3 className='text-white text-[28px] font-semibold'>Login</h3>
                        <p className='text-gray-200 text-[17px]'>Get access to your Orders, Wishlist and Recommendations</p>
                    </div>
                    :
                    <div className='flex flex-col ml-8 mt-7 gap-4'>
                        <h3 className='text-white text-[28px] font-semibold leading-8'>Looks like you're new here!</h3>
                        <p className='text-gray-200 text-[17px] '>Sign up with your email or mobile number to get started</p>
                    </div>
                }
                </div>
            </div>
            <form onChange={handleChange} className='w-[60%] flex justify-center bg-white'>
                <div className='flex flex-col items-center w-[86%]'>
                    {/* login email */}
                    <div className="relative z-0 w-full items-center mt-12">
                        <input ref={emailRef} type="email" defaultValue={input.loginEmail} id="loginEmail" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer caret-black" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-gray-500 dark:text-gray-400 duration-[280ms] ease-in-out transform -translate-y-6 scale-[80%] top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[80%] peer-focus:-translate-y-6">Enter Email/Mobile Number</label>
                    </div>
                    {/* login password */}
                    <div className="relative z-0 w-full items-center mt-6">
                        <input type="password" id="loginPwd" defaultValue={input.loginPwd} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer caret-black" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-gray-500 dark:text-gray-400 duration-[280ms] ease-in-out transform -translate-y-6 scale-[80%] top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[80%] peer-focus:-translate-y-6">Enter Password</label>
                    </div>
                    <p className='text-gray-500 text-xs mt-8'>By continuing, you agree to Flipkart's <span className='text-blue-500'>Terms of Use</span> and <span className='text-blue-500'>Privacy Policy</span>.</p>
                    <button disabled={loginBtnDisabled} onClick={login} className='bg-[#FB641B] text-white w-full rounded-sm h-12 mt-4'>Login</button>
                    <p className='mt-2 mb-2'>OR</p>
                    <button className='text-blue-500 w-full rounded-sm h-12 shadow-[0_2px_4px_0px_rgba(0,0,0,0.2)] mt-'>Request OTP</button>
                    <div className={`${allowLogin ? "hidden" : "block"} text-red-500 text-center`}>
                        {error}
                    </div>
                    <button onClick={(e) => {e.preventDefault(); setToggleSignUp(true)}} className='text-blue-600 text-sm font-medium mt-24'>New to Flipkart? Create an account</button>
                </div>
            </form>
            <AiOutlineClose className='absolute -right-10 cursor-pointer' color='white' size='35px' onClick={() => setLoginModal(false)} />
        </div>
        </div>
        :
        <SignUp setLoginModal={setLoginModal} toggleSignUp={toggleSignUp} setToggleSignUp={setToggleSignUp} />
        }
    </>
  )
}

export default Login