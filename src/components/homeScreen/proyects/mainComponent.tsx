import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./projectCard";
import { useNavigate } from "react-router-dom";

import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import MainComponentProjectDetail from "../../shared/projectDetail/mainComponent";
import supabase from "../../../supabase/client";
import { Project } from "../../../interface/Project";

const MainComponentProyects = () => {
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      setSelectedProject(null);
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
          .eq("frontPage", true)
          .order("date", { ascending: false });

        if (error) {
          console.error("Error fetching projects:", error);
          return;
        }

        if (projects) {
          const formattedProjects = projects.map((project: any) => ({
            ...project,
            technologies: project["Projects-Tecnologies"]
              .map((tech: any) => tech.Tecnologies?.name)
              .filter((name: string | undefined) => name !== undefined),
            storage: project["Projects-Storage"]
              .filter((store: any) => store.Storage)
              .map((store: any) => store.Storage.link),
            cover:
              project["Projects-Storage"]
                .filter((store: any) => store.Storage?.cover)
                .map((store: any) => store.Storage.link)[0] || null,
          }));
          setProjects(formattedProjects);
        } else {
          console.error("No projects found");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getProjects();
  }, []);

  const navigate = useNavigate();

  const isLg = width >= 1024 && width < 1280;
  const itemsToShow = isLg ? 4 : 6;

  return (
    <>
      <div ref={sectionRef} className="w-full h-full flex flex-col gap-5">
        <div className="">
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
              text="Some of my work"
              disabled={false}
              speed={2}
              className="text-lg-custom text-secondary dark:text-dark-secondary"
            />
          </div>
          <h1 className="text-6xl-custom font-bold font-clash mt-1 text-text_primary dark:text-dark-text_primary">
            Projects
          </h1>
          <div className="flex flex-row justify-between">
            <p className="mt-4 text-lg-custom text-text_secondary dark:text-dark-text_secondary">
              Here's a selection showcasing my expertise and the achieved
              results
            </p>
            <div>
              <button
                className="bg-white text-black font-bold text-sm px-6 py-2 rounded-full hover:bg-opacity-90 flex flex-row items-center"
                onClick={() => {
                  navigate("/projects");
                }}
              >
                <span>View all projects</span>
              </button>
            </div>
          </div>
        </div>

        {/* Container for Projects */}
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
            {projects.slice(0, itemsToShow).map((project, index) => (
              <div key={index} className={index % 2 === 1 ? "mt-20" : ""}>
                <ProjectCard
                  onClickProject={() => handleProjectCardClick(project)}
                  id={project.id}
                  name={project.name}
                  link={project.link}
                  status={project.status}
                  img={project.storage}
                  technologies={project.technologies}
                  cover={project.cover}
                  slug={project.slug}
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
            prevRoute="home"
          />
        )}
      </div>
    </>
  );
};

export default MainComponentProyects;
