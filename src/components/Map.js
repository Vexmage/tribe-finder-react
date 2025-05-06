import React, { useEffect, useRef } from "react";

function Map({ lat, lng, markers }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize map once when Google Maps is available
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not available yet.");
      return;
    }

    if (!mapRef.current || mapInstanceRef.current) return;

    console.log("Initializing Google Maps...");
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 8,
    });
  }, []);

  // Update map center and redraw markers when props change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !window.google || !window.google.maps) return;

    map.setCenter({ lat, lng });

    // Clear old markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    const bounds = new window.google.maps.LatLngBounds();

    markers.forEach(({ lat, lng, title }) => {
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title,
      });
      markersRef.current.push(marker);
      bounds.extend({ lat, lng });
    });

    if (markers.length > 0) {
      map.fitBounds(bounds);
    }
  }, [lat, lng, markers]);

  return <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }} />;
}

export default Map;
