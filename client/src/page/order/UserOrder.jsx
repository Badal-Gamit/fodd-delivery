import React, { useState, useEffect } from 'react'
import Layout from '../../Component/layout/Layout'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import dropin from 'braintree-web-drop-in' 
import toast from 'react-hot-toast'


const UserOrder = () => {
  const [form, setform] = useState({})
  const [token, settoken] = useState('')
  const [total, settotal] = useState(0)
  const [loading, setloading] = useState(false)
  const [clientToken, setclientToken] = useState('')
  const [DropinInstance, setDropinInstance] = useState('')
  const Cart = useSelector((state) => state.Cart)


  const DiliveryInformation = () => {
    const data = JSON.parse(localStorage.getItem('data'))
    if (data.user) {
      setform(data.user);
      settoken(data.token)
    }
  }
  useEffect(() => {
      DiliveryInformation()
      settotal(JSON.parse(localStorage.getItem('total')))
     
     
  }, [])

  const ChangeHandle = (e) => {
    setform((form) => { return { ...form, [e.target.name]: e.target.value } })
  }
  const updateHandle = async (e) => {

    try {
      const { data } = await axios.post('http://localhost:3000/auth/update', form, { headers: { 'Authorization': `Bearer ${token}`, } })
      toast.success(data.message);
      const NewProfile = { user: data.user, token: token }
      localStorage.setItem('data', JSON.stringify(NewProfile))
      DiliveryInformation()
    } catch (error) {
      console.log(error.message)
    }
  }

  const SubTotal = () => {
    if (localStorage.getItem('total')) {
       return  JSON.parse(localStorage.getItem('total'))
    }}



const ClienttokkenHandle=async()=>{
 try {
  const {data} =await  axios.get('http://localhost:3000/order/client-token',{ headers:{ "Authorization":`bearer ${token}`}})
   setclientToken(data.clientToken)
   dropin.create({
    authorization:data.clientToken,
    container: '#dropin-container',
  }, (err, instance) => {
    if (err) {
      console.error(err);
      return;
    }
    setloading(false)
    setDropinInstance(instance);
  })
 } catch (error) {
console.log(error)
 }
 }
const paymentHandle=async()=>{
 try {
  const product=JSON.parse(localStorage.getItem('product'))
  const { nonce } = await DropinInstance.requestPaymentMethod(); 
const  {data,status} =await   axios.post(`http://localhost:3000/order/user-checkout/${form._id}`,{amount:total,product,nonce},{ headers:{ "Authorization":`bearer ${token}`}});
   if (status==200) {
    console.log(data.response)
   return   toast.success(data.message)
   }
   return toast.error(data.message)
 } catch (error) {
  console.log(error)
 }
 
}
  return (
    <Layout>
      <div className='flex flex-col sm:flex-row gap-4 p-4 sm:p-7'>
  <div className='w-full sm:w-1/2 border-gray-200 border-r'>
    <div className='font-bold text-3xl py-2'>Delivery Information</div>
    <form className='w-full max-w-xs'>
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
        <input
          type="text"
          name="name"
          value={form.name || ""}
          onChange={ChangeHandle}
          className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          disabled
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input
          type="email"
          name="email"
          value={form.email || ""}
          onChange={ChangeHandle}
          className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          disabled
        />
      </div>
    </form>
    <div>
      <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
      <div className='flex items-center gap-2 flex-col sm:flex-row'>
        <input
          type="text"
          name="address"
          value={form.address || ""}
          onChange={ChangeHandle}
          className="bg-gray-50 border w-full sm:w-96 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Enter your address"
          required
        />
        <button
          type="button"
          onClick={updateHandle}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-2 sm:mt-0"
        >
          Update Address
        </button>
      </div>
    </div>
    <div>
      <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
      <div className='flex items-center gap-2 flex-col sm:flex-row'>
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber || ""}
          onChange={ChangeHandle}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-96 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Enter your phone number"
          required
        />
        <button
          type="button"
          onClick={updateHandle}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-2 sm:mt-0"
        >
          Update Number
        </button>
      </div>
    </div>
  </div>

  <div className="w-full max-w-lg flex flex-col space-y-4">
    <div className="space-y-0.5 text-sm text-gray-700">
      <div className="flex justify-start">
        <dt className='font-semibold text-4xl'>Cart Total</dt>
      </div>
      <hr />
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd>{total}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Delivery Charges</dt>
        <dd>$5</dd>
      </div>
      <div className="flex justify-between font-medium">
        <dt>Total</dt>
        <dd>{total + 5}</dd>
      </div>
     {DropinInstance?<div className="block rounded bg-gray-900 px-5 py-3 text-sm text-gray-300 transition  text-center cursor-pointer" >disabled</div>:<span onClick={() => setloading(true)}>
      <div className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 text-center cursor-pointer" onClick={ClienttokkenHandle}>
       {loading ? "Processing..." : "Proceed to Payment"}
     </div>
   </span>}  
    </div>
    <div id="dropin-container"></div>
    {DropinInstance && (
      <button
        onClick={paymentHandle}
        className="transition-background inline-flex h-12 items-center justify-center rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        Pay
      </button>
    )}
  </div>
  {console.log(clientToken)}
</div>

    </Layout> 
  )
}

export default UserOrder