// src/utils/googleMaps.js
const geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?region=us&address=";

export default async function getLocation(zipcode) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;  
    if (!apiKey) {
        console.error('API key is missing or undefined');
        return;
    }

    let response = await fetch(`${geocodeUrl}${zipcode}&key=${apiKey}`);
    
    if (!response.ok) {
        throw new Error(`API call failed. ${response.status}`);
    } else {
        return await response.json();
    }
}
