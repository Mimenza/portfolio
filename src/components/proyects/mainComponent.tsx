import React, { useState, useRef, useEffect } from "react";
import LightButton from "../ui/lightButton";
import MainComponentProjectDetail from "../projectDetail/mainComponent";
import ProjectCard from "./projectCard";
import CountUp from "../../blocks/TextAnimations/CountUp/CountUp";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/client";

const MainComponentProyects = () => {
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [animateNbr, setAnimateNbr] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null); // Cambiado para almacenar el proyecto completo

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

        const { data, error } = await supabase.from("Projects").select("*").eq("frontPage", true).order("id", { ascending: true });
  
        if (data?.length === 0) {
          console.error("No projects found");
          return;
        }
  
        if (data) {
          setProjects(data);
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
        className="h-auto xl:h-screen w-auto flex flex-col justify-center bg-black xl:px-60 sm:px-10"
      >
        <div className="text-white">
          <h1 className="text-7xl font-bold mt-1">Proyects</h1>
          <div className="flex flex-row justify-between">
            <p className="mt-4 text-lg">
              Here you can find some of my projects.
            </p>
            <div
              className={
                isButtonAnimating
                  ? "scale-110 transition-transform duration-300"
                  : "transition-transform"
              }
            >
              <LightButton onClick={() => {navigate("/projects")}}>
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
              </LightButton>
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