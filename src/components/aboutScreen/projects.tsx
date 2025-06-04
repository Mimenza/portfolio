import React, { useEffect, useState } from "react";
import supabase from "../../supabase/client";
import { Project } from "../../interface/Project";
import AboutMeProjectCard from "../aboutScreen/projectCardAboutMe";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          .order("id", { ascending: true });

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
        // handle error if needed
      }
    };

    getProjects();
  }, []);

  return (
    <div className="w-full h-auto flex flex-col gap-10">
      <div className="flex flex-row justify-between items-center">
        <p className="text-text_primary dark:text-dark-text_primary text-bold flex flex-row items-center gap-2 font-bold font-clash text-xl-custom">
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
          {t("about.projects.title")}
        </p>
        <button
          className="bg-text_primary dark:bg-dark-text_primary text-background dark:text-dark-background px-6 py-2 rounded-full hover:bg-opacity-90"
          onClick={() => navigate("/projects")}
        >
          <span>{t("about.projects.more")}</span>
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={index}>
          <AboutMeProjectCard
            id={project.id}
            name={project.name}
            description={project.description}
            date={project.date}
            link={project.link}
            status={project.status}
            storage={project.storage}
            technologies={project.technologies}
            cover={project.cover}
            slug={project.slug}
          />
        </div>
      ))}
    </div>
  );
};

export default Projects;
