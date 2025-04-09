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

    let scrollDelta = 0; // Acumulador de scroll
    let isScrolling = false; // Bandera para evitar múltiples cambios durante la animación

    const handleScroll = (event: WheelEvent) => {
      if (isScrolling) return; // Evita manejar eventos mientras se está desplazando

      scrollDelta += event.deltaY;

      const threshold = 100; // Umbral para cambiar de sección

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
          scrollDelta = 0; // Reinicia el acumulador
          isScrolling = false; // Permite manejar nuevos eventos
        }, 500); // Tiempo estimado de la animación
      } else if (scrollDelta < -threshold && currentSectionIndex > 0) {
        // Scroll hacia arriba
        isScrolling = true;
        sections[currentSectionIndex - 1]?.current?.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => {
          setCurrentSectionIndex((prevIndex) => prevIndex - 1);
          scrollDelta = 0; // Reinicia el acumulador
          isScrolling = false; // Permite manejar nuevos eventos
        }, 500); // Tiempo estimado de la animación
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      // Limpia el estilo y el evento al desmontar el componente
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSectionIndex, sections]);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-black overflow-hidden relative">
      {/* Indicador de secciones */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2">
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
