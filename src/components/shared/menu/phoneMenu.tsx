import React, { useEffect, useRef, useState } from "react";
import { IoIosSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { AiOutlineHome, AiOutlineUser, AiOutlineAppstore, AiOutlineMail } from "react-icons/ai";
import EmSvg from "../../ui/emSvg";
import { useNavigate } from "react-router-dom";
import { useVariablesContext } from "../../../context/variablesContext";

interface PhoneMenuProps {
  selectedSection: number; // 0: Home, 1: About, 2: Projects, 3: Contact
}

const navItems = [
  { icon: <AiOutlineHome />, label: "Home", route: "/home" },
  { icon: <AiOutlineUser />, label: "About", route: "/about" },
  { icon: <AiOutlineAppstore />, label: "Projects", route: "/projects" }
];

const PhoneMenu: React.FC<PhoneMenuProps> = ({ selectedSection }) => {
  const { darkMode, setDarkMode } = useVariablesContext();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setShowMenu(false); // Scroll down, hide menu
      } else if (currentScrollY < lastScrollY.current) {
        setShowMenu(true); // Scroll up, show menu
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode((prev: boolean) => !prev);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleNav = (idx: number) => {
    navigate(navItems[idx].route);
  };

  return (
   <div className="">
    <div className="fixed top-0 left-0 w-full flex justify-between items-center px-5 pt-4 z-20">
      <EmSvg />
      <button
        className="text-2xl text-text_primary dark:text-dark-text_primary bg-transparent rounded-full p-2"
        onClick={handleDarkModeToggle}
      >
        {darkMode ? <IoIosSunny /> : <IoMoon />}
      </button>
    </div>
    {/* Bottom nav */}
    <nav
      className={`
        fixed bottom-0 left-0 w-full flex justify-center items-center z-20
        transition-transform duration-300
        ${showMenu ? "translate-y-0" : "translate-y-full"}
      `}
      style={{ willChange: "transform" }}
    >
      <div className="flex flex-row w-full justify-between items-center bg-background dark:bg-dark-background bg-opacity-10 backdrop-blur-md rounded-t-[25px] py-1 shadow-lg border border-[#232325]">
        {navItems.map((item, idx) => (
          <button
            key={item.label}
            className={`flex flex-col items-center justify-center flex-1 px-2 py-1 transition-all
              ${selectedSection === idx
                ? "text-secondary font-semibold"
                : "text-text_secondary dark:text-dark-text_secondary"}
            `}
            onClick={() => handleNav(idx)}
          >
            <span className={`text-2xl mb-1 ${selectedSection === idx ? "scale-110" : "scale-100"} transition-transform`}>
              {item.icon}
            </span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  </div>
  );
};

export default PhoneMenu;
