// src/utils/googleMaps.js
const apiKey = "AIzaSyCjWVoq40J7jeA5MbvLpWlkUWiJGmKz84s";  // Replace with your actual API key

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?region=us&address=`;

export default async function getLocation(zipcode) {
  const response = await fetch(`${geocodeUrl}${zipcode}&key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
}
