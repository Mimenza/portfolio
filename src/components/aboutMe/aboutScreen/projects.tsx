import React, { useEffect, useState } from "react";

import supabase from "../../../supabase/client";
import { Project } from "../../../interface/Project";
import AboutMeProjectCard from "../../proyects/projectCardAboutMe";
import { useNavigate } from "react-router-dom";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
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
          .eq("frontPage", true) // Filtrar solo los proyectos de la página principal
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

  return (
    <div className="w-full h-auto flex flex-col gap-10">
      <div className="flex flex-row justify-between items-center">
        <p className="text-text_primary text-bold flex flex-row items-center gap-2">
          {" "}
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
          Side Projects
        </p>
        <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-90" onClick={() => navigate("/projects")}>
          <span>More projects</span>
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="animate-fadeInUp w-full">
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
