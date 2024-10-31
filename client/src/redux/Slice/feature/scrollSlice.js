import { createSlice } from "@reduxjs/toolkit";

const scrollSlice=createSlice({
    initialState:false,
    name:'scroll-view',
    reducers:{
        scrollview:(state,actions)=>{
        return state=actions.payload
        }
    }
})
export const {scrollview }=scrollSlice.actions
export default scrollSlice.reducer;
