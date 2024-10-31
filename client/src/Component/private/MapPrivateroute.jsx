import React,{ useState,useEffect} from 'react'
import  { Outlet, useNavigate} from 'react-router-dom'
const MapPrivateroute = () => {
    const [alllow, setalllow] = useState(false)
    const navigate=useNavigate()
useEffect(() => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setalllow(true)
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          },
          (error) => {
            // Error callback
            
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation, please allow access your location for futher proccess" ,);
                navigate('/order-list')
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
            }
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
      

}, [])


  return (alllow)?<Outlet/>: <div></div>
  
}

export default MapPrivateroute