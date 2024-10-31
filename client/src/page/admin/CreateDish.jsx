import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {Dish,createDishApi }  from '../../redux/Slice/Api/food/CreateDishSlice'
import toast from 'react-hot-toast';
const CreateDish = () => {
const [category, setcategory] = useState(['salad','rolls','desserts','sandwich','cake','pure veg','non veg','pasta','noddle' ]);
const [image, setimage] = useState('')
const createdish=useSelector((state)=>state.dish )
const dispatch=useDispatch()


const imageHandle=(e)=>{
setimage(e.target.files[0])
}

const changeHandle=(e)=>{
        dispatch(Dish({[e.target.name]:e.target.value}))} 
 
const submitHandle=(e)=>{
    e.preventDefault()
    if (!image) return  toast.error('select image') 
     if (!createdish.category) return  toast.error('select category')  
        console.log(createdish.category)  
          console.log(image)  
    dispatch(createDishApi({...createdish ,image:image}))
    setimage('')
    if (localStorage.getItem('food')) localStorage.removeItem('food')
    if (localStorage.getItem('product')) localStorage.removeItem('product')
}
    

  return (
    <>
        <div className="relative p-4 w-full max-w-max max-h-full">
     
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
         
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Dish
                </h3>
               
            </div>
            <div className='flex gap-5  items-center '>
            <form className="p-4 md:p-5" onSubmit={submitHandle} >
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name"   onChange={changeHandle}  value={createdish.name?createdish.name:""}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="dish name"  required />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price"  onChange={changeHandle}  value={createdish.price?createdish.price:""}      id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999"   required  />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="category"  required className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id="category"  name='category'  required  onChange={changeHandle}  value={createdish.category?createdish.category:""}     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option  defaultValue={''}  >Select </option>
                            { category.map((category,i)=>{
                                return <option  value={category} key={i}  >{category} </option>
                            })}
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                        <textarea id="description" rows="4"  required  name='discription'     onChange={changeHandle}  value={createdish.discription?createdish.discription:""}      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 resize-none dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {createdish===true?<span className="loading loading-spinner  me-1 -ms-1 w-5 h-5 "></span>:<svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>}
                       Add new Dish
                </button>
            </form>
            
    {image?<div className='   h-64 mr-2 ' >  <label htmlFor="dropzone-file"> <img src={URL.createObjectURL(image)} className='cursor-pointer w-52 h-60 ' alt="" /></label> </div>:<div className="flex items-center justify-center ">
    <label htmlFor="dropzone-file" className=" h-64 mr-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
       
    </label>
  </div>    }
  <input id="dropzone-file" type="file" name='image'  required   onChange={imageHandle}    accept='image/*'  className="hidden" />
  
</div>
        </div>
    </div>
    

  
    </>
  )
}

export default CreateDish