import React from "react";
import LightButton from "../ui/lightButton";

import MainComponentProjectDetail from "../projectDetail/mainComponent";
import ProjectCard from "./projectCard";
import ProjectCard2 from "./projectCard2";
const MainComponentProyects = () => {
  const [showProjectDetail, setShowProjectDetail] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleProjectCardClick = () => {
    setShowProjectDetail(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowProjectDetail(false);
    }, 500); // Match the duration of the fadeOutScale animation
  };

  return (
    <>
      <div className="h-auto xl:h-screen w-auto flex flex-col justify-center bg-black xl:px-60 sm:px-10">
        <div className="text-white">
          <h1 className="text-7xl font-bold mt-1">Proyects</h1>
          <div className="flex flex-row justify-between">
            <p className="mt-4 text-lg">
              Here you can find some of my projects.
            </p>
            <LightButton text="Check all my projects" onClick={() => {}} />
          </div>
        </div>
        <div className="flex justify-center w-full h-auto mt-5">
          <div className="grid grid-cols-1 h-auto w-full xl:w-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard onClickCode={handleProjectCardClick} onClickProject={handleProjectCardClick}/>
            <ProjectCard onClickCode={handleProjectCardClick} onClickProject={handleProjectCardClick}/>
            <ProjectCard onClickCode={handleProjectCardClick} onClickProject={handleProjectCardClick}/>
            <ProjectCard onClickCode={handleProjectCardClick} onClickProject={handleProjectCardClick}/>
            <ProjectCard onClickCode={handleProjectCardClick} onClickProject={handleProjectCardClick}/>
            <ProjectCard onClickCode={handleProjectCardClick} onClickProject={handleProjectCardClick}/>
          </div>
        </div>
      </div>
      {showProjectDetail && (
        <MainComponentProjectDetail onClose={handleClose} isClosing={isClosing} />
      )}
    </>
  );
};

export default MainComponentProyects;
