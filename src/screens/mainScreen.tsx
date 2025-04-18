import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";

import MainComponentAboutMe from "../components/aboutMe/mainComponent";
import MainComponentProyects from "../components/proyects/mainComponent";
import MainComponentTecnologies from "../components/tecnologies/mainComponent";
import MainComponentContact from "../components/contactMe/mainComponent";


const MainScreen = () => {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const technologiesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => [aboutMeRef, projectsRef, technologiesRef,contactRef], []);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handleIndicatorClick = useCallback(
    (index: number) => {
      sections[index]?.current?.scrollIntoView({ behavior: "smooth" });
      setCurrentSectionIndex(index);
    },
    [sections]
  );

  useEffect(() => {
    // Disable global scrolling
    document.body.style.overflow = "hidden";

    let scrollDelta = 0;
    let isScrolling = false;

    const handleScroll = (event: WheelEvent) => {
      if (isScrolling) return;

      scrollDelta += event.deltaY;

      const threshold = 100;

      if (
        scrollDelta > threshold &&
        currentSectionIndex < sections.length - 1
      ) {
        // Scroll down
        isScrolling = true;
        sections[currentSectionIndex + 1]?.current?.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => {
          setCurrentSectionIndex((prevIndex) => prevIndex + 1);
          scrollDelta = 0;
          isScrolling = false;
        }, 500);
      } else if (scrollDelta < -threshold && currentSectionIndex > 0) {
        // Scroll up
        isScrolling = true;
        sections[currentSectionIndex - 1]?.current?.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => {
          setCurrentSectionIndex((prevIndex) => prevIndex - 1);
          scrollDelta = 0;
          isScrolling = false;
        }, 500);
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSectionIndex, sections]);

  useEffect(() => {
    handleIndicatorClick(0);
  }, [handleIndicatorClick]);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-black overflow-hidden relative">
      {/* Section Indicator */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2 z-20">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentSectionIndex === index ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>

      {/* Sections */}
      <div ref={aboutMeRef} className="h-screen">
        <MainComponentAboutMe />
      </div>
      <div ref={projectsRef} className="h-screen">
        <MainComponentProyects />
      </div>
      <div ref={technologiesRef} className="h-screen">
        <MainComponentTecnologies />
      </div>
      <div ref={contactRef} className="h-screen">
        <MainComponentContact />
      </div>
    </div>
  );
};

export default MainScreen;
