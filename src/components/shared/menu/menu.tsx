import React, { use, useEffect, useState } from "react";

import { FaCircle } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";

import { PiMouseScroll } from "react-icons/pi";
import { PiMouseScrollFill } from "react-icons/pi";

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
    }, 500); // Delay for animation
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
    } else {
      document.documentElement.classList.add("dark"); // Activar modo oscuro
    }
  };

  // Calculate styles based on scroll position
  const normalizedScroll = Math.min(scrollPosition / 150, 1); // Normalize scroll position to a range of 0 to 1
  const bgOpacity = normalizedScroll * 0.9; // Gradual opacity up to 0.5
  const width =
    normalizedScroll < 1
      ? `calc(100% - ${normalizedScroll * (window.innerWidth - 700)}px)`
      : "440px"; // Gradual width reduction from 100% to 400px
  const gap = `${80 - normalizedScroll * 60}px`; // Gradual gap reduction from 80px to 20px
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

  useEffect(() => {
    const updateCloudPosition = () => {
      if (showCloud && mouseBtnRef.current) {
        const rect = mouseBtnRef.current.getBoundingClientRect();
        setCloudPosition({
          top: rect.bottom + 12,
          left: rect.left - 40,
        });
      }
    };

    // Actualiza la posición al montar y cada vez que cambian las dependencias
    updateCloudPosition();

    // Escuchar scroll y resize para actualizar la posición en tiempo real
    window.addEventListener("scroll", updateCloudPosition);
    window.addEventListener("resize", updateCloudPosition);

    // Cleanup para evitar fugas de memoria
    return () => {
      window.removeEventListener("scroll", updateCloudPosition);
      window.removeEventListener("resize", updateCloudPosition);
    };
  }, [showCloud, selectedSection, customScroll]);

  // py-5 fixed inset-0 mx-[250px] bg-blue-200 z-20 justify-center items-center
  return (
    <div className="fixed h-20 inset-0 sm:mx-[100px] 2xl:mx-[400px] z-20 justify-center items-center flex">
      {/* Nube tipo tooltip apuntando al botón del ratón */}
      {showCloud && selectedSection === 0 && (
        <div
          style={{
            position: "fixed",
            top: cloudPosition.top,
            left: cloudPosition.left,
            zIndex: 50,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "14px 20px 14px 16px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.13)",
            width: "220px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span className="text-black flex-1">{cloudText}</span>
          <button
            aria-label="Cerrar"
            className="ml-2 text-gray-500 hover:text-gray-800 font-bold text-lg px-2 py-0 rounded transition"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setShowCloud(false)}
          >
            ×
          </button>
          {/* Flecha apuntando al botón */}
          <span
            style={{
              position: "absolute",
              top: -10,
              left: 50,
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid white",
              filter: "drop-shadow(0px -1px 1px #ccc)",
            }}
          />
        </div>
      )}
      <div
        className="p-2 rounded-full flex flex-row items-center justify-between transition-all duration-300"
        style={{
          width: width,
          gap: gap,
          border: border,
          backgroundColor: hexToRgba(backgroundColor, bgOpacity), // 👈 Solo afecta el fondo
        }}
      >
        <p className="text-text_primary dark:text-dark-text_primary text-2xl">
          EM
        </p>
        <div className="flex flex-row gap-4">
          <p
            className={`flex flex-row items-center gap-1 cursor-pointer ${
              selectedSection === 0
                ? "text-text_primary dark:text-dark-text_primary"
                : "text-text_secondary dark:text-dark-text_secondary"
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
                : "text-text_secondary dark:text-dark-text_secondary"
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
                : "text-text_secondary dark:text-dark-text_secondary"
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
        <div className="flex flex-row gap-2">
          <p
            className="text-text_primary dark:text-dark-text_primary text-2xl cursor-pointer transition-all duration-300 ease-in-out transform"
            onClick={handleDarkModeToggle}
          >
            <span
              key={darkMode ? "sunny" : "moon"}
              className="transition-opacity duration-300 ease-in-out opacity-100"
            >
              {darkMode ? <IoIosSunny /> : <IoMoon />}
            </span>
          </p>

          {selectedSection === 0 && (
            <p
              ref={mouseBtnRef}
              className="text-text_primary dark:text-dark-text_primary text-2xl cursor-pointer transition-all duration-300 ease-in-out transform"
              onClick={() => {
                setCustomScroll((prev) => !prev);
                if (showCloud) setShowCloud(false);
              }}
            >
              <span
                key={customScroll ? "scroll" : "scroll-fill"}
                className="transition-opacity duration-300 ease-in-out opacity-100"
              >
                {customScroll ? <PiMouseScroll /> : <PiMouseScrollFill />}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
