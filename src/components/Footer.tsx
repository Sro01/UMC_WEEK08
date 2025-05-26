// import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-text">
        <p>
          &copy; {new Date().getFullYear()}, Shop Sasha Alex Sloan Powered by
          Shopify
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link to={"#"}>Privacy Policy</Link>
          <Link to={"#"}>Terms of Service</Link>
          <Link to={"#"}>Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
