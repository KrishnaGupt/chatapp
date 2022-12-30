import React, {useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {

  const [err, setErr] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")

    } catch (error) {
      setErr(err)
    }
  }

  return (
    <div className='form flex justify-center items-center h-[100vh] w-full bg-blue-600'>
      <div className="flex flex-col h-auto pb-2 text-white w-[90%] md:w-[300px]
       bg-white/[0.1] shadow-2xl rounded-3xl items-center">
        <div className="user mt-8 w-40"><img src="https://img.icons8.com/pastel-glyph/512/name.png" 
        alt='user' /></div>
        <div className="my-2 mb-0 text-4xl font-semibold ">Login</div>
        <form className='flex items-center flex-col w-11/12' onSubmit={handleSubmit}>
          <div className="inputEmail flex items-end my-6 mt-6 w-[90%]">
            <span className='text-2xl absolute ml-2 -mt-2'><i className="bi bi-at"></i></span>
            <input type="email" className='bg-transparent border-b-4 border-black outline-none
             placeholder:text-white/[0.4] pl-10 w-full' placeholder='Email ID' />
          </div>
          <div className="inputPassword flex items-end my-6 w-[90%]">
            <span className='text-2xl absolute ml-2 -mt-3'><i className="bi bi-lock-fill"></i></span>
            <input type="password" className='bg-transparent border-b-4 border-black outline-none
             placeholder:text-white/[0.4] pl-10 w-full' placeholder='Password' />
          </div>
          <div className="btn my-6 mt-4 w-[90%]">
            <button className='bg-indigo-700 rounded-xl px-10 py-[10px] w-[100%] uppercase shadow-lg
             shadow-slate-800/50 text-white'>Login</button>
          </div>
        </form>
        <p className='text-center text-xs mb-2'>You don't have an account? <Link to="/register" 
        className='text-yellow-500'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login
