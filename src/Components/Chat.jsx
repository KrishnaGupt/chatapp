import React, { useContext } from 'react'
import '../App.css'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {

  const { data } = useContext(ChatContext)

  return (
    <div className='chat flex justify-center items-end h-full w-auto md:w-[calc(100%-40%)] bg-[#1D1F2B]'>
      <div className="chatPanel bg-[#252837] h-[93%] rounded-t-3xl w-full md:w-[90%]">
        <div className="navbar flex justify-between py-1 items-center bg-[#1D1C25] rounded-t-3xl w-full h-[60px]">
          <div className="userInfo flex justify-between items-center mx-4">
            <img className='ml-5 mr-2 w-10 rounded-full' src={data.user?.photoURL} alt="" />
            <p className='text-white m-0 md:mx-3'>{data.user?.displayName}</p>
          </div>
          <div className="otherOptions text-white text-base md:text-xl mx-4">
            <i className="bi bi-camera-video-fill mx-2 md:mx-4 chatIcons"></i>
            <i className="bi bi-telephone-fill mx-2 md:mx-4 chatIcons"></i>
            <i className="bi bi-search mx-2 md:mx-4 chatIcons"></i>
          </div>
        </div>
        <Messages />
        <Input />
      </div>
    </div>
  )
}

export default Chat
