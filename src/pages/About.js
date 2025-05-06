// src/pages/About.js
import React from "react";

export default function About() {
  return (
    <div className="container mt-4">
      <div className="welcome-box">
        <h2>About Tribe Finder</h2>
        <p>
          <strong>Tribe Finder</strong> is a web tool designed to help users locate tribal governments 
          near a given ZIP code within the United States. Whether you're seeking contact information, 
          learning more about local tribes, or working on a project involving tribal communities, this 
          tool offers a quick starting point.
        </p>
        <p>
          Our data is sourced from official directories and geocoded to help you find the closest 
          tribal governments by proximity. Simply enter a ZIP code to see nearby tribes, their names, 
          and approximate distances.
        </p>
        <p>
          This project is a work in progress and will continue to evolve with new features, resources, 
          and improvements based on user feedback and data availability.
        </p>
        <hr />
        <p className="mt-3 text-muted">
          Created by Joel Southall — a web developer and member of the Ojibwe Nation, 
          passionate about community-centered technology and Indigenous language revitalization.
        </p>
      </div>
    </div>
  );
}
