import React, { useState, useEffect } from "react";
import ZipForm from "../components/ZipForm";
import TribeInfo from "../components/TribeInfo";
import Map from "../components/Map";
import getLocation from "../utils/googleMaps";

function Home() {
  const [tribes, setTribes] = useState([]);
  const [location, setLocation] = useState({ lat: 44.0108407, lng: -123.0354098 });
  const [markers, setMarkers] = useState([]);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Google Maps API Key is missing!");
      return;
    }

    if (window.google && window.google.maps) {
      console.log("Google Maps already loaded.");
      setIsApiLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com/maps/api/js?key="]`
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        setIsApiLoaded(true);
      });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("Google Maps API has been loaded.");
      setIsApiLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  const fetchTribes = async (zipcode, count = 5) => {
    console.log("fetchTribes called with ZIP code:", zipcode);

    try {
      const geoData = await getLocation(zipcode);
      if (geoData && geoData.results.length > 0) {
        const lat = geoData.results[0].geometry.location.lat;
        const lng = geoData.results[0].geometry.location.lng;

        const response = await fetch("/TribalLeadership_Directory_3002994166247985726.geojson");
        const tribeData = await response.json();

        const updatedTribes = tribeData.features.map((tribe) => {
          const tribeLat = tribe.geometry.coordinates[1];
          const tribeLng = tribe.geometry.coordinates[0];
          const distance = getDistanceFromLatLonInKm(lat, lng, tribeLat, tribeLng);
          return { ...tribe, distance };
        });

        updatedTribes.sort((a, b) => a.distance - b.distance);

        setLocation({ lat, lng });
        setTribes(updatedTribes.slice(0, count));
        setMarkers(
          updatedTribes.slice(0, count).map((tribe) => ({
            lat: tribe.geometry.coordinates[1],
            lng: tribe.geometry.coordinates[0],
            title: tribe.properties.tribefullname,
          }))
        );
      } else {
        console.error("No results found in the Geocode API response.");
      }
    } catch (error) {
      console.error("Error fetching tribe data or location:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Find Nearby Tribes</h2>
          <ZipForm onSubmit={fetchTribes} />
        </div>
      </div>

      {isApiLoaded ? (
        <div className="tribe-map-section">
          <div className="map-box">
            <Map lat={location.lat} lng={location.lng} markers={markers} />
          </div>
          {tribes.length > 0 && (
            <div className="info-box">
              <TribeInfo tribeData={tribes} />
            </div>
          )}
        </div>
      ) : (
        <p>Loading Google Maps...</p>
      )}
    </div>
  );
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default Home;
