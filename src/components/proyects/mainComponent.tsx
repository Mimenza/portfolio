import React, { useState, useRef, useEffect } from "react";
import LightButton from "../ui/lightButton";
import MainComponentProjectDetail from "../projectDetail/mainComponent";
import ProjectCard from "./projectCard";
import CountUp from "../../blocks/TextAnimations/CountUp/CountUp";
import GradientText from "../../blocks/TextAnimations/GradientText/GradientText";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/client";
import { Project } from "../../interface/Project";


const MainComponentProyects = () => {
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [animateNbr, setAnimateNbr] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCountUpEnd = () => {
    setIsButtonAnimating(true);
    setTimeout(() => {
      setIsButtonAnimating(false);
    }, 300);
  };

  const handleProjectCardClick = (project: any) => {
    setSelectedProject(project); // Guardar el proyecto completo
    setShowProjectDetail(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowProjectDetail(false);
      setSelectedProject(null); // Limpiar el proyecto seleccionado
    }, 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimateNbr(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
            cover: project["Projects-Storage"]
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

  const navigate = useNavigate();
  return (
    <>
      <div
        ref={sectionRef}
        className="h-auto xl:h-screen w-auto flex flex-col justify-center xl:px-60 sm:px-10"
      >
        <div className="">
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
                          colors={["#e303fc", "#5a03fc", "#038cfc", "#e303fc", "#5a03fc", "#038cfc"]}
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
              Here's a selection showcasing my expertise and the achieved results
            </p>
            <div
              className={
                isButtonAnimating
                  ? "scale-110 transition-transform duration-300"
                  : "transition-transform"
              }
            >
              {/* <LightButton
                onClick={() => {
                  navigate("/projects");
                }}
              >
                <CountUp
                  from={0}
                  to={100}
                  separator=","
                  direction="up"
                  delay={2}
                  duration={1}
                  className="count-up-text"
                  startWhen={animateNbr}
                  onEnd={handleCountUpEnd}
                />
                {" Projects here!"}
              </LightButton> */}
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
        <div className="flex justify-center w-full h-auto mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 w-full">
            {projects.map((project, index) => (
              <div key={index} className="animate-fadeInUp w-full">
                <ProjectCard
                  onClickProject={() => handleProjectCardClick(project)} // Pasar el proyecto completo
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
      </div>
      {showProjectDetail && selectedProject && (
        <MainComponentProjectDetail
          projectDetails={selectedProject} // Pasar el proyecto seleccionado
          onClose={handleClose}
          isClosing={isClosing}
        />
      )}
    </>
  );
};

export default MainComponentProyects;
