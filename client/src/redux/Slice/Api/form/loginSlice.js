import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import toast from "react-hot-toast";
import { connect } from "react-redux";


export const login=createAsyncThunk(
    'login-form',
    async(form)=>{
       try {
         const {data,status}=await  axios.post('https://food-delivery-backend-dbku.onrender.com/auth/login',form)
        switch (status) {
            case 200:
                document.getElementById('my_modal_1').close()
                toast.success(data.message)
                return data;
               case 201:
                document.getElementById('my_modal_1').close()
            toast.error(data.message)
                 break; }
       } catch (error) {
          toast.error(error.message)
       }
    }
)

const loginSlice=createSlice({
    initialState:{},
    name:"login-form",
    reducers:{
        clearstate:(state,actions)=>{
        return state={}
        }
        },

   extraReducers:(builder)=>{
           builder.addCase(login.fulfilled,(state,actions)=>{
            if (!actions.payload?.user) return state={} ;
            localStorage.setItem('data',JSON.stringify(actions.payload))
          return state=actions.payload
           }).addCase(login.pending,(state,actions)=>{
            return state=true
           })
   }
})

export default loginSlice.reducer
export const {clearstate }=loginSlice.actions