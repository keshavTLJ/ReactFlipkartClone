import {BsCheckLg} from 'react-icons/bs'

function Success() {

    return (
        <div className="flex flex-col mt-[10%] justify-center items-center gap-3 mx-auto text-4xl text-white bg-blue-400 w-[36%] py-10 rounded-md">
            <span className='w-20 h-20 rounded-full bg-green-400 flex flex-row justify-center items-center'>
                <BsCheckLg className='text-white text-7xl' />
            </span>
            <h1>Order Confirmed!</h1>
        </div>
    )
}

export default Success;