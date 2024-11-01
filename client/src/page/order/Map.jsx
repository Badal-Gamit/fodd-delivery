import Layout from '../../Component/layout/Layout'
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


const Map = () => {
    const [userLocation, setUserLocation] = useState(null);
  const destination = [21.1104, 73.3861];


useEffect(() => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(position.coords)
            setUserLocation([latitude, longitude]);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }

     
}, [])

useEffect(() =>{
      if (userLocation) {
    var map = L.map('map').setView(userLocation, 14); 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]), 
        L.latLng(destination[0], destination[1])
     ],
      routeWhileDragging: true,
    }).addTo(map);

    
   L.marker(userLocation).addTo(map).bindPopup('Your Location').openPopup();
 L.marker(destination).addTo(map).bindPopup('tomato').openPopup();
 
 return () => {
  if (map) {
    map.removeControl(routingControl);
  }
}
  }

  
}, [userLocation]);


  return (
    <Layout>
          <div id="map" style={{ height: '100vh', width: '100%' }}></div>
    </Layout>
  )
}

export default Map