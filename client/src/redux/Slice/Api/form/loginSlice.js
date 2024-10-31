import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import toast from "react-hot-toast";
import { connect } from "react-redux";


export const login=createAsyncThunk(
    'login-form',
    async(form)=>{
       try {
         const {data,status}=await  axios.post('http://localhost:3000/auth/login',form)
        switch (status) {
            case 200:
                document.getElementById('my_modal_1').close()
                toast.success(data.message)
                return data;
               case 201:
                document.getElementById('my_modal_1').close()
            toast.custom(data.message)
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
            if (!actions.payload.user) return;
            localStorage.setItem('data',JSON.stringify(actions.payload))
          return state=actions.payload
           })
   }
})

export default loginSlice.reducer
export const {clearstate }=loginSlice.actions