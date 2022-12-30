import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'

const Chats = () => {

  const [chats, setChats] = useState([])

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])


  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
  }

  return (
    <div className='md:w-3/4 bg-[#5C4F82] h-full rounded-3xl md:rounded-t-3xl md:rounded-b-none mt-12 w-[90%]'>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div className="user flex justify-start rounded-3xl items-center h-[70px] md:h-[80px] pl-[10px] w-[100%] hover:bg-[#40375a]" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <div className="userPic">
            <img src={chat[1].userInfo.photoURL} className='w-12 rounded-full mr-[10px]' />
          </div>
          <div className="userInfo flex flex-col text-white">
            <span className='text-xl -mb-[6px]'>{chat[1].userInfo.displayName}</span>
            <span className='text-[0.8rem]'>{chat[1].lastMessage?.text}</span>
          </div>
        </div>
      ))}
      {/* <hr className='w-[90%] mx-auto' /> */}
    </div>
  )
}

export default Chats
