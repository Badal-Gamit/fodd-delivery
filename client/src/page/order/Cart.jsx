import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Layout from '../../Component/layout/Layout'
import {Addcart}   from '../../redux/Slice/feature/CartSlice'
import { NavLink } from 'react-router-dom'

const Cart = () => {
  const Cart=useSelector((state)=>state.Cart )
const [cartimg, setcartimg] = useState('cart')
  const dispatch=useDispatch()
useEffect(() => {

    const food =JSON.parse(localStorage.getItem('food'))
  if (food) {
    dispatch(Addcart(food));
  }
 }, [])
 useEffect(() => {
  localStorage.setItem('product',JSON.stringify(Cart))
 }, [Cart])
 

const removeQuantity=(id)=>{
  console.log(id)
  const food =JSON.parse(localStorage.getItem('food'));
  let newfood=food.map((item)=>{
     if (item._id==id) return {...item ,quantity:0}
     return item 
  })
  localStorage.setItem('food',JSON.stringify(newfood));
  dispatch(Addcart(newfood));
}
const SubTotal=()=>{
  let subtotal=0;
  Cart.map((item)=>{
  subtotal+=item.price*item.quantity
  })
  localStorage.setItem('total',subtotal)
  return subtotal
}

  return (
    <Layout>
      {Cart.length>0? <div>
            <div  className="text-xl font-bold text-gray-900 sm:text-3xl text-center my-2" > Your Cart </div>
        <table className=' w-1/2 bg-white m-auto ' style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
      <thead>
        <tr className=' text-left'>
          <th className='p-2'>item</th>
          <th className='p-2'>Name</th>
          <th className='p-2'>quantity</th>
          <th className='p-2'>Price</th>
          <th className='p-2'>Total</th>
          <th className='p-2'>remove</th>
        </tr>
      </thead>
      <tbody>
       {Cart.map((item)=>{
        return   < tr  key={item._id} className='border-b border-gray-200 hover:bg-gray-100 transition duration-200'>
        <td className='p-2'>
          <img src={`https://food-delivery-backend-dbku.onrender.com/menu/image-one/${item._id}`} alt={item.name} className='w-24 h-24 object-cover rounded-md' />
        </td>
        <td className='p-2'>{item.name}</td>
        <td className='p-2'>{item.quantity}</td>
        <td className='p-2'>${item.price}</td>
        <td className='p-2'>${item.price*item.quantity}</td>
        <td className='p-3'>
          <button  onClick={()=>removeQuantity(item._id)} >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
       
        </td>
      </tr>
       }) } 
          </tbody>
    </table>
    <div className="mx-10 mt-5 flex justify-end border-t border-gray-100 pt-8">
          <div className="w-screen max-w-lg space-y-4">
            <dl className="space-y-0.5 text-sm text-gray-700">
            <div className="flex justify-start">
                <dt className='font-semibold text-4xl' >Cart Total</dt>
               </div>
               <hr />
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{SubTotal()} </dd>
              </div>
<div className="flex justify-between">
          <dt>dilivery charges</dt>
                <dd>$5</dd>
              </div>
<div className="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>{SubTotal()+5}</dd>
              </div>
            </dl>
             <div className="flex justify-end">
              <NavLink
           to={'/order'}
                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Checkout
              </NavLink>
            </div>
          </div>
        </div>
    
     
        </div>: <div>
          <div className={`bg-[url(https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0)] bg-center h-64 bg-no-repeat`}></div>
          <div className='text-center font-semibold my-5 text-3xl'>you zero item in cart</div>
        </div>  } 
    </Layout>
  )
}

export default Cart