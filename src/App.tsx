import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./tailwind.css";
import HomeScreen from "./screens/homeScreen";
import ProjectsScreen from "./screens/projectsScreen";
import SlugScreen from "./screens/slugScreen";
import AboutScreen from "./screens/aboutScreen";
import ChatWidget from "./components/shared/chat/chatWidget";
import LoadingBar from "./components/shared/loadingBar/loadingBar";

import { useVariablesContext } from "./context/variablesContext";
import useLenisScroll from "./hooks/useLenisScroll";


const useBreakpointLogger = () => {
  const { setPhoneView} = useVariablesContext();
  
  useEffect(() => {
    const breakpoints = {
      sm: window.matchMedia("(min-width: 640px)"),
      smPlus: window.matchMedia("(min-width: 700px)"),
      md: window.matchMedia("(min-width: 768px)"),
      lg: window.matchMedia("(min-width: 1024px)"),
      xl: window.matchMedia("(min-width: 1280px)"),
      "2xl": window.matchMedia("(min-width: 1536px)"),
      "3xl": window.matchMedia("(min-width: 1920px)"),
    };

    const logBreakpoint = () => {
      setPhoneView(false);
      if (breakpoints["3xl"].matches) {
        // 3xl
      } else if (breakpoints["2xl"].matches) {
        // 2xl
      } else if (breakpoints.xl.matches) {
        // xl
      } else if (breakpoints.lg.matches) {
        // lg
      } else if (breakpoints.md.matches) {
        // md
      } else if (breakpoints.smPlus.matches) {
        // smPlus
      } else if (breakpoints.sm.matches) {
        setPhoneView(true);
      } else {
        setPhoneView(true);
      }
    };

    logBreakpoint();

    Object.values(breakpoints).forEach((mq) =>
      mq.addEventListener("change", logBreakpoint)
    );

    return () => {
      Object.values(breakpoints).forEach((mq) =>
        mq.removeEventListener("change", logBreakpoint)
      );
    };
  }, []);
};


function App() {
  useBreakpointLogger();
  useLenisScroll(); // 👈 Aquí activamos el scroll inercial
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { setScrollPosition, setDarkMode, loadingBarLoading } = useVariablesContext();

  useEffect(() => {
    setDarkMode(true);
    document.documentElement.classList.add("dark", "scrollbar-dark");

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="h-auto max-w-screen px-[30px] sm:px-[100px] 2xl:px-[20%] dark:bg-dark-background bg-background transition-colors duration-700 overflow-hidden"
      data-lenis-root
    >
      <LoadingBar isLoading={!!loadingBarLoading} />

      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/projects" element={<ProjectsScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/projects/:slug" element={<SlugScreen />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

      <ChatWidget />
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
