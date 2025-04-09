import React from "react";

const ProjectCard = () => (
  <div className="flex flex-col shadow-lg m-5">
    {/* Contenedor de la imagen */}
    <div className="w-full sm:w-full md:w-full lg:w-full xl:w-[500px] aspect-[16/9] bg-gray-400 rounded-[20px]"></div>
    
    {/* Contenedor de texto */}
    <div className="p-4 max-w-[500px]">
      <h3 className="text-xl text-white font-bold mb-2">Project name</h3>
      <p className="text-sm text-gray-300 font-bold">
        Temporal project description in order the user to give a better idea of the project. This is a placeholder text and should be replaced with actual content.
      </p>
    </div>
  </div>
);

export default ProjectCard;