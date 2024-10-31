import { ReducerType } from '@reduxjs/toolkit'
import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast'
import {Outlet,useNavigate} from 'react-router-dom'

const UserPrivateRoutes = () =>  {
    const [verify, setverify] = useState(false)
    const [count, setcount] = useState(5)
    const redirect=useNavigate()
    
    useEffect(() => {
       function Verify() {
        if (localStorage.getItem('data')) {
           const {user,token}=JSON.parse(localStorage.getItem('data'))
           if (token) return setverify(true)
         const id= setTimeout(() => {
            setcount((count)=>count- 1)
           }, 1000);
          if (count<=1) {
             clearInterval(id);
             redirect('/');
            
          }
        } else {
          const id= setTimeout(() => {
            setcount((count)=>count- 1)
           }, 1000);
          if (count<=1) {
             clearInterval(id)
             redirect('/')
            toast.error('please login to checkout')
          }
          
        }
      }
      Verify()
    }, [count])
    
        
      return verify?<Outlet/> :  <div className='flex w-screen h-screen justify-center items-center flex-col' >
        <div>please login to checkout </div>
        <div> redirect in {count} </div>
        <div className="loading loading-spinner loading-lg"></div> </div>
    }
    

export default UserPrivateRoutes