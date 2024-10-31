import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux' 
import { fetchOrder } from '../../redux/Slice/Api/admin/fetchorder'
import { Line } from 'react-chartjs-2';
import {Chart as chartjs, LinearScale,PointElement,LineElement,Title,Tooltip,Legend,CategoryScale} from 'chart.js'

chartjs.register(LinearScale,PointElement,LineElement,Title,Tooltip,Legend,CategoryScale)

const AdminDashboard = () => {
  const [order, setorder] = useState([]);
  const [date, setdate] = useState([])
  const dispatch=useDispatch()
  const  orderList=useSelector((state)=>state.order )

useEffect(() => {
  dispatch(fetchOrder())

}, [])
useEffect(() => {
  if (orderList) {
     const buyerdate=orderList.map((order)=>{
      let  date = new Date(order.createdAt)
       date.setDate(date.getDate())
      return {...order,createdAt:date.toLocaleDateString()}
      
      })
    
setorder(buyerdate)
  }
}, [orderList])

useEffect(() => {
 
  const generateLast30Days = () => {
    const today = new Date();
    const dates = [];
    for (let i = 14; i >=0; i--) {
      const date = new Date(today);
      
     date.setDate(today.getDate() - i);
     dates.push(date.toLocaleDateString()); // Format as needed
    }
    console.log(dates)
    setdate(dates)
    return dates;
  };
  generateLast30Days()
}, [])

 const dataplot=()=>{
  const plot=new Map(order.map((order)=>[order.createdAt,order.payment.transaction.amount]));
  const result=date.map((date)=>plot.has(date)?plot.get(date):0)
  return result;
 }
  

 


  const data = {
    labels: date,
    datasets: [
      {
        label: 'Sales ($)',
        data: dataplot(),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(100, 100, 192, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max:100,
      },
    },
  };

  
  const totalRevenue = order.reduce((acc, order)=> acc + order.payment.transaction.amount, 0); 
  const productionOrder = order.filter((order)=>order.status!='dilivered')
  const diliveredOrder = order.filter((order)=>order.status=='dilivered')

  return (
    <div className="p-6  bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className='grid grid-cols-3' > 
        <div className='col-span-2' >
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Revenue by week</h2>
      <Line data={data} options={options} />
      </div >
      </div>
      <div className='col-span-1 mt-1' >
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 text-center">
        <h2 className="text-lg font-semibold text-gray-700">Total Revenue</h2>
        <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
      </div>
     
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6 text-center">
        <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
        <p className="text-2xl font-bold text-blue-600">{order.length}</p>
      </div>
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6 text-center">
        <h2 className="text-lg font-semibold text-gray-700">Order in poccess </h2>
        <p className="text-2xl font-bold  text-teal-700 ">{productionOrder.length}</p>
      </div> 
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6 text-center">
        <h2 className="text-lg font-semibold text-gray-700"> dilivered order</h2>
        <p className="text-2xl font-bold  text-teal-700 ">{diliveredOrder.length}</p>
      </div> 
      </div>
      
      </div>
    </div>

  )
}

export default AdminDashboard