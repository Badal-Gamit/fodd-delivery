import React, { useState,useEffect } from 'react';
import Login from '../form/Login';
import Registration from '../form/Registration';
import {NavLink,useNavigate} from 'react-router-dom'
import { clearstate } from '../../redux/Slice/Api/form/loginSlice';
import { clearform } from '../../redux/Slice/Api/form/registrationSlice';
import {useDispatch, useSelector}  from 'react-redux'
import { setfood,isselected} from '../../redux/Slice/feature/FoodSlice'
import axios from 'axios';
import { scrollview } from '../../redux/Slice/feature/scrollSlice';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const id =useSelector((state)=>state.login)
  const Formid=useSelector((state)=>state.register)
  const [isloading, setisloading] = useState(false)
  const [query, setquery] = useState('')
  const dispatch=useDispatch()
  const  navigation=useNavigate()


useEffect(() => {
  if (id.user) dispatch(clearstate())
  if (Formid.user)dispatch(clearform()) 

}, [id,Formid])

const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

const queryHandle=async(e)=>{
  e.preventDefault()
  if (query.length<1) return ; 
try {
  setisloading(true)
  const {data,status}=await  axios.post(`https://food-delivery-backend-dbku.onrender.com/menu/query`,{keyword:query})
  console.log(data)
 dispatch(setfood(data.query))
setquery('')
dispatch(scrollview(true))
setisloading(false)
} catch (error) {
  console.log(error.message)
}
}

  return (
    <nav className="bg-red-500 p-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
      
       <NavLink  to={'/'} >  <div className="text-white text-3xl font-bold">
          Tomato
        </div></NavLink>
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
          <form    onClick={queryHandle} >
          <input
              type="text"
              value={query}
            onChange={(e)=>setquery(e.target.value)}
              placeholder="Search..."
              className="px-3 py-1 rounded bg-white text-red-500 focus:outline-none"
            />
           {isloading?<span className="loading loading-spinner text-error absolute right-2 "></span>:
            <button className="absolute right-1 top-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4a6 6 0 100 12 6 6 0 000-12zm10 10l-3.5-3.5" />
              </svg>
            </button> }  
            </form>
          </div>
          <NavLink to={'/cart'} >
          <button className="bg-white text-red-500 px-2 py-1 rounded hover:bg-gray-200 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10H7V7z" />
            </svg>
          </button>
          </NavLink>
          {JSON.parse(localStorage.getItem('data'))?.user?<div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" ><svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 64 64"
  width="34"
  height="34"
>
  <circle cx="32" cy="20" r="12" fill="#4A90E2" />
  <path
    d="M32 34c-11 0-20 5-20 15v5h40v-5c0-10-9-15-20-15z"
    fill="#B0BEC5"
  />
</svg></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
  {JSON.parse(localStorage.getItem('data'))?.user?.isAdmin?<NavLink to={'/dashboard/admin'} ><li><div>Dashboard</div></li></NavLink>:<NavLink to={'/order-list'} ><li><div>My orderList</div></li></NavLink>}
   <NavLink to={'/'} > <li><div  onClick={()=>{localStorage.removeItem('data'); localStorage.removeItem('token') }} >logout</div></li></NavLink>
  </ul>
</div> :<button
            className="bg-white   text-red-500 px-3 py-1 rounded-lg hover:bg-gray-200"
            onClick={() => document.getElementById('my_modal_1').showModal()} >
            Login</button>}
          
          <Login />
          <Registration />
        </div>
    <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      
     {isMobileMenuOpen && (
        <div className="md:hidden bg-red-500 mt-2 rounded-md">
          <div className="flex flex-col space-y-2 p-4">
            <div className="relative">

              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1  w-full rounded bg-white text-red-500 focus:outline-none"
              />
              <button className="absolute right-1 top-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4a6 6 0 100 12 6 6 0 000-12zm10 10l-3.5-3.5" />
                </svg>
              </button>
            </div>
            <button className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-200 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10H7V7z" />
              </svg>
            </button>
            <button className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-200">Login</button>
          </div>
        </div>
      )}
     
    </nav>
  );
};


export default Navbar;

