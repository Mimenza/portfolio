import React, { use, useEffect, useState } from "react";

import { FaCircle } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";

import EmSvg from "../../ui/emSvg";

import { useNavigate } from "react-router-dom";
import { useVariablesContext } from "../../../context/variablesContext";

interface MenuProps {
  selectedSection: number; // 0 for Home, 1 for About, 2 for Projects
}

const Menu: React.FC<MenuProps> = ({ selectedSection }) => {
  const {
    scrollPosition,
    darkMode,
    setDarkMode,
    customScroll,
    setCustomScroll,
    phoneView,
    setPhoneView
  } = useVariablesContext();
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState<number | null>(null); // Track the active icon
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state
  const [showCloud, setShowCloud] = useState(true);
  const [cloudPosition, setCloudPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const cloudText =
    "Activate a beta custom scroll here! Click to toggle it on/off.";

  const mouseBtnRef = React.useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setTimeout(() => setActiveIcon(selectedSection), 100); // Animate to size 100 on load
  }, [selectedSection]);

  useEffect(() => {
    // Solo calcula la posición si la nube debe mostrarse y el botón existe
    if (showCloud && mouseBtnRef.current) {
      const rect = mouseBtnRef.current.getBoundingClientRect();
      setCloudPosition({
        top: rect.bottom + window.scrollY + 12,
        left: rect.left + window.scrollX - 40, // Ajusta para centrar la nube respecto al botón
      });
    }
  }, [showCloud, selectedSection, customScroll]);

  const handleNavigation = (index: number) => {
    setTimeout(() => {
      if (index === 0) navigate("/home");
      else if (index === 1) navigate("/about");
      else if (index === 2) navigate("/projects");
    }, 250); // Delay for animation
  };

  const handleIconClick = (index: number) => {
    if (activeIcon === index) return; // Prevent shrinking the same active icon
    setIsAnimating(true); // Start shrinking animation
    setTimeout(() => {
      setActiveIcon(index); // Set the new active icon after shrinking
      setIsAnimating(false); // Reset animation state
      handleNavigation(index);
    }, 300); // Match the animation duration
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
    if (darkMode) {
      document.documentElement.classList.remove("dark"); // Desactivar modo oscuro
      document.documentElement.classList.remove("scrollbar-dark");
      document.documentElement.classList.add("scrollbar-light");
    } else {
      document.documentElement.classList.remove("scrollbar-light");
      document.documentElement.classList.add("dark"); // Activar modo oscuro
      document.documentElement.classList.add("scrollbar-dark");
      
    }
  };

  // Calculate styles based on scroll position
  const normalizedScroll = Math.min(scrollPosition / 150, 1); // Normalize scroll position to a range of 0 to 1
  const bgOpacity = normalizedScroll * 0.9; // Gradual opacity up to 0.5
  const width =
    normalizedScroll < 1
      ? `calc(100% - ${normalizedScroll * (window.innerWidth - 950)}px)`
      : "400px"; // Gradual width reduction from 100% to 400px
  const border = `1px solid rgba(11, 11, 13, ${normalizedScroll})`; // Border with dynamic opacity
  const isDark = document.documentElement.classList.contains("dark");
  const backgroundColor = isDark ? "#0b0b0d" : "#ababab";

  interface HexToRgbaParams {
    hex: string;
    opacity: number;
  }

  const hexToRgba = (
    hex: HexToRgbaParams["hex"],
    opacity: HexToRgbaParams["opacity"]
  ): string => {
    hex = hex.replace("#", "");

    // Soporta shorthand (#fff)
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className="fixed h-20 inset-0 mx-[20px] sm:mx-[100px] 2xl:mx-[400px] z-20 justify-center items-center flex">
      <div
        className="p-2 rounded-full flex flex-row items-center justify-between transition-all duration-300"
        style={{
          width: width,
          border: border,
          backgroundColor: hexToRgba(backgroundColor, bgOpacity),
        }}
      >
        {/* <p className="text-text_primary dark:text-dark-text_primary text-2xl-custom ">
          EM
        </p> */}
        <EmSvg/>
        <div className="flex flex-row gap-1 lg:gap-4 xs:text-xs-custom md:text-lg-custom">
          <p
            className={`flex flex-row items-center gap-1 cursor-pointer ${
              selectedSection === 0
                ? "text-text_primary dark:text-dark-text_primary"
                : "text-text_secondary dark:text-dark-text_secondary hover:text-text_primary dark:hover:text-dark-text_primary"
            }`}
            onClick={() => handleIconClick(0)}
          >
            <span className="inline-block w-4 h-4 flex items-center justify-center">
              {selectedSection === 0 && (
                <FaCircle
                  className={`h-2 w-2 text-secondary transition-transform duration-300 ${
                    activeIcon === 0 ? "scale-100" : "scale-0"
                  }`}
                />
              )}
            </span>
            Home
          </p>
          <p
            className={`flex flex-row items-center gap-1 cursor-pointer ${
              selectedSection === 1
                ? "text-text_primary dark:text-dark-text_primary"
                : "text-text_secondary dark:text-dark-text_secondary hover:text-text_primary dark:hover:text-dark-text_primary"
            }`}
            onClick={() => handleIconClick(1)}
          >
            <span className="inline-block w-4 h-4 flex items-center justify-center">
              {selectedSection === 1 && (
                <FaCircle
                  className={`h-2 w-2 text-secondary transition-transform duration-300 ${
                    activeIcon === 1 ? "scale-100" : "scale-0"
                  }`}
                />
              )}
            </span>
            About
          </p>
          <p
            className={`flex flex-row items-center gap-1 cursor-pointer ${
              selectedSection === 2
                ? "text-text_primary dark:text-dark-text_primary"
               : "text-text_secondary dark:text-dark-text_secondary hover:text-text_primary dark:hover:text-dark-text_primary"
            }`}
            onClick={() => handleIconClick(2)}
          >
            <span className="inline-block w-4 h-4 flex items-center justify-center">
              {selectedSection === 2 && (
                <FaCircle
                  className={`h-2 w-2 text-secondary transition-transform duration-300 ${
                    activeIcon === 2 ? "scale-100" : "scale-0"
                  }`}
                />
              )}
            </span>
            Projects
          </p>
        </div>
          <div
            className="text-text_primary dark:text-dark-text_primary text-2xl-custom cursor-pointer transition-all duration-300 ease-in-out transform ml-8"
            onClick={handleDarkModeToggle}
          >
            <span
              key={darkMode ? "sunny" : "moon"}
              className="transition-opacity duration-300 ease-in-out opacity-100"
            >
              {darkMode ? <IoIosSunny /> : <IoMoon />}
            </span>
          </div>
      </div>
    </div>
  );
};

export default Menu;
