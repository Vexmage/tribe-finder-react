// src/components/ZipForm.js
import React, { useState } from 'react';

function ZipForm({ onSubmit }) {
  const [zipcode, setZipcode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(zipcode);  // Pass the entered ZIP code to the parent
  };

  return (
    <form onSubmit={handleSubmit} id="zipForm">
      <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        placeholder="Enter ZIP code"
        className="form-control"
        required
      />
      <button type="submit" className="btn btn-success mt-2">Find a tribe!</button>
    </form>
  );
}

export default ZipForm;
