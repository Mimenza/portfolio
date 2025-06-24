import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { useLogedUser } from "../context/logedUserContext";
import { useVariablesContext } from "../context/variablesContext";
import supabase from "../supabase/client";

import Menu from "../components/shared/menu/menu";
import PhoneMenu from "../components/shared/menu/phoneMenu";

import Footer from "../components/shared/footer/footer";
import HorizontalCard from "../components/projectScreen/horizontalCard";
import MainComponentProjectDetail from "../components/shared/projectDetail/mainComponent";

import { IoMdArrowDropdown } from "react-icons/io";

import ShinyText from "../blocks/TextAnimations/ShinyText/ShinyText";

import { useTranslation } from "react-i18next";

const ProjectsScreen = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { logedUser } = useLogedUser();

  const [showProjectDetail, setShowProjectDetail] = React.useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const { phoneView, language } = useVariablesContext();

  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [orderBy, setOrderBy] = useState<string>("Newest");
  const [technologyFilter, setTechnologyFilter] = useState<string>("All");

  const allTechnologies = React.useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => {
      if (Array.isArray(p.technologies)) {
        p.technologies.forEach((t: string) => techSet.add(t));
      }
    });
    return Array.from(techSet).sort();
  }, [projects]);

  useEffect(() => {
    document.title = "Emimenza | " + t("projects.Projects");
    window.scrollTo(0, 0);
  }, [t]);

  const handleProjectCardClick = (project: any) => {
    navigate(`/projects/${project.slug}`);
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

        if (error) return;

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
          setFilteredProjects(formattedProjects);
        }
      } catch (err) { }
    };

    getProjects();
  }, []);

  useEffect(() => {
    let filtered = [...projects];
    if (statusFilter !== "All") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }
    if (technologyFilter !== "All") {
      filtered = filtered.filter(
        (p) =>
          Array.isArray(p.technologies) &&
          p.technologies.includes(technologyFilter)
      );
    }
    if (orderBy === "Newest") {
      filtered = filtered.sort((a, b) => b.order - a.order);
    } else if (orderBy === "Oldest") {
      filtered = filtered.sort((a, b) => a.order - b.order);
    } else if (orderBy === "A-Z") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderBy === "Z-A") {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredProjects(filtered);
  }, [projects, statusFilter, orderBy, technologyFilter]);

  const [isClosing, setIsClosing] = React.useState(false);

  return (
    <div className="min-h-screen overflow-hidden relative md:pt-10 pb-10 items-center flex flex-col">
      {phoneView ? (
        <PhoneMenu selectedSection={2} />
      ) : (
        <Menu selectedSection={2} />
      )}

      <div className="fixed top-0 left-0 w-screen h-10 z-10 bg-gradient-to-b from-background dark:from-dark-background to-transparent"></div>
      <div className="fixed bottom-0 left-0 w-screen h-10 z-10 bg-gradient-to-b from-transparent dark:to-dark-background to-background"></div>

      <div className="min-h-screen h-full w-full relative my-20">
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
            text={t("projects.Most of my work")}
            disabled={false}
            speed={2}
            className="text-lg-custom text-secondary dark:text-dark-secondary"
          />
        </div>
        <p className="text-6xl-custom font-bold font-clash mt-1 text-text_primary dark:text-dark-text_primary mb-4">
          {t("projects.Projects")}
        </p>
        <p className="m-4 text-lg-custom text-text_secondary dark:text-dark-text_secondary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {t("projects.Here you can find most of my projects.")}
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-4 mb-6 mt-6 w-full sm:w-auto">
            <div className="relative w-full">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-muted dark:bg-dark-muted text-text_primary dark:text-dark-text_primary px-6 py-2 pr-10 rounded-full hover:bg-opacity-90 focus:outline-none"
              >
                <option value="All">{t("projects.All Status")}</option>
                <option value="On Development">{t("projects.On Development")}</option>
                <option value="Finished">{t("projects.Finished")}</option>
                <option value="Getting Updates">{t("projects.Getting Updates")}</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <IoMdArrowDropdown />
              </div>
            </div>

            <div className="relative w-full">
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="w-full appearance-none bg-muted dark:bg-dark-muted text-text_primary dark:text-dark-text_primary px-6 py-2 pr-10 rounded-full hover:bg-opacity-90 focus:outline-none"
              >
                <option value="Newest">{t("projects.Newest")}</option>
                <option value="Oldest">{t("projects.Oldest")}</option>
                <option value="A-Z">{t("projects.A-Z")}</option>
                <option value="Z-A">{t("projects.Z-A")}</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <IoMdArrowDropdown />
              </div>
            </div>

            <div className="relative w-full">
              <select
                value={technologyFilter}
                onChange={(e) => setTechnologyFilter(e.target.value)}
                className="w-full appearance-none bg-muted dark:bg-dark-muted text-text_primary dark:text-dark-text_primary px-6 py-2 pr-10 rounded-full hover:bg-opacity-90 focus:outline-none"
              >
                <option value="All">{t("projects.All Technologies")}</option>
                {allTechnologies.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <IoMdArrowDropdown />
              </div>
            </div>
          </div>
        </p>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-10 h-auto w-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const colIndex = index % 2;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 20 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  className={colIndex === 1 ? "md:mt-10 mt-5" : "mt-5"}
                >
                  <HorizontalCard
                    onClickProject={() => {
                      handleProjectCardClick(project);
                    }}
                    id={project.id}
                    name={project.name}
                    link={project.link}
                    status={language === "en" ? project.statusEN : project.statusES}
                    description={language === "en" ? project.descriptionEN : project.descriptionES}
                    img={project.storage}
                    technologies={project.technologies}
                    cover={project.cover}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <Footer />

      {showProjectDetail && selectedProject && (
        <MainComponentProjectDetail
          projectDetails={selectedProject}
          onClose={handleClose}
          isClosing={isClosing}
          prevRoute="projects"
        />
      )}
    </div>
  );
};

export default ProjectsScreen;
