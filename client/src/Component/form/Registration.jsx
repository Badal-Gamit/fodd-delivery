import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { register } from '../../redux/Slice/Api/form/registrationSlice'

const Registration = () => {
    const [form, setform] = useState({})
    const dispatch=useDispatch()

  
const ChangeHandle=(e)=>{
        setform((form)=>{return {...form,[e.target.name]:e.target.value } })
    }
const SubmitHandle=(e)=>{
        e.preventDefault()
       dispatch(register(form))
       setform({})
       }

  return (
    <>
            <dialog id="my_modal_2" className="modal">
  <div className="modal-box">
  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Registration
                </h3>
               
                <button type="button"   onClick={()=>document.getElementById('my_modal_2').close()} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
             
            </div>
  <div className="p-4 md:p-5">
                <form className="space-y-4"  onSubmit={SubmitHandle}  >
                <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input type="text" name="name"   value={form.name?form.name:""}   onChange={ChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">address</label>
                        <input type="text" name="address"  value={form.address?form.address:""}   onChange={ChangeHandle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone Number</label>
                        <input type="text" name="phoneNumber"  value={form.phoneNumber?form.phoneNumber:""}   onChange={ChangeHandle}    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email"   value={form.email?form.email:""}   onChange={ChangeHandle}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" placeholder="••••••••"  value={form.password?form.password:""}   onChange={ChangeHandle}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-start">
                          </div>
                     </div>
                    <button type="submit" className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                     Already have Account? <span onClick={()=>{document.getElementById('my_modal_2').close(); document.getElementById('my_modal_1').showModal()}}   className="text-red-700 hover:underline  hover:cursor-pointer dark:text-red-500">login  account</span>
                    </div>
                </form>
             
            </div>
  </div>
</dialog>
    </>
  )
}

export default Registration