import React from 'react'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='sidebar flex flex-col items-center md:w-[calc(100%-60%)] bg-[#1d1f2b]'>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar
