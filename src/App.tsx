import "./App.css";
import React, { useEffect } from "react";
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

import { useVariablesContext } from "./context/variablesContext";

const useBreakpointLogger = () => {
  const { setCustomScroll, phoneView, setPhoneView } = useVariablesContext();

  // useEffect(() => {
  //   console.log("Phone view:", phoneView);
  // }, [phoneView]);

  useEffect(() => {
    const breakpoints = {
      sm: window.matchMedia("(min-width: 640px)"),
      "smPlus": window.matchMedia("(min-width: 700px)"),
      md: window.matchMedia("(min-width: 768px)"),
      lg: window.matchMedia("(min-width: 1024px)"),
      xl: window.matchMedia("(min-width: 1280px)"),
      "2xl": window.matchMedia("(min-width: 1536px)"),
      "3xl": window.matchMedia("(min-width: 1920px)"),
    };

    const logBreakpoint = () => {
      setPhoneView(false);
      if (breakpoints["3xl"].matches) {
        // console.log("Breakpoint: 3xl");
      } else if (breakpoints["2xl"].matches) {
        // console.log("Breakpoint: 2xl");
      } else if (breakpoints.xl.matches) {
        // console.log("Breakpoint: xl");
      } else if (breakpoints.lg.matches) {
        // console.log("Breakpoint: lg");
      } else if (breakpoints.md.matches) {
        // console.log("Breakpoint: md");
      } else if (breakpoints.smPlus.matches) {
        // console.log("Breakpoint: sm-plus");
      } else if (breakpoints.sm.matches) {
        // console.log("Breakpoint: sm");
        setPhoneView(true);
      } else {
        setPhoneView(true);
        // console.log("Breakpoint: default (xs)");
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

    // Agrega la clase scrollbar-custom
    document.documentElement.classList.add("scrollbar-dark");

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Limpia la clase al desmontar si lo deseas
      document.body.classList.remove("scrollbar-custom");
    };
  }, []); // Add darkMode as a dependency

  return (
    <div className="h-auto max-w-screen px-[30px] sm:px-[100px] 2xl:px-[20%] dark:bg-dark-background bg-background transition-colors duration-700 overflow-hidden ">
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/projects" element={<ProjectsScreen />} />
        {/* <Route path="/login" element={<LoginScreen />} /> */}
        <Route path="/about" element={<AboutScreen />} />
        <Route path="projects/:slug" element={<SlugScreen />} />
        
        <Route path="/" element={<Navigate to="/home" />} />{" "}
        <Route path="*" element={<Navigate to="/home" />} />{" "}
      </Routes>

      <ChatWidget/>
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
