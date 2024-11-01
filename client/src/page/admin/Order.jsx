import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux' 
import { fetchOrder } from '../../redux/Slice/Api/admin/fetchorder'
import axios from 'axios'
import toast from 'react-hot-toast'



const Order = () => {
 const  orderList=useSelector((state)=>state.order )
 const [category, setcategory] = useState(['food processing','out for dilivery','dilivered'])
 const dispatch =useDispatch()
  

useEffect(() => {
  dispatch(fetchOrder())
}, [])

const statusHandle=async(e,order)=>{
  console.log(e.target.value ,order._id)

 const {value,id}=e.target
  const {status,data}=await axios.patch(`https://food-delivery-backend-dbku.onrender.com/order/order-change/${order._id}`,{value:value})
 if (status==200){
   
  return toast.success(data.message)
 }
  toast.error(data.message) 
}

  return (
    <>{<div className='flex gap-3 flex-col' >
      {orderList.map((order)=>{
        return  <div key={order._id} className='flex border items-center gap-20 font-semibold  w-fit px-5 m-auto ' >
         <div  className='w-11' >
          <img src="/shopping.png" alt="shopping.png" />
         </div>
         <div>
       <div className='flex gap-1 my-1 flex-col  text-gray-700 ' >{order.product.map((product,i)=>{
          return <div key={product._id} >{product.name}x {product.quantity} {order.product.length==(i+1)?'':","} </div>
         })}</div>
         <p> {order.buyer.name}</p>
         <p> {order.buyer.address}</p>
         <p> {order.buyer.phoneNumber}</p>
         </div>
         <div> $ {order.payment.transaction.amount}</div>
         <div>{order.product.length} item</div>
         <div  >
       <select  className='border'   onChange={(e)=>statusHandle(e,order)} >
        <option  defaultValue={order.status}>{order.status}</option>
        {category.map((i)=>{
         if (order.status!=i)return <option   key={i}  id={ order._id}  value={i} >{i}</option>
       
        })}
       </select>
         </div>
         {console.log(status) }
        </div>
      }) }
      </div> } </>
  )
}

export default Order