import React, { useState } from 'react';

function ZipForm({ onSubmit }) {
  const [zipcode, setZipcode] = useState("");
  const [tribeCount, setTribeCount] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(zipcode, tribeCount); // Make sure tribeCount is passed correctly
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={zipcode} 
        onChange={(e) => setZipcode(e.target.value)} 
        placeholder="Enter ZIP code" 
        required 
      />
      <div>
        <label>
          <input 
            type="radio" 
            value={5} 
            checked={tribeCount === 5} 
            onChange={() => setTribeCount(5)} 
          /> Nearest 5
        </label>
        <label>
          <input 
            type="radio" 
            value={10} 
            checked={tribeCount === 10} 
            onChange={() => setTribeCount(10)} 
          /> Nearest 10
        </label>
      </div>
      <button type="submit">Find a tribe!</button>
    </form>
  );
}

export default ZipForm;
