// import React from 'react';

import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  console.log(scrollY);
  return (
    <div className="page">
      <div>
        <h1>ThrottlePage</h1>
        <p>ScrollY: {scrollY}</p>
      </div>
    </div>
  );
};

export default ThrottlePage;
