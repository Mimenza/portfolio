import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./projectCard";
import { useNavigate } from "react-router-dom";
import { useVariablesContext } from "../../../context/variablesContext";

import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import MainComponentProjectDetail from "../../shared/projectDetail/mainComponent";
import supabase from "../../../supabase/client";
import { Project } from "../../../interface/Project";

import { useTranslation } from "react-i18next";

const MainComponentProyects = () => {
  const { t } = useTranslation();
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const { phoneView } = useVariablesContext();

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProjectCardClick = (project: any) => {
    navigate(`/projects/${project.slug}`);
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
        }
      } catch (err) {
        // Manejo de error opcional
      }
    };

    getProjects();
  }, []);

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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
            </svg>
            <ShinyText
              text={t("home.projects.subtitle")}
              disabled={false}
              speed={2}
              className="text-lg-custom text-secondary dark:text-dark-secondary"
            />
          </div>
          <h1 className="text-6xl-custom font-bold font-clash mt-1 text-text_primary dark:text-dark-text_primary">
            {t("home.projects.title")}
          </h1>
          <div className="flex flex-row justify-between">
            <p className="mt-4 text-lg-custom text-text_secondary dark:text-dark-text_secondary">
              {t("home.projects.description")}
            </p>
            <div>
              {!phoneView ? (
                <button
                  className="bg-text_primary dark:bg-dark-text_primary text-background dark:text-dark-background px-7 py-3 rounded-full font-bold hover:bg-opacity-90 flex flex-row items-center space-x-2 text-lg-custom shadow hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    navigate("/projects");
                  }}
                >
                  <span>{t("home.projects.viewAllButton")}</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Container for Projects */}
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-10">
            {projects.slice(0, itemsToShow).map((project, index) => (
              <div
                key={index}
                className={index % 2 === 1 ? "md:mt-10 mt-5" : "mt-5"}
              >
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

        <div className="w-full h-auto flex justify-center items-center">
          {phoneView ? (
            <button
              className="w-auto bg-text_primary dark:bg-dark-text_primary text-background dark:text-dark-background px-7 py-3 rounded-full font-bold hover:bg-opacity-90 flex flex-row items-center space-x-2 text-lg-custom shadow hover:scale-105 transition-all duration-300"
              onClick={() => {
                navigate("/projects");
              }}
            >
              <span>{t("home.projects.viewAllButton")}</span>
            </button>
          ) : null}
        </div>
        {showProjectDetail && selectedProject && (
          <MainComponentProjectDetail
            projectDetails={selectedProject}
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
