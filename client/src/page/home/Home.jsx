import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { FetchDishApi,deleteFooditem } from '../../redux/Slice/Api/food/FetchDishSlice';
import Layout from '../../Component/layout/Layout'
import { setfood,isselected} from '../../redux/Slice/feature/FoodSlice'
import { scrollview } from '../../redux/Slice/feature/scrollSlice';

const Home = () => {
  const [category, setcategory] = useState(['salad','rolls','desserts','sandwich','cake','pure-veg','non-veg','pasta','noddle' ]);
  const dishList=useSelector((state)=>state.foodList)
  const food=useSelector((state)=>state.food )
  const scroll=useSelector((state)=>state.scroll)
  const [selected, setselected] = useState('')
  const scrollref=useRef(null)
  const navigate=useNavigate()
 const dispatch=useDispatch()
  
useEffect(() => {
  const food=JSON.parse(localStorage.getItem('food'))
   if (food) {
    dispatch(setfood(food));
   } else {
    dispatch(FetchDishApi())
   }
   
}, [navigate])

useEffect(() => {
   if (dishList.length>0) {
    dispatch(setfood(dishList))

}
 }, [dishList])   

const quantityHandle=(item,target)=>{
    
 if (target.id=='plus') {
      let newFood=food.map((food)=>{
        if (food._id==item) return {...food,quantity:food.quantity+1 } ;
        return  food 
      })
      dispatch(setfood(newFood));
      const array2Map = new Map(newFood.map(item => [item._id, item]));
      const  array1=JSON.parse(localStorage.getItem('food'))
      const updatedArray1 = array1.map(item => 
          array2Map.has(item._id) ? array2Map.get(item._id) : item
      );
localStorage.setItem('food', JSON.stringify(updatedArray1)); 
      
} else {
  let newFood=food.map((food)=>{
    if (food._id==item) return {...food,quantity:food.quantity>0?food.quantity-1:0} ;
    return  food 
  })
  dispatch(setfood(newFood));
  const array2Map = new Map(newFood.map(item => [item._id, item]));
      const  array1=JSON.parse(localStorage.getItem('food'))
      const updatedArray1 = array1.map(item => 
          array2Map.has(item._id) ? array2Map.get(item._id) : item
      );
localStorage.setItem('food', JSON.stringify(updatedArray1)); 
}}


const selectHHandle=({target})=>{

if (target.id==selected){ 
 const newFood=JSON.parse(localStorage.getItem('food'));
  dispatch(setfood(newFood))
setselected('')
}else{
  setselected(target.id)
  const newFood=JSON.parse(localStorage.getItem('food'));
  const filter=newFood.filter((item)=> target.id==item.category.replaceAll(' ','-'));
 
  dispatch(setfood(filter))
}

}

useEffect(() => {
 if (scroll) {
  scrollref.current.scrollIntoView({ behavior: 'smooth' }) 
  dispatch(scrollview(false))
 }

}, [scroll])



  return (
    <Layout>
  <section
  className="relative bg-[url(hero.avif)] h-96 bg-cover bg-center bg-no-repeat   ">
<div className='z-10 flex  items-center justify-center flex-col h-[inherit] ' >
<h1 className="text-3xl font-extrabold text-white sm:text-5xl">
        Let us find your

        <strong className="block font-extrabold text-rose-500"> Favourite Food </strong>
      </h1>
        <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>
  </div>  
  </section>
  <div className='md:mx-14 mx-2 '  >
    <div className='my-5' >
    <h1  className='text-2xl font-bold text-gray-900'  >Explore our menu</h1>
    <h3 className='text-sm font-medium text-gray-600' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum provident suscipit aut quae non, tenetur id odit.</h3>
    </div>
    <div className='flex gap-10 justify-center  overflow-scroll custom-scrollbar' >
      {category.map((item)=>{
        return  <div  key={item} className='flex gap-2 flex-col justify-center items-center cursor-pointer   transition-all duration-300 hover:border-red-800 '     >
        <div  onClick={selectHHandle} className={item==selected? "relative rounded-full overflow-hidden h-24 w-24 p-1 border-4 border-red-500 ":'relative rounded-full overflow-hidden h-24 w-24 p-1 border-4' }  >
      <img src={`${item}.avif`}  id={item}  className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110 '  alt={item} />
    </div>
    <label   className='hover:text-red-600 transition-colors duration-200'  htmlFor={item}>{ item} </label>
    </div>
      })}
     
     </div>
     <hr  className='my-4'  />
     <div  >
     <h1  className='text-2xl font-bold text-gray-900 my-5'  >Top dish for you</h1>
     <div className='flex gap-5 flex-wrap  justify-start '   ref={scrollref} >
        {food?.map((item)=>{
            return     <div  key={item._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg transition-opacity duration-300 hover:opacity-80 h-72  w-full " src={`http://localhost:3000/menu/image-one/${item._id}`} alt={item.name}  />
            <div className="px-5 pb-5">  
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors duration-200'>{item.name}</h1>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                    </div>
                </div>
                <h5 className="text-base tracking-tight text-gray-900 dark:text-white">{item.discription }</h5>
        
                <div className="flex items-center justify-between mt-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${item.price}</span>
                    <div className="flex bg-gray-200 gap-3  rounded-2xl px-1 items-center  ">
                    {item?.quantity>0?<> <button id='minus' onClick={({target})=>quantityHandle(item._id,target)} className="flex items-center justify-center w-8 h-8 bg-red-200 rounded-full hover:bg-red-300 transition-colors duration-200">
                            <svg   id='minus'  xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                        <div>{item?.quantity}</div> 
                        <button id='plus' 
                        onClick={({target})=>quantityHandle(item._id,target)}
                        className="flex items-center justify-center w-8 h-8 bg-green-200 rounded-full hover:bg-green-300 transition-colors duration-200">
                            <svg   id='plus'    xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </>:<button id='plus' 
                        onClick={({target})=>quantityHandle(item._id,target)}
                        className="flex items-center justify-center w-8 h-8 bg-cyan-200 rounded-full hover:bg-cyan-300 transition-colors duration-200">
                            <svg   id='plus'    xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button> }     
                       
                    </div>
                </div>
            </div>
        </div>

        }) }
     
   </div>
     </div>
    </div>
    </Layout>
  )
}

export default Home