import { createSlice} from "@reduxjs/toolkit";

const foodSlice=createSlice({
    initialState:[],
    name:"food-menu",
    reducers:{
        setfood:(state,actions)=>{
          return  state=actions.payload
        },
       isselected:(state,actions)=>{
         return  state.filter((item)=> item.category==actions.payload.replaceAll('-',' '))
       }
      
      }
       
 })

export default  foodSlice.reducer
export const{ setfood,isselected} =foodSlice.actions

