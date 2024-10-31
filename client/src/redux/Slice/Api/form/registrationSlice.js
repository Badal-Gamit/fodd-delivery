import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import toast from "react-hot-toast";

export const register=createAsyncThunk(
    'registration-form',
    async(form)=>{
    
       try {
         const {data,status}=await  axios.post('https://food-delivery-backend-dbku.onrender.com/auth/register',form)
        switch (status) {
            case 200:
                document.getElementById('my_modal_2').close()
                toast.success(data.message)
                return data;
               case 201:
                document.getElementById('my_modal_2').close()
            toast.error(data.message)
                 break; }
       } catch (error) {
          toast.error(error.message)
       }
    }
)

const registerSlice=createSlice({
    initialState:{},
    name:"registration-form",
    reducers:{
        clearform:(state,actions)=>{
            return state={}
            }
        },
   extraReducers:(builder)=>{
           builder.addCase(register.fulfilled,(state,actions)=>{
            console.log(actions.payload);
            
            if (!actions.payload?.token) return state={} ;
            localStorage.setItem('data',JSON.stringify(actions.payload))
            return state=actions.payload 

           }).addCase(register.pending,(state,actions)=>{
            return state=true
           })
   }
})

export const {clearform} =registerSlice.actions

export default registerSlice.reducer