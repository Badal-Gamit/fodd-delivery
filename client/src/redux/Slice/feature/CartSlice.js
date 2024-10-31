import { createSlice} from "@reduxjs/toolkit";

const CartSlice=createSlice({
    initialState:[],
    name:"Card",
    reducers:{
        Addcart:(state,actions)=>{
          return  state=actions.payload.filter((item)=>{
               if (item.quantity>0) return item 
          })
        }
    
    }
       
 })

 export default CartSlice.reducer
 export const { Addcart,removefromcart}=CartSlice.actions