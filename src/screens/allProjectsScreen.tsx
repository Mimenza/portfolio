import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLogedUser } from "../context/logedUserContext";

import supabase from "../supabase/client";

import Aurora from "../blocks/Backgrounds/Aurora/Aurora";
import HorizontalCard from "../components/proyects/horizontalCard";
import MainComponentProjectDetail from "../components/projectDetail/mainComponent";

const AllProjectScreen = () => {
  const navigate = useNavigate();
  const { logedUser } = useLogedUser();

  const [showProjectDetail, setShowProjectDetail] = React.useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    if (!logedUser) {
      navigate("/login");
    }
  }, []);

  const handleProjectCardClick = (project: any) => {
    setSelectedProject(project); // Guardar el proyecto completo
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
    const getProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("Projects")
          .select("*")
          .order("id", { ascending: true });

        if (data?.length === 0) {
          console.error("No projects found");
          return;
        }

        if (data) {
          setProjects(data);
          console.log("Projects:", data);
        } else {
          console.error("No projects found");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getProjects();
  }, []);

  const [isClosing, setIsClosing] = React.useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden overflow-y-auto bg-black py-20 px-60">
      <div className="absolute top-0 left-0 w-screen h-full z-0">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.7}
          speed={0.5}
        />
      </div>

      {/* Contenido principal */}
      <div className="h-full w-full z-10 relative">
        <p className="text-6xl font-bold mt-1 text-white">Proyects</p>
        <p className="mt-4 text-lg text-gray-300">
          Here you can find most of my projects.
        </p>
        <div className="grid grid-cols-3 gap-5 h-auto w-auto">
          {projects.map((project, index) => (
            <div key={index} className="animate-fadeInUp w-full">
              <HorizontalCard
                onClickProject={() => {handleProjectCardClick(project)}} // Pasar el proyecto completo
                id={project.id}
                name={project.name}
                link={project.link}
                status={project.status}
                description={project.description}
              />
            </div>
          ))}
        </div>
      </div>

      {showProjectDetail && selectedProject && (
        <MainComponentProjectDetail
          projectDetails={selectedProject} // Pasar el proyecto seleccionado
          onClose={handleClose}
          isClosing={isClosing}
        />
      )}

      <div className="absolute top-0 left-0 w-screen h-full z-0 rotate-180">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.7}
          speed={0.5}
        />
      </div>
    </div>
  );
};

export default AllProjectScreen;
