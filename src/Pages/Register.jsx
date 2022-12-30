import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate('/')

          } catch (error) {
            setErr(err)
          }

        })
      });

    } catch (err) {
      setErr(true)
    }
  }
  return (
    <div className='form flex justify-center items-center h-[100vh] w-full bg-blue-600'>
      <div className="flex flex-col h-auto pb-2 text-white w-[90%] md:w-[300px]
       bg-white/[0.1] shadow-2xl rounded-3xl items-center">
        <div className="user mt-8 w-40"><img src="https://img.icons8.com/pastel-glyph/512/name.png" alt='user'/></div>
        <div className="my-2 mb-0 text-4xl font-semibold ">Register</div>
        <form className='flex items-center flex-col w-full' onSubmit={handleSubmit}>
          <div className="inputName my-4 w-[80%]">
            <span className='text-2xl absolute ml-2 -mt-1'><i className="bi bi-person"></i></span>
            <input type="text" className='bg-transparent border-b-4 border-black outline-none placeholder:text-white/[0.4] pl-10 w-full' placeholder='Username' />
          </div>
          <div className="inputEmail my-4 w-[80%]">
            <span className='text-2xl absolute ml-2 -mt-1'><i className="bi bi-at"></i></span>
            <input type="email" className='bg-transparent border-b-4 border-black outline-none placeholder:text-white/[0.4] pl-10 w-full' placeholder='Email ID' />
          </div>
          <div className="inputPassword my-4 w-[80%]">
            <span className='text-2xl absolute ml-2 -mt-1'><i className="bi bi-lock-fill"></i></span>
            <input type="password" className='bg-transparent border-b-4 border-black outline-none placeholder:text-white/[0.4] pl-10 w-full' placeholder='Password' />
          </div>
            <input id='pic' type="file" className='hidden' />
            <div className="my-1 w[80%] text-center bg-[#8080807d] p-2 rounded-lg text-xs mb-2">
            <span>Upload your profile</span>
            <label htmlFor="pic">
              <span className='cursor-pointer text-[#000] font-bold ml-1 underline'>picture</span>
            </label>
          </div>
          <div className="btn my-2 w-[80%]">
            <button className='bg-indigo-700 rounded-lg px-10 py-2 text-xs w-[100%] uppercase shadow-lg
             shadow-slate-800/50 text-white'>Register</button>
            {/* {err && <span>Something's went wrong, please try again later!</span>} */}
          </div>
        </form>
        <p className='text-center text-xs my-2'>Already have an account? <Link to="/login" 
        className='text-yellow-500'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register
