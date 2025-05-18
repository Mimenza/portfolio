import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLogedUser } from "../context/logedUserContext";

import supabase from "../supabase/client";

import Menu from "../components/shared/menu/menu";

import Footer from "../components/shared/footer/footer";
import GradientText from "../blocks/TextAnimations/GradientText/GradientText";
import Aurora from "../blocks/Backgrounds/Aurora/Aurora";
import HorizontalCard from "../components/projectScreen/horizontalCard";
import MainComponentProjectDetail from "../components/shared/projectDetail/mainComponent";

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
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="size-4 dark:fill-dark-secondary fill-secondary"
          >
            <path
              fillRule="evenodd"
              d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z"
              clipRule="evenodd"
            />
          </svg>
          <GradientText
            colors={[
              "#e303fc",
              "#5a03fc",
              "#038cfc",
              "#e303fc",
              "#5a03fc",
              "#038cfc",
            ]}
            animationSpeed={2}
            showBorder={false}
            className=""
          >
            MOST OF MY WORK
          </GradientText>
        </div>
        <p className="text-6xl-custom font-bold mt-1 text-white">Proyects</p>
        <p className="m-4 text-lg-custom text-gray-300">
          Here you can find most of my projects.
        </p>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 h-auto w-auto">
          {projects.map((project, index) => (
            <div key={index} className="w-full">
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
