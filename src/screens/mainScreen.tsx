import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLogedUser } from "../context/logedUserContext";

import MainComponentAboutMe from "../components/aboutMe/mainComponent";
import MainComponentProyects from "../components/proyects/mainComponent";
import MainComponentTecnologies from "../components/tecnologies/mainComponent";
import MainComponentContact from "../components/contactMe/mainComponent";

const MainScreen = () => {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const technologiesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logedUser, setLogedUser } = useLogedUser();

  useEffect(() => {
    if (!logedUser) {
      navigate("/login");
    }
  }, []);

  const sections = useMemo(
    () => [aboutMeRef, projectsRef, technologiesRef, contactRef],
    []
  );

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

  const sectionTitles = ["About Me", "Projects", "Technologies", "Contact"];
  return (
    <div className="flex flex-col min-h-screen w-screen bg-black overflow-hidden relative">
      {/* Section Indicator */}
      <div className="fixed top-1/2 right-[-142px] transform -translate-y-1/2 z-20 group transition-all duration-300 hover:translate-x-[-130px]">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`flex items-center bg-gray-600 bg-opacity-25 ${
              index === 0 ? "rounded-tl-xl" : ""
            } ${index === sections.length - 1 ? "rounded-bl-xl" : ""}`}
          >
            {/* Columna de los círculos */}
            <div className="flex items-center justify-center w-10 h-10 mr-4">
              <div
                className={`w-3 h-3 rounded-full cursor-pointer transition-transform duration-300 ${
                  currentSectionIndex === index
                    ? "bg-white scale-[155%]"
                    : "bg-gray-500"
                } hover:bg-gray-200 active:scale-75`}
                onClickCapture={() => handleIndicatorClick(index)}
              />
            </div>

            {/* Columna de los nombres */}
            <div className="flex items-center justify-start mr-5">
              <h1
                className={`cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  currentSectionIndex === index ? "text-white" : "text-gray-500"
                } hover:text-gray-200`}
                onClick={() => handleIndicatorClick(index)}
              >
                {sectionTitles[index]}
              </h1>
            </div>
          </div>
        ))}

        {/* Nuevas dos columnas estáticas debajo */}
        <div className="flex">
          {/* <div className="w-10 h-15 bg-gray-600 bg-opacity-25">
            <div className="w-full h-full bg-black rounded-tr-xl"></div>
          </div> */}
          <div className="w-10 h-15" />
          <div className="flex flex-col justify-center pl-4 rounded-bl-xl bg-gray-600 bg-opacity-25 w-[calc(100%-2.5rem)]">
            <div className="border-t border-gray-600 h-1 w-[100%] mx-auto self-center" />
            <h1 className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-white text-gray-500 my-1">
              Projects
            </h1>
            <h1 className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-white text-gray-500 my-1">
              CV here
            </h1>
          </div>
        </div>
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
