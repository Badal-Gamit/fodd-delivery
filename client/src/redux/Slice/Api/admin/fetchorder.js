import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const  fetchOrder=createAsyncThunk(
    'fetch-order',
    async()=>{
       try {
         const {data,status}=await  axios.get('https://food-delivery-backend-dbku.onrender.com/order/order-list')
       return data
       } catch (error) {
          toast.error(error.message)
       }
    }
)

const AllOrderSlice=createSlice({
    initialState:[],
    name:"fetch-order",
    reducers:{
        },
   extraReducers:(builder)=>{
           builder.addCase(fetchOrder.fulfilled,(state,actions)=>{
            console.log(actions.payload);
          return   state=actions.payload.order
           }
        )
   }
})

export default AllOrderSlice.reducer