import React from 'react';

function Footer() {
  return (
    <footer className="bg-danger text-white text-center py-3 mt-5">
      <div className="container">
        <small>&copy; {new Date().getFullYear()} Tribe Finder • Built by Joel Southall</small>
      </div>
    </footer>
  );
}

export default Footer;
