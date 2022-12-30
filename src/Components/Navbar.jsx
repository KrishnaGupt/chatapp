import React, { useContext } from 'react'
import { auth } from '../firebase'
import logo from '../imgs/logo.jpg'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='absolute top-0 flex items-center justify-between h-[100px] w-[90%] md:w-[95%]'>
      <div className="logo self-center">
        <img src={logo} className="w-12 rounded-full" alt='logo' />
      </div>
      <div className="account flex h-fit m-0">
        <img src={currentUser.photoURL} alt="user" className='mx-4 w-10 rounded-full' />
        <button onClick={() => signOut(auth)} className='bg-red-700 px-5 py-2 text-sm flex items-end rounded-md text-white uppercase '>
          <span className='hidden md:block'>Logout</span> <i className="bi bi-power mx-1 text-xl md:ml-2"></i></button>
      </div>
    </div>
  )
}

export default Navbar
