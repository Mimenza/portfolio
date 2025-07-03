import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IoIosSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { AiOutlineHome, AiOutlineUser, AiOutlineAppstore } from "react-icons/ai";

import { useVariablesContext } from "../../../context/variablesContext";
import EmSvg from "../../ui/emSvgW";


interface PhoneMenuProps {
  selectedSection: number; // 0: Home, 1: About, 2: Projects
}

const PhoneMenu: React.FC<PhoneMenuProps> = ({ selectedSection }) => {
  const { darkMode, setDarkMode, setLanguage, setLoadingBarLoading } = useVariablesContext();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const lastScrollY = useRef(0);
  const { t, i18n } = useTranslation();

  const navItems = [
    { icon: <AiOutlineHome />, label: t("menu.Home"), route: "/home" },
    { icon: <AiOutlineUser />, label: t("menu.About"), route: "/about" },
    { icon: <AiOutlineAppstore />, label: t("menu.Projects"), route: "/projects" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setShowMenu(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowMenu(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDarkModeToggle = () => {
    setLoadingBarLoading(true);
    setTimeout(() => {
      setLoadingBarLoading(false);
      setDarkMode((prev: boolean) => !prev);
      document.documentElement.classList.toggle("dark");
    }, 500);
  };

  const handleNav = (idx: number) => {
    setLoadingBarLoading(true);
    setTimeout(() => {
      setLoadingBarLoading(false);
      navigate(navItems[idx].route);
    }, 500);
  };

  // Nuevo handler para cambiar idioma
  const handleLanguageToggle = () => {
    setLoadingBarLoading(true);
    setTimeout(() => {
      setLoadingBarLoading(false);
      i18n.changeLanguage(i18n.language === "es" ? "en" : "es");

      if (setLanguage) {
        setLanguage(i18n.language === "es" ? "es" : "en"); //Opposite because the i18n is already set
      }
    }, 500);

  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full flex justify-between items-center px-5 pt-4 z-20">
        <EmSvg />
        <div className="flex flex-row items-center gap-2">
          <button
            className="text-2xl text-text_primary dark:text-dark-text_primary bg-transparent rounded-full p-2"
            onClick={handleDarkModeToggle}
          >
            {darkMode ? <IoIosSunny /> : <IoMoon />}
          </button>
          <button
            className="px-3 py-1 rounded-full text-text_primary dark:text-dark-text_primary border border-text_secondary dark:border-dark-text_secondary text-xs-custom font-bold bg-transparent hover:bg-secondary/10 transition"
            onClick={handleLanguageToggle}
            aria-label="Change language"
            type="button"
          >
            {i18n.language === "es" ? "EN" : "ES"}
          </button>
        </div>
      </div>

      <nav
        className={`fixed bottom-0 left-0 w-full flex justify-center items-center z-20 transition-transform duration-300 ${showMenu ? "translate-y-0" : "translate-y-full"
          }`}
        style={{ willChange: "transform" }}
      >
        <div className="flex flex-row w-full justify-between items-center bg-background dark:bg-dark-background bg-opacity-10 backdrop-blur-md rounded-t-[25px] py-1 shadow-lg border border-[#232325]">
          {navItems.map((item, idx) => (
            <button
              key={item.label}
              className={`flex flex-col items-center justify-center flex-1 px-2 py-1 transition-all ${selectedSection === idx
                ? "text-secondary font-semibold"
                : "text-text_secondary dark:text-dark-text_secondary"
                }`}
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
