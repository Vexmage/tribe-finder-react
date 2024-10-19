import React, { useEffect } from 'react';

function Map({ lat, lng, markers }) {
  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 8,
      });

      // Clear existing markers before setting new ones
      const currentMarkers = [];

      // Check if markers exist and map them
      if (markers && markers.length > 0) {
        markers.forEach((marker) => {
          const newMarker = new window.google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map,
            title: marker.title,
          });
          currentMarkers.push(newMarker);
        });
      }

      // Optionally, fit the map to show all markers
      if (currentMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        currentMarkers.forEach((marker) => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
      }
    }
  }, [lat, lng, markers]); // Depend on lat, lng, and markers

  return <div id="map" style={{ height: '500px' }} />;
}

export default Map;
