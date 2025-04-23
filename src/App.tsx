import "./App.css";
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainScreen from "./screens/mainScreen";
import AllProjectScreen from "./screens/allProjectsScreen"; 
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
  return (
    <Router>
      <div className="h-screen w-screen bg-black">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/projects" element={<AllProjectScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
