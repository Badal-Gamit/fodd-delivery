import  { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './page/home/Home'
import PagenotFound from './page/home/PagenotFound'
import AdminprivateRoute from './Component/private/AdminprivateRoute'
import AdminHome from './page/admin/AdminHome'
import AdminDashboard from './page/admin/AdminDashboard'
import Menu from './page/admin/Menu'
import Order from './page/admin/Order'
import CreateDish from './page/admin/CreateDish'
import Cart from './page/order/Cart'
import UserOrder from './page/order/UserOrder'
import UserPrivateRoutes from './Component/private/UserPrivateRoutes'
import Orderlist from './page/order/Orderlist'
import Map from './page/order/Map'
import MapPrivateroute from './Component/private/MapPrivateroute'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
    <Route  path='/' element={<Home/>} />
     <Route  path='/dashboard' element={<AdminprivateRoute/>}  >
     <Route  path='' element={<AdminHome/>} >
     <Route  path='admin' element={<AdminDashboard/>} />
     <Route  path='menu' element={<Menu/>} />
     <Route  path='order' element={<Order/>} />
     <Route  path='create-dish' element={<CreateDish/>} />
     </Route>
     </Route>
     <Route  path='/cart' element={<Cart/>} />
   <Route   path='' element={<UserPrivateRoutes/>} >
    <Route  path='/order' element={<UserOrder/>} />
    <Route  path='/order-list' element={<Orderlist/>} />
    <Route  path='/order/map' element={ <MapPrivateroute/>}  >
    <Route  path='' element={<Map/>} />
    </Route>
    </Route>
    
    <Route  path='/*' element={<PagenotFound/>} />
</Routes>
    </>
  )
}

export default App
