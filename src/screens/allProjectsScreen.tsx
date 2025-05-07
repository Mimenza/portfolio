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
    setSelectedProject(project);
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
        const { data: projects, error } = await supabase
          .from("Projects")
          .select(`
            *,
            Projects-Tecnologies (
              Tecnologies ( name )
            ),
            Projects-Storage (
              Storage ( link, cover )
            )
          `)
          .order("id", { ascending: true });

        if (error) {
          console.error("Error fetching projects:", error);
          return;
        }

        if (projects) {
          const formattedProjects = projects.map((project: any) => ({
            ...project,
            technologies: project["Projects-Tecnologies"]
              .map((tech: any) => tech.Tecnologies?.name)
              .filter((name: string | undefined) => name !== undefined), // Ensure no undefined values
            storage: project["Projects-Storage"]
              .filter((store: any) => store.Storage) // Filter out null Storage entries
              .map((store: any) => store.Storage.link),
            cover: project["Projects-Storage"]
              .filter((store: any) => store.Storage?.cover) // Find the one with cover set to true
              .map((store: any) => store.Storage.link)[0] || null, // Use the first match or null
          }));
          setProjects(formattedProjects);
          console.log("Projects:", formattedProjects);
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
    <div className="min-h-screen w-full relative overflow-x-hidden overflow-y-auto py-20 sm:px-[100px] 2xl:px-[200px] px-5 justify-center items-center flex flex-col">
      {/* <div className="absolute top-0 left-0 w-screen h-full z-0">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.7}
          speed={0.5}
        />
      </div> */}

      <div className="fixed top-0 left-0 w-screen h-10 z-20 bg-gradient-to-b from-[#0b0b0d] to-transparent"></div>
      <div className="fixed bottom-0 left-0 w-screen h-10 z-20 bg-gradient-to-b from-transparent to-[#0b0b0d]"></div>
      {/* Contenido principal */}
      <div className="h-full w-full 2xl:w-[2000px] z-10 relative">
        <p className="text-6xl font-bold mt-1 text-white">Proyects</p>
        <p className="m-4 text-lg text-gray-300">
          Here you can find most of my projects.
        </p>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 h-auto w-auto">
          {projects.map((project, index) => (
            <div key={index} className="animate-fadeInUp w-full">
              <HorizontalCard
                onClickProject={() => {
                  handleProjectCardClick(project);
                }} // Pasar el proyecto completo
                id={project.id}
                name={project.name}
                link={project.link}
                status={project.status}
                description={project.description}
                img={project.storage}
                technologies={project.technologies}
                cover={project.cover}
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

      {/* <div className="absolute top-0 left-0 w-screen h-full z-0 rotate-180">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.7}
          speed={0.5}
        />
      </div> */}
    </div>
  );
};

export default AllProjectScreen;
