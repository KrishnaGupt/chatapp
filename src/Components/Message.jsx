import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behvior: "smooth" })
  }, [message])


  return (
    <div ref={ref} className={`flex my-3 flex-col ${message.senderId === currentUser.uid && "mine"}`}>
      <p className='mr-4 py-2 px-3 rounded-xl rounded-tl-none bg-[#1D1C25]
       mt-4 w-fit text-xl max-w-[50%]'>{message.text}</p>
      <span className='text-xs ml-1'>just now</span>

    </div>
  )
}

export default Message
