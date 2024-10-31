import React,{useState,useEffect} from 'react'
import {Outlet,useNavigate} from 'react-router-dom'

const AdminprivateRoute = () => {
const [verify, setverify] = useState(false)
const [count, setcount] = useState(5)
const redirect=useNavigate()

useEffect(() => {
   function Verify() {
    if (localStorage.getItem('data')) {
       const {user}=JSON.parse(localStorage.getItem('data'))
       if (user.isAdmin) return setverify(true) 
     const id= setTimeout(() => {
        setcount((count)=>count- 1)
       }, 1000);
      if (count<=1) {
         clearInterval(id)
         redirect('/')
      }
    } else {
      const id= setTimeout(() => {
        setcount((count)=>count- 1)
       }, 1000);
      if (count<=1) {
         clearInterval(id)
         redirect('/')
      }
      
    }
  }
  Verify()
}, [count])

    
  return verify?<Outlet/> :  <div className='flex w-screen h-screen justify-center items-center flex-col' >
    <div>only admin can access this Route </div>
    <div> redirect in {count} </div>
    <div className="loading loading-spinner loading-lg"></div> </div>
}

export default AdminprivateRoute