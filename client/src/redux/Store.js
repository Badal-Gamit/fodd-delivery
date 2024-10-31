import {configureStore} from '@reduxjs/toolkit'
import loginSlice from './Slice/Api/form/loginSlice'
import registrationSlice from './Slice/Api/form/registrationSlice'
import CreateDishSlice from './Slice/Api/food/CreateDishSlice'
import FetchDishSlice from './Slice/Api/food/FetchDishSlice'
import CartSlice from './Slice/feature/CartSlice'
import FoodSlice from './Slice/feature/FoodSlice'
import AllOrderSlice from './Slice/Api/admin/fetchorder'
import   scrollSlice  from './Slice/feature/scrollSlice'


export const Store=configureStore({
  reducer:{
    login:loginSlice,
    register:registrationSlice,
    dish:CreateDishSlice,
    foodList:FetchDishSlice,
    Cart:CartSlice,
    food:FoodSlice,
    order:AllOrderSlice,
    scroll:scrollSlice,
    
  }
})