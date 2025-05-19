import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
  use,
} from "react";
import { useNavigate } from "react-router-dom";

import { useLogedUser } from "../context/logedUserContext";
import { useVariablesContext } from "../context/variablesContext";

import MainComponentAboutMe from "../components/homeScreen/aboutMe/mainComponent";
import MainComponentProyects from "../components/homeScreen/proyects/mainComponent";
import MainComponentTecnologies from "../components/homeScreen/tecnologies/mainComponent";
import MainComponentContact from "../components/homeScreen/contactMe/mainComponent";
import FooterSlider from "../components/shared/footer/aboutFooterSlider";

import Menu from "../components/shared/menu/menu";
import Carousell from "../components/shared/carousell";

const HomeScreen = () => {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const technologiesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logedUser } = useLogedUser();
  const { section, setSection, customScroll } = useVariablesContext();

  // Check if the user is logged in
  useEffect(() => {
    if (!logedUser) {
      navigate("/login");
    }
    document.title = "🔧 Emimenza | Home";
    document.body.style.overflow = "hidden";
  }, []);

  // Section references
  const sections = useMemo(
    () => [aboutMeRef, projectsRef, technologiesRef, contactRef],
    []
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handleIndicatorClick = useCallback(
    (index: number) => {
      sections[index]?.current?.scrollIntoView({ behavior: "smooth" });
      setCurrentSectionIndex(index);
      setSection(index);
    },
    [sections]
  );

  useEffect(() => {
    let scrollDelta = 0;
    let isScrolling = false;

    const handleScroll = (event: WheelEvent) => {
      if (isScrolling || customScroll) {
        return;
      }

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
        setSection(currentSectionIndex + 1);
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
        setSection(currentSectionIndex - 1);
        setTimeout(() => {
          setCurrentSectionIndex((prevIndex) => prevIndex - 1);
          scrollDelta = 0;
          isScrolling = false;
        }, 500);
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      // document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSectionIndex, sections]);

  useEffect(() => {
    if (customScroll) {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflow = "hidden";
      setCurrentSectionIndex(0);
      setSection(0);
      window.scrollTo(0, 0);
    }
  }, [customScroll]);
  useEffect(() => {
    handleIndicatorClick(0);
  }, [handleIndicatorClick]);

  const sectionTitles = ["Presentation", "Projects", "Technologies", "Contact"];
  const heightClass = !customScroll ? "h-screen" : "h-auto";
  return (
    <div className="flex flex-col w-full overflow-hidden relative scrollbar-thin scrollbar-webkit">
      {/* Section Indicator */}
      <div
        className={`fixed top-1/2 ${
          customScroll ? "right-[-200px]" : "right-[-142px]"
        } transform -translate-y-1/2 z-20 group transition-all duration-[600ms] hover:translate-x-[-130px]`}
      >
        {sections.map((_, index) => (
          <div
            key={index}
            className={`flex items-center bg-muted dark:bg-dark-muted bg-opacity-25 ${
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
      </div>

      <Menu selectedSection={0} />
      {/* Sections */}
      <div
        ref={aboutMeRef}
        className={`relative w-full py-20 justify-center items-center flex sm:${heightClass} md:min-h-screen h-auto`}
      >
        <MainComponentAboutMe />
        <FooterSlider />
        
      </div>
      <Carousell words={["Team collaboration", "Adaptability", "Communication skills", "Time management", "Attention to detail", "Curiosity"]} />
      {/* <Carousell words={["word1","word2","word3", "word4", "word5", "word6"]} /> */}
      <div
        ref={projectsRef}
        className={`w-full py-10 justify-center items-center flex md:${heightClass} h-auto`}
      >
        <MainComponentProyects />
      </div>
      <div
        ref={technologiesRef}
        className={`w-full py-10 justify-center items-center flex md:${heightClass} h-auto`}
      >
        <MainComponentTecnologies />
      </div>
      <div
        ref={contactRef}
        className={`w-full py-10 justify-center items-center flex md:${heightClass} h-auto`}
      >
        <MainComponentContact />
      </div>
    </div>
  );
};

export default HomeScreen;
