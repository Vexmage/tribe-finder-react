// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TribeInfo from './components/TribeInfo';
import './styles.css';  // Include your global styles here

function App() {
  // Mock tribe data for now
  const [tribeData, setTribeData] = useState([
    {
      properties: {
        tribefullname: 'Absentee Shawnee Tribe',
        physicaladdress: '2025 S Gordon Cooper Dr',
        city: 'Shawnee',
        state: 'OK',
        zipcode: '74801',
        firstname: 'John',
        lastname: 'Johnson',
        email: 'jjohnson@astribe.com',
        website: 'https://astribe.com',
      },
      distance: 120,
    },
    // Add more mock tribe data if needed
  ]);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <h2>Tribe Information</h2>
        <TribeInfo tribeData={tribeData} />
      </div>
    </div>
  );
}

export default App;
