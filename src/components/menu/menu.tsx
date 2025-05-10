import React, { use, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useVariablesContext } from "../../context/variablesContext";
interface MenuProps {
  selectedSection: number; // 0 for Home, 1 for About, 2 for Projects
}

const Menu: React.FC<MenuProps> = ({ selectedSection }) => {
  const [isSunny, setIsSunny] = useState(true);
  const { scrollPosition } = useVariablesContext();
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState<number | null>(null); // Track the active icon
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state

  useEffect(() => {
    setTimeout(() => setActiveIcon(selectedSection), 100); // Animate to size 100 on load
  }, [selectedSection]);

  const toggleIcon = () => {
    setIsSunny((prev) => !prev);
  };

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

  // Calculate styles based on scroll position
  const normalizedScroll = Math.min(scrollPosition / 150, 1); // Normalize scroll position to a range of 0 to 1
  const bgOpacity = normalizedScroll * 0.9; // Gradual opacity up to 0.5
  const width =
    normalizedScroll < 1
      ? `calc(100% - ${normalizedScroll * (window.innerWidth - 400)}px)`
      : "400px"; // Gradual width reduction from 100% to 400px
  const gap = `${80 - normalizedScroll * 60}px`; // Gradual gap reduction from 80px to 20px
  const border = `1px solid rgba(11, 11, 13, ${normalizedScroll})`; // Border with dynamic opacity

  return (
    <div className="w-full py-5 flex fixed top-0 justify-center items-center z-40 px-60">
      <div
        className="p-2 rounded-full flex flex-row items-center justify-between transition-all duration-300"
        style={{
          width: width,
          gap: gap,
          border: border,
          backgroundColor: `rgba(11,11,13, ${bgOpacity})`,
        }}
      >
        <p className="text-text_primary text-2xl">EM</p>
        <div className="flex flex-row gap-4">
          <p
            className={`flex flex-row items-center gap-1 cursor-pointer ${
              selectedSection === 0
                ? "text-text_primary"
                : "text-text_secondary"
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
                ? "text-text_primary"
                : "text-text_secondary"
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
                ? "text-text_primary"
                : "text-text_secondary"
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
        <p
          className="text-text_primary text-2xl cursor-pointer"
          onClick={toggleIcon}
        >
          {isSunny ? <IoIosSunny /> : <IoMoon />}
        </p>
      </div>
    </div>
  );
};

export default Menu;
