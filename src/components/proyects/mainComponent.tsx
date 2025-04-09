import React from "react";

import ProjectCard from "./projectCard";
const MainComponentProyects = () => {
  return (
    <div className="h-auto w-auto flex flex-col justify-center bg-black">
      <div className="text-white">
        <h1 className="text-4xl font-bold">Proyects</h1>
        <p className="mt-4 text-lg">Here you can find some of my projects.</p>
      </div>
      <div className="flex justify-center w-full h-auto">
        <div className="grid grid-cols-1 h-auto w-full xl:w-auto sm:grid-cols-1 md:grid-cols-2">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};

export default MainComponentProyects;
