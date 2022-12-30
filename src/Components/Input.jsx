import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import { v4 as uuid } from 'uuid'

const Input = () => {
  const [text, setText] = useState("")
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    console.log('dd');
    if (text) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })


    setText("")
  }


  return (
    <div className='w-full md:static bottom-0 fixed  flex items-center m-auto h-14 '>
      <input className='bg-[#1D1C25] outline-none py-[18px] text-white rounded-2xl px-4 w-[93%]' placeholder='Message' type="text" onChange={e => setText(e.target.value)} value={text} />
      <button onClick={handleSend}><i className="bi bi-send-fill bg-[#6A8CF8] text-white px-4 py-3 text-2xl rounded-2xl"></i>
      </button>
    </div>
  )
}

export default Input
