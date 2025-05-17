import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import './tailwind.css';
import HomeScreen from "./screens/homeScreen";
import ProjectsScreen from "./screens/projectsScreen";
import LoginScreen from "./screens/loginScreen";
import SlugScreen from "./screens/slugScreen";
import AboutScreen from "./screens/aboutScreen";
import Test from "./screens/test";

import { useVariablesContext } from "./context/variablesContext";

const useBreakpointLogger = () => {
  useEffect(() => {
    const breakpoints = {
      sm: window.matchMedia("(min-width: 640px)"),
      md: window.matchMedia("(min-width: 768px)"),
      lg: window.matchMedia("(min-width: 1024px)"),
      xl: window.matchMedia("(min-width: 1280px)"),
      "2xl": window.matchMedia("(min-width: 1536px)"),
    };

    const logBreakpoint = () => {
      if (breakpoints["2xl"].matches) {
        console.log("Breakpoint: 2xl");
      } else if (breakpoints.xl.matches) {
        console.log("Breakpoint: xl");
      } else if (breakpoints.lg.matches) {
        console.log("Breakpoint: lg");
      } else if (breakpoints.md.matches) {
        console.log("Breakpoint: md");
      } else if (breakpoints.sm.matches) {
        console.log("Breakpoint: sm");
      } else {
        console.log("Breakpoint: default (xs)");
      }
    };

    // Log the initial breakpoint
    logBreakpoint();

    // Add listeners for changes
    Object.values(breakpoints).forEach((mediaQuery) =>
      mediaQuery.addEventListener("change", logBreakpoint)
    );

    // Cleanup listeners on unmount
    return () => {
      Object.values(breakpoints).forEach((mediaQuery) =>
        mediaQuery.removeEventListener("change", logBreakpoint)
      );
    };
  }, []);
};

function App() {
  useBreakpointLogger();
  const {
    setScrollPosition,
    setDarkMode,
    darkMode,
    setCustomScroll,
    customScroll,
  } = useVariablesContext();

  useEffect(() => {
    setDarkMode(true); // Set dark mode to true by default
    document.documentElement.classList.add("dark"); // Activar modo oscuro
    setCustomScroll(true); // Disable custom scroll by default

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Add darkMode as a dependency

  return (
    <div className="h-auto w-screen sm:px-[100px] 2xl:px-[20%] dark:bg-dark-background bg-background transition-colors duration-700 scrollbar-custom">
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/projects" element={<ProjectsScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        <Route path="*" element={<Navigate to="/login" />} />{" "}
        <Route path="projects/:slug" element={<SlugScreen />} />
        <Route path="/test" element={<Test />} />
      </Routes>
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
