import React, { useRef } from "react";

import MainComponentAboutMe from "../components/aboutMe/mainComponent";
import MainComponentProyects from "../components/proyects/mainComponent";

const MainScreen = () => {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const sections = [aboutMeRef, projectsRef];
  let currentSectionIndex = 0;

  React.useEffect(() => {
    // Desactiva el scroll globalmente
    document.body.style.overflow = "hidden";

    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        // Scroll hacia abajo
        currentSectionIndex++;
      } else if (event.deltaY < 0 && currentSectionIndex > 0) {
        // Scroll hacia arriba
        currentSectionIndex--;
      }

      sections[currentSectionIndex].current?.scrollIntoView({
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      // Limpia el estilo y el evento al desmontar el componente
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-black overflow-hidden">
      <div ref={aboutMeRef} className="h-screen">
        <MainComponentAboutMe />
      </div>
      <div ref={projectsRef} className="h-screen">
        <MainComponentProyects />
      </div>
    </div>
  );
};

export default MainScreen;