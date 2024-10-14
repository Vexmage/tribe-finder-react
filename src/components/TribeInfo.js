// src/components/TribeInfo.js
import React from 'react';

function TribeInfo({ tribeData }) {
  return (
    <div className="col order-first bg-warning p-3 m-3 shadow mb-5 rounded-3">
      {tribeData && tribeData.length > 0 ? (
        tribeData.map((tribe, index) => (
          <div key={index}>
            <b>{tribe.properties.tribefullname}</b>
            <p>
              {tribe.properties.physicaladdress}, {tribe.properties.city}, {' '}
              {tribe.properties.state}, {tribe.properties.zipcode}
            </p>
            <p>Leader: {tribe.properties.firstname} {tribe.properties.lastname}</p>
            <p>Email: {tribe.properties.email}</p>
            <p>Distance: {Math.round(tribe.distance)} km / {Math.round(tribe.distance * 0.621371)} mi away.</p>
            {tribe.properties.website && (
              <p>
                <a target="_blank" rel="noreferrer" href={tribe.properties.website}>
                  {tribe.properties.website}
                </a>
              </p>
            )}
          </div>
        ))
      ) : (
        <p>No tribes to display yet.</p>
      )}
    </div>
  );
}

export default TribeInfo;
