import React,{useEffect,useState} from 'react'
import Layout from '../../Component/layout/Layout'
import axios from 'axios'
import { NavLink } from 'react-router-dom'



const Orderlist = () => {
 const [order, setorder] = useState([])

 
 
useEffect(() => {
  async function order() {
    const userdata= JSON.parse(localStorage.getItem('data'))
    if (userdata.user) {
      console.log(userdata.user._id);
      console.log(userdata.token)
      const {data}=await  axios.get(`http://localhost:3000/order/user-order/${userdata.user._id}`,{ headers:{ "Authorization":`bearer ${userdata.token}`}})
      setorder(data.order)
    }
  }
  order()
  }, [])
  



  return (
    <Layout><div className="p-4 sm:p-8 md:p-16">
    <div className="text-xl font-bold text-gray-900 sm:text-3xl">Order</div>
    <div className="flex flex-col gap-4">
      {order.map((order) => {
        return (
          <div
            key={order._id}
            className="flex flex-col sm:flex-row border items-center gap-4 sm:gap-14 font-semibold w-full px-4 sm:px-5 m-auto"
          >
            <div className="w-16 sm:w-11">
              <img src="shopping.png" alt="shopping.png" />
            </div>
            <div className="flex gap-1 flex-1">
              {order.product.map((product) => {
                return (
                  <div key={product._id}>
                    {product.name} x {product.quantity}
                  </div>
                );
              })}
            </div>
            <div>$ {order.payment.transaction.amount}</div>
            <div>{order.product.length} item</div>
            <div className="flex flex-col sm:flex-row items-center">
              <span id={order._id}></span>
              <span>{order.status}</span>
            </div>
            {order.status === 'delivered' ? (
              <div className="bg-red-700 text-red-900 text-sm font-medium me-2 px-3 cursor-pointer py-1 rounded dark:bg-red-900 dark:text-red-300">
                Track order
              </div>
            ) : (
              <div className="bg-red-100 text-red-800 text-sm font-medium me-2 px-3 cursor-pointer py-1 rounded dark:bg-red-900 dark:text-red-300">
                <NavLink to={'/order/map'}>Track order</NavLink>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
  </Layout>
  )
}

export default Orderlist