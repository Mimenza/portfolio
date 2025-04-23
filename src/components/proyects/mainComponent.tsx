import React, { useState, useRef, useEffect } from "react";
import LightButton from "../ui/lightButton";
import MainComponentProjectDetail from "../projectDetail/mainComponent";
import ProjectCard from "./projectCard";
import CountUp from "../../blocks/TextAnimations/CountUp/CountUp";

const MainComponentProyects = () => {
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [animateNbr, setAnimateNbr] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);

  const handleCountUpEnd = () => {
    setIsButtonAnimating(true);
    setTimeout(() => {
      setIsButtonAnimating(false);
    }, 300);
  };

  const handleProjectCardClick = () => {
    setShowProjectDetail(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowProjectDetail(false);
    }, 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimateNbr(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div
        ref={sectionRef}
        className="h-auto xl:h-screen w-auto flex flex-col justify-center bg-black xl:px-60 sm:px-10"
      >
        <div className="text-white">
          <h1 className="text-7xl font-bold mt-1">Proyects</h1>
          <div className="flex flex-row justify-between">
            <p className="mt-4 text-lg">
              Here you can find some of my projects.
            </p>
            <div
              className={
                isButtonAnimating
                  ? "scale-110 transition-transform duration-300"
                  : "transition-transform"
              }
            >
              <LightButton onClick={() => {}}>
                <CountUp
                  from={0}
                  to={100}
                  separator=","
                  direction="up"
                  delay={2}
                  duration={1}
                  className="count-up-text"
                  startWhen={animateNbr}
                  onEnd={handleCountUpEnd}
                />
                {" Projects here!"}
              </LightButton>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full h-auto mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 w-full">
            {projects.map((project, index) => (
              <div key={index} className="animate-fadeInUp w-full">
                <ProjectCard
                  onClickCode={handleProjectCardClick}
                  onClickProject={handleProjectCardClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {showProjectDetail && (
        <MainComponentProjectDetail
          onClose={handleClose}
          isClosing={isClosing}
        />
      )}
    </>
  );
};

export default MainComponentProyects;
