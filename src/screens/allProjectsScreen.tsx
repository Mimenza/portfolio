import React, {useEffect} from "react";

import { useNavigate } from "react-router-dom";
import { useLogedUser } from "../context/logedUserContext";

import Aurora from "../blocks/Backgrounds/Aurora/Aurora";
import ProjectCard2 from "../components/proyects/projectCard2";
import MainComponentProjectDetail from "../components/projectDetail/mainComponent";

const AllProjectScreen = () => {
  // const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Array de proyectos
  const projects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // Array de proyectos
   const navigate = useNavigate();
    const { logedUser, setLogedUser } = useLogedUser();
   //const projects = [1, 2, 3];

  const [showProjectDetail, setShowProjectDetail] = React.useState(false);

   useEffect(() => {
        if (!logedUser) {
          navigate("/login");
        }
      }, []);

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

  const [isClosing, setIsClosing] = React.useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Aurora de fondo */}
      <div className="absolute top-0 left-0 w-screen h-full z-0">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.7}
          speed={0.5}
        />
      </div>

      {/* Contenido principal
      <div className="relative w-full h-auto z-40 px-60 py-20">
        <div className="relative w-full ">
          <p className="text-6xl font-bold mt-1 text-white">Proyects</p>
          <p className="mt-4 text-lg text-gray-300">
            Here you can find most of my projects.
          </p>
          <div className="grid grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div key={index} className="animate-fadeInUp w-full">
                <ProjectCard2
                  onClickCode={() => {
                    setShowProjectDetail(true);
                  }}
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
      )} */}
      {/* Aurora invertido */}
      <div className="absolute bottom-0 left-0 w-screen h-full z-0 rotate-180">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.5}
          speed={0.5}
        />
      </div>
    </div>
  );
};

export default AllProjectScreen;
