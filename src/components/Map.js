import React, { useEffect } from "react";

function Map({ lat, lng, markers }) { // Make sure it's "Map" not "MapComponent"
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error("Google Maps API key is missing.");
      return;
    }

    if (!document.getElementById("map")) {
      console.error("Map container (#map) is missing.");
      return;
    }

    if (!window.google || !window.google.maps) {
      console.error("Google Maps API has not loaded yet.");
      return;
    }

    console.log("Initializing Google Maps...");

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat, lng },
      zoom: 8,
    });

    console.log("Map initialized:", map);

    if (markers && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      markers.forEach(({ lat, lng, title }) => {
        new window.google.maps.Marker({
          position: { lat, lng },
          map,
          title,
        });
        bounds.extend({ lat, lng });
      });

      map.fitBounds(bounds);
    }
  }, [lat, lng, markers]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
}

export default Map; // Ensure this matches your App.js import
