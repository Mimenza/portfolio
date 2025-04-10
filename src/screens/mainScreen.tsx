import React, { useRef, useState } from "react";

import MainComponentAboutMe from "../components/aboutMe/mainComponent";
import MainComponentProyects from "../components/proyects/mainComponent";
import MainComponentTecnologies from "../components/tecnologies/mainComponent";

const MainScreen = () => {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const technologiesRef = useRef<HTMLDivElement>(null);

  const sections = [aboutMeRef, projectsRef, technologiesRef];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  React.useEffect(() => {
    // Desactiva el scroll globalmente
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
        // Scroll hacia abajo
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

  return (
    <div className="flex flex-col min-h-screen w-screen bg-black overflow-hidden relative">
      {/* Indicador de secciones */}
      
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2 z-20">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSectionIndex === index ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>


      {/* Secciones */}
      <div ref={aboutMeRef} className="h-screen">
        <MainComponentAboutMe />
      </div>
      <div ref={projectsRef} className="h-screen">
        <MainComponentProyects />
      </div>
      <div ref={technologiesRef} className="h-screen">
        <MainComponentTecnologies />
      </div>
    </div>
  );
};

export default MainScreen;
