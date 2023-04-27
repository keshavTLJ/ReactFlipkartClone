import React, { useEffect, useRef, useState } from 'react'
import Login from './Login'
import { AiOutlineClose } from 'react-icons/ai'
import { auth, db } from '../firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/auth/authSlice'

const SignUp = ({setLoginModal, toggleSignUp, setToggleSignUp}) => {

    const [allowSignUp, setAllowSignUp] = useState(true)  //for checking already used email on signUp
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState(
        {
        signUpName: '',
        signUpEmail: '', 
        signUpPwd: ''
        })

        const handleChange = (e) => {
            setInput({
                ...input, [e.target.id]: e.target.value
            })
        }

        const dispatch = useDispatch()

        const signUp = async (e) => {
            e.preventDefault()
            setLoading(true)
            await createUserWithEmailAndPassword(auth, input.signUpEmail, input.signUpPwd)
                .then(async (res) => {
                    setLoading(false)
                    await updateProfile(auth.currentUser, {
                        displayName: input.signUpName
                    })
                    .then(() => 
                        dispatch(setUser(auth.currentUser.displayName))
                    )

                    setDoc(doc(db, "users", res.user.uid), {
                        cart: [],
                        wishlist: []
                    })
                    setLoginModal(false)
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err.code)
                    if(err.code === "auth/email-already-in-use") {
                        setError("Email already in use. Please use different Email.")
                        setAllowSignUp(false)
                        setTimeout(() => {
                            setAllowSignUp(true)
                        }, 3000);
                    }
                    else if(err.code === "auth/weak-password") {
                        setError("Please enter a strong password!")
                        setAllowSignUp(false)
                        setTimeout(() => {
                            setAllowSignUp(true)
                        }, 3000);
                    }
                    else if(err.code === "auth/internal-error") {
                        setError("Please Enter all the Fields!")
                        setAllowSignUp(false)
                        setTimeout(() => {
                            setAllowSignUp(true)
                        }, 3000);
                    }
                })
        }

    const nameRef = useRef()
    useEffect(() => {
        nameRef.current.focus()
    }, [])
    
  return (
    <>
    {!toggleSignUp ? 
        <Login />
        : 
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
                    {/* name */}
                    <div className="relative z-0 w-full items-center mt-12">
                        <input ref={nameRef} type="text" id="signUpName" defaultValue={input.signUpName} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer caret-black" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-gray-500 dark:text-gray-400 duration-[280ms] ease-in-out transform -translate-y-6 scale-[80%] top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[80%] peer-focus:-translate-y-6">Enter Name</label>
                    </div>
                    {/* signUpEmail */}
                    <div className="relative z-0 w-full items-center mt-6">
                        <input required type="email" id="signUpEmail" defaultValue={input.signUpEmail} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer caret-black" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-gray-500 dark:text-gray-400 duration-[280ms] ease-in-out transform -translate-y-6 scale-[80%] top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[80%] peer-focus:-translate-y-6">Enter Email</label>
                    </div>
                    {/* signUpPassword */}
                    <div className="relative z-0 w-full items-center mt-6">
                        <input required type="password" id="signUpPwd" defaultValue={input.signUpPwd} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer caret-black" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-gray-500 dark:text-gray-400 duration-[280ms] ease-in-out transform -translate-y-6 scale-[80%] top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[80%] peer-focus:-translate-y-6">Enter Password</label>
                    </div>
                    <p className='text-gray-500 text-xs mt-8'>By continuing, you agree to Flipkart's <span className='text-blue-500'>Terms of Use</span> and <span className='text-blue-500'>Privacy Policy</span>.</p>
                    <button disabled={loading} onClick={signUp} className='bg-[#FB641B] text-white w-full rounded-sm h-12 mt-3'>Continue</button>
                    <button onClick={(e) => {setToggleSignUp(false); e.preventDefault()}} className='text-blue-500 w-full rounded-sm h-12 shadow-[0_2px_4px_0px_rgba(0,0,0,0.2)] mt-4'>Existing User? Log in</button>
                    <div className={`${allowSignUp ? "hidden" : "block"} text-red-500 mt-12 text-center`}>
                         {error}
                    </div>
                </div>
            </form>
            <AiOutlineClose className='absolute -right-10 cursor-pointer' color='white' size='35px' onClick={() => setLoginModal(false)} />
        </div>
    </div>
    }
    </>
  )
}

export default SignUp