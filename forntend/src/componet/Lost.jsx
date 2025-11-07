import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import From from './From.jsx';
import Item from "./Item.jsx";
import Background from '../assets/background.jpg'
import Bottom from '../assets/bottom.png'
import Navbt from '../assets/btnav.png'

const App = () => {
  const [showContent, setShowContent] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'form', 'items'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //  Initial "LF" animation intro
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      ease: "power4.easeInOut",
      transformOrigin: "50% 50%",
      duration: 1.5,
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 1.5,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() > 0.7) {
          const svg = document.querySelector(".svg");
          if (svg) svg.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  }, []);

  //  Parallax mouse movement (only when landing page shows)
  useEffect(() => {
    if (!showContent || currentView !== 'landing') return;
    
    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "expo.easeInOut",
      delay: -1,
    })
    gsap.to(".sky", {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "expo.easeInOut",
      delay: -0.8,
    })
    gsap.to(".character", {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "expo.easeInOut",
      delay: -0.8,
    })

    const main = document.querySelector(".main");
    if (!main) return;

    const handleMouseMove = (e) => {
      // Only apply parallax on desktop
      if (window.innerWidth > 768) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
        gsap.to(".main .text", { x: `${xMove * 0.4}%` });
        gsap.to(".sky", { x: xMove });
        gsap.to(".bg", { x: xMove * 1.7 });
      }
    };

    main.addEventListener("mousemove", handleMouseMove);
    return () => main.removeEventListener("mousemove", handleMouseMove);
  }, [showContent, currentView]);

  // Handle Login Button Click
  const handleLoginClick = () => {
    setCurrentView('form');
  };

  // Handle Form Submission Success
  const handleFormSuccess = () => {
    console.log('Form success - Setting isLoggedIn to true');
    setIsLoggedIn(true);
    setTimeout(() => {
      console.log('Navigating to items page with isLoggedIn:', true);
      setCurrentView('items');
    }, 1500);
  };

  // Handle Back to Landing
  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('landing');
  };

  return (
    <>
      {/* === SVG INTRO === */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                  className="text-[150px] sm:text-[200px] md:text-[250px]"
                >
                  LF
                </text>
              </g>
            </mask>
          </defs>
          <image
            href={Background}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {/* === MAIN CONTENT === */}
      {showContent && (
        <>
          {/* === LANDING PAGE === */}
          <div className={`main w-full md:rotate-[10deg] md:scale-[1.7] transition-opacity duration-500 ${
            currentView === 'landing' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
          }`}>
            <div className="landing w-full h-screen bg-black relative overflow-hidden">
              {/* Navbar */}
              <div className="navbar w-full py-4 sm:py-6 md:py-10 px-4 sm:px-6 md:px-10 flex justify-between items-center absolute top-0 left-0 z-10">
                <div className="logo flex gap-3 sm:gap-5 md:gap-7 items-center">
                  <div className="lines flex flex-col">
                    <div className="line w-5 sm:w-6 md:w-8 h-0.5 sm:h-0.5 md:h-1 bg-white mb-0.5 sm:mb-0.5 md:mb-1"></div>
                    <div className="line w-4 sm:w-5 md:w-6 h-0.5 sm:h-0.5 md:h-1 bg-white mb-0.5 sm:mb-0.5 md:mb-1"></div>
                    <div className="line w-3 sm:w-3 md:w-4 h-0.5 sm:h-0.5 md:h-1 bg-white"></div>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[Helvetica_Now_Display] text-white">LOFO</h3>
                </div>
                <button 
                  onClick={handleLoginClick}
                  className="text-black bg-white rounded-lg sm:rounded-xl md:rounded-2xl px-3 sm:px-4 md:px-6 text-sm sm:text-base md:text-xl cursor-pointer py-1.5 sm:py-2 font-[Helvetica_Now_Display] hover:bg-gray-200 transition-all hover:scale-105"
                >
                  Login
                </button>
              </div>

              {/* Background images */}
              <div className="imagediv overflow-hidden relative w-full h-screen">
                <img
                  className="sky scale-[1.2] sm:scale-[1.3] md:scale-[1.5] md:rotate-[-20deg] absolute top-0 left-0 w-full h-full object-cover"
                  src={Background}
                  alt="bg"
                />

                {/* Text */}
                <div className="text text-white absolute flex flex-col gap-1 sm:gap-2 md:gap-3 top-[15%] sm:top-[10%] md:top-0 left-1/2 -translate-x-1/2">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] leading-none -ml-10 sm:-ml-20 md:-ml-40">Lost</h1>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] leading-none ml-5 sm:ml-10 md:ml-20">And</h1>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] leading-none -ml-10 sm:-ml-20 md:-ml-40">Found</h1>
                </div>

                {/* Character image */}
                <img
                  className="character absolute bottom-[-10%] sm:bottom-[-15%] md:bottom-[-20%] right-[10%] sm:right-[15%] md:right-[20%] scale-[1.2] sm:scale-[1.5] md:scale-[2] md:rotate-[10deg]"
                  src={Bottom}
                  alt="Character"
                />
              </div>

              {/* Bottom bar */}
              <div className="btmbar w-full bg-gradient-to-t from-white py-4 sm:py-6 md:py-10 px-4 sm:px-6 md:px-10 to-transparent absolute bottom-0 left-0 text-white">
                <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                  <i className="text-lg sm:text-xl md:text-2xl ri-arrow-down-line"></i>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-[Helvetica_Now_Display]">Scroll Down</h3>
                </div>
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50px] sm:h-[70px] md:h-[100px]"
                  src={Navbt}
                  alt="Navigation"
                />
              </div>
            </div>
          </div>

          {/* === FORM PAGE === */}
          <div className={`w-full min-h-screen bg-black transition-opacity duration-500 ${
            currentView === 'form' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
          }`}>
            {/* Header with Back Button */}
            <div className="w-full py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 border-b border-white/10">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <button 
                  onClick={handleBackToLanding}
                  className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-sm sm:text-base"
                >
                  <i className="ri-arrow-left-line text-lg sm:text-xl"></i>
                  <span className="font-[Helvetica_Now_Display]">Back</span>
                </button>
                <h2 className="text-lg sm:text-xl md:text-2xl font-[Helvetica_Now_Display] text-white">
                  Report Lost/Found Item
                </h2>
              </div>
            </div>

            {/* Form Content */}
            <div className="w-full px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
              <From onSuccess={handleFormSuccess} />
            </div>
          </div>

          {/* === ITEMS PAGE === */}
          <div className={`transition-opacity duration-500 ${
            currentView === 'items' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
          }`}>
            {console.log('Rendering Item component with isLoggedIn:', isLoggedIn)}
            <Item 
              isLoggedIn={isLoggedIn} 
              onLogout={handleLogout}
              onReportItem={() => setCurrentView('form')}
            />
          </div>
        </>
      )}
    </>
  );
};

export default App;