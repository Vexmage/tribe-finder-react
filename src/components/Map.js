// src/components/Map.js
import React, { useEffect } from 'react';

function Map({ lat, lng, markers }) {
  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 8,
      });

      markers.forEach((marker) => {
        new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map,
          title: marker.title,
        });
      });
    }
  }, [lat, lng, markers]);

  return <div id="map" style={{ height: '500px' }} />;
}

export default Map;
