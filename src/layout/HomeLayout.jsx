import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const HomeLayout = () => {
  return (
    <div>
        {/* <Header/> */}
        <Outlet/>
        <Footer/>
        
    </div>
  )
}

export default HomeLayout