import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
const Layout = ({children}) => {
  return (
   <>
   <Navbar/>
   <div className='min-h-[67vh]' >
   {children }
   </div>
   <Footer/>
   </>
  )
}

export default Layout