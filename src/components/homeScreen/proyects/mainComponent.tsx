import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./projectCard";
import GradientText from "../../../blocks/TextAnimations/GradientText/GradientText";
import { useNavigate } from "react-router-dom";

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
      <div ref={sectionRef} className="w-full h-full flex flex-col">
        <div className="mt-20">
          <div className="flex flex-row items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="#e303fc"
              className="size-4"
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
              SOME OF MY WORK
            </GradientText>
          </div>
          <h1 className="text-6xl font-bold mt-1 text-text_primary">
            Proyects
          </h1>
          <div className="flex flex-row justify-between">
            <p className="mt-4 text-lg text-text_secondary">
              Here's a selection showcasing my expertise and the achieved
              results
            </p>
            <div>
              <button
                className="bg-white text-black text-sm px-6 py-2 rounded-full hover:bg-opacity-90 flex flex-row items-center space-x-2"
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.slice(0, itemsToShow).map((project, index) => (
              <div key={index}>
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
