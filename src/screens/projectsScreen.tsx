import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLogedUser } from "../context/logedUserContext";

import supabase from "../supabase/client";

import Menu from "../components/shared/menu/menu";

import Footer from "../components/shared/footer/footer";
import HorizontalCard from "../components/projectScreen/horizontalCard";
import MainComponentProjectDetail from "../components/shared/projectDetail/mainComponent";

import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText";
const ProjectsScreen = () => {
  const navigate = useNavigate();
  const { logedUser } = useLogedUser();

  const [showProjectDetail, setShowProjectDetail] = React.useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    if (!logedUser) {
      navigate("/login");
    }
    // Disable global scrolling X
       document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    document.title = "🔧 Emimenza | Projects";
    // Scroll to top on page load
    window.scrollTo(0, 0);
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
          .select(
            `
            *,
            Projects-Tecnologies (
              Tecnologies ( name )
            ),
            Projects-Storage (
              Storage ( link, cover )
            )
          `
          )
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
            cover:
              project["Projects-Storage"]
                .filter((store: any) => store.Storage?.cover) // Find the one with cover set to true
                .map((store: any) => store.Storage.link)[0] || null, // Use the first match or null
          }));
          setProjects(formattedProjects);
          // console.log("Projects:", formattedProjects);
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
  // sm:px-[100px] 2xl:px-[200px] px-5
  // 2xl:w-[1500px]
  return (
    <div className="min-h-screen overflow-x-hidden relative py-10  items-center flex flex-col">
      <Menu selectedSection={2} />
      {/* Gradientes */}
      <div className="fixed top-0 left-0 w-screen h-10 z-20 bg-gradient-to-b from-background dark:from-dark-background to-transparent"></div>
      <div className="fixed bottom-0 left-0 w-screen h-10 z-20 bg-gradient-to-b from-transparent dark:to-dark-background to-background"></div>
      {/* Contenido principal */}
      <div className="min-h-screen h-full w-full z-10 relative my-20">
        <div className="flex flex-row items-center gap-2 mb-2">
         <svg
                className="size-4 text-secondary fill-background dark:fill-dark-background"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
              </svg>
          <ShinyText
              text="Most of my work"
              disabled={false}
              speed={2}
              className="text-lg-custom text-secondary dark:text-dark-secondary"
            />
        </div>
        <p className="text-6xl-custom font-bold font-clash mt-1 text-white">Projects</p>
        <p className="m-4 text-lg-custom text-gray-300">
          Here you can find most of my projects.
        </p>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 grid-cols-2 gap-10 h-auto w-auto">
          {projects.map((project, index) => (
            <div key={index} className={index % 2 === 1 ? "mt-20" : ""}>
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

      <Footer />

      {showProjectDetail && selectedProject && (
        <MainComponentProjectDetail
          projectDetails={selectedProject} // Pasar el proyecto seleccionado
          onClose={handleClose}
          isClosing={isClosing}
          prevRoute="projects"
        />
      )}
    </div>
  );
};

export default ProjectsScreen;
