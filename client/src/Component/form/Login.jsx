import React , {useState}from 'react'
import { login } from '../../redux/Slice/Api/form/loginSlice'
import { useSelector,useDispatch } from 'react-redux'

const Login = () => {
    const [form, setform] = useState({})
     const log=useSelector((state)=>state.login)
    const dispatch=useDispatch()
const ChangeHandle=(e)=>{
    setform((form)=>{return {...form,[e.target.name]:e.target.value } })
}

const SubmitHandle=(e)=>{
 e.preventDefault()
dispatch(login(form))
setform({})
}
  return (
    <div>
        <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                </h3>
               
                <button type="button"   onClick={()=>document.getElementById('my_modal_1').close()} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
             
            </div>
  <div className="p-4 md:p-5">
                <form className="space-y-4"  onSubmit={SubmitHandle}  >
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" value={form.email?form.email:""}   onChange={ChangeHandle}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password"  value={form.password?form.password:""}  onChange={ChangeHandle} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-start">
                              </div>
                        </div>
                    <button type="submit" className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">{log===true?<span className="loading loading-spinner loading-xs"></span> :"Login to your account" }</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <span   onClick={()=>{document.getElementById('my_modal_1').close(); document.getElementById('my_modal_2').showModal()}}     className="text-red-700 hover:underline dark:text-red-500 hover:cursor-pointer ">Create account</span>
                    </div>
                </form>
            </div>
  </div>
</dialog>

    </div>
  )
}

export default Login