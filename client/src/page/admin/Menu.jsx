import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { FetchDishApi,deleteFooditem } from '../../redux/Slice/Api/food/FetchDishSlice';


const Menu = () => {
const dishList=useSelector((state)=>state.foodList)
const [isdeleting, setisdeleting] = useState('')
const dispatch=useDispatch()

useEffect(() => {
 dispatch(FetchDishApi())
console.log(isdeleting)
 return ()=>{
   if (isdeleting)setisdeleting('')
 }
}, [])

const handleActionClick=(id)=>{
  setisdeleting(id)
  dispatch(deleteFooditem(id))
  if (localStorage.getItem('food')) localStorage.removeItem('food')
  if (localStorage.getItem('product')) localStorage.removeItem('product')
}



  return (
    <div>
    <h2 className='text-xl mb-4 font-serif text-center'>Food List</h2>
    <table className='min-w-full bg-white border border-gray-300' style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
      <thead>
        <tr className='bg-gray-200 text-left'>
          <th className='p-2'>Image</th>
          <th className='p-2'>Name</th>
          <th className='p-2'>Category</th>
          <th className='p-2'>Price</th>
          <th className='p-2'>menu</th>
        </tr>
      </thead>
      <tbody>
        {dishList.map((item) => (
          <tr key={item._id} className='border-b border-gray-200 hover:bg-gray-100 transition duration-200'>
            <td className='p-2'>
              <img src={`https://food-delivery-backend-dbku.onrender.com/menu/image-one/${item._id}`} alt={item.name} className='w-24 h-24 object-cover rounded-md' />
            </td>
           
            <td className='p-2'>{item.name}</td>
            <td className='p-2'>{item.category}</td>
            <td className='p-2'>{item.price}</td>
            <td className='p-2'>
            {isdeleting==item._id?<span className="loading loading-spinner text-error"></span> :  <button
                onClick={()=>handleActionClick(item._id) }>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button> } 
              
             </td>
            </tr>
        ))}
      </tbody>
    </table>
   
  </div>
  )
}

export default Menu