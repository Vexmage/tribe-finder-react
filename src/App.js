import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ZipForm from './components/ZipForm';
import TribeInfo from './components/TribeInfo';
import Map from './components/Map';
import getLocation from './utils/googleMaps';

function App() {
  const [tribes, setTribes] = useState([]);
  const [location, setLocation] = useState({ lat: 44.0108407, lng: -123.0354098 });
  const [markers, setMarkers] = useState([]);

  // Fetch tribe data on initial load or after zip change
  const fetchTribes = async (zipcode) => {
    try {
      const geoData = await getLocation(zipcode); // Call to Google Geocode API
      const lat = geoData.results[0].geometry.location.lat;
      const lng = geoData.results[0].geometry.location.lng;

      // Simulate fetching tribe data (replace with actual GeoJSON fetch)
      const tribeData = await fetch('./assets/TribalLeadership_Directory_3002994166247985726.geojson')
        .then((res) => res.json())
        .then((data) => data.features);

      // Calculate distances and set tribe data
      const updatedTribes = tribeData.map((tribe) => {
        const tribeLat = tribe.geometry.coordinates[1];
        const tribeLng = tribe.geometry.coordinates[0];
        const distance = getDistanceFromLatLonInKm(lat, lng, tribeLat, tribeLng);
        return { ...tribe, distance };
      });

      updatedTribes.sort((a, b) => a.distance - b.distance);

      setLocation({ lat, lng });
      setTribes(updatedTribes.slice(0, 5)); // Show nearest 5 by default

      // Set markers for the map
      setMarkers(
        updatedTribes.slice(0, 5).map((tribe) => ({
          lat: tribe.geometry.coordinates[1],
          lng: tribe.geometry.coordinates[0],
          title: tribe.properties.tribefullname,
        }))
      );
    } catch (error) {
      console.error('Error fetching tribe data or location:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Find Nearby Tribes</h2>
            <ZipForm onSubmit={fetchTribes} />
          </div>
          <div className="col">
            <Map lat={location.lat} lng={location.lng} markers={markers} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TribeInfo tribeData={tribes} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility function to calculate distances
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default App;
