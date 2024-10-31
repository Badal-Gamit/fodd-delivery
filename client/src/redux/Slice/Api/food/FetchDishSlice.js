import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const FetchDishApi=createAsyncThunk(
    'fetch-dish',
    async()=>{
      try {
 const   {data} =await axios.get('http://localhost:3000/menu/fetch-menu')
      return data
        } catch (error) {
        console.log(error)
      } }
    
    )

export const deleteFooditem=createAsyncThunk(
  'delete-dish',
  async(id)=>{
    try {
const   {data,status} =await axios.delete(`http://localhost:3000/menu/delete-menu/${id}`)
       if (status==200) {
         toast.success(data.message)
         return id
       } 
      } catch (error) {
      console.log(error)
    } }

)

const FetchSlice=createSlice({
    initialState:[],
    name:"dish",
    reducers:{},
        extraReducers:(builder)=>{
               builder.addCase(FetchDishApi.fulfilled,(state,actions)=>{
                localStorage.setItem('food',JSON.stringify(actions.payload.menu))
                      return state=actions.payload.menu
               }).addCase(deleteFooditem.fulfilled,(state,actions)=>{
                console.log(actions.payload)
                  return state.filter(item => item._id!=actions.payload);
  } )
        }
    })

export  default FetchSlice.reducer
