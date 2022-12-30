import React from 'react'
import Sidebar from '../Components/Sidebar'
import Chat from '../Components/Chat'
import Navbar from '../Components/Navbar'

const Home = () => {
  return (
    <div className='home flex justify-center items-end h-[100vh]'>
    <Navbar/>
      <div className="container flex flex-col md:flex-row rounded-t-3xl overflow-auto h-[calc(100%-100px)] w-[100vw] md:overflow-hidden">
        <Sidebar/>
        <Chat/>
      </div>
      
    </div>
  )
}

export default Home
