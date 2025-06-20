import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdClose } from "react-icons/io";
import { IoLogoJavascript, IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { FaJava, FaAngular, FaPhp, FaHtml5, FaReact, FaPlus, FaGithub } from "react-icons/fa";
import { FaDrupal } from "react-icons/fa6";
import { DiJqueryLogo } from "react-icons/di";
import { SiTypescript, SiMysql, SiCivicrm, SiAppwrite, SiExpo, SiMariadb, SiNginx } from "react-icons/si";
import { GiTreeBranch } from "react-icons/gi";
import { BsFiletypeXml } from "react-icons/bs";
import { TbBrandKotlin, TbBrandReactNative } from "react-icons/tb";
import { PiFileCDuotone, PiFileCpp } from "react-icons/pi";
import { RiTailwindCssFill, RiSupabaseFill } from "react-icons/ri";
import { RxFontStyle } from "react-icons/rx";

import { useVariablesContext } from "../../../context/variablesContext";
import Gallery from "./gallery";

interface ProjectDetails {
  id: number;
  name: string;
  descriptionEN: string;
  descriptionES: string;
  date: string;
  link: string;
  storage: string[];
  technologies: string[];
  slug: string;
}

const technologyIcons: { [key: string]: React.ReactNode } = {
  Java: <FaJava className="h-full w-full" />,
  Angular: <FaAngular className="h-full w-full" />,
  Php: <FaPhp className="h-full w-full" />,
  Jquery: <DiJqueryLogo className="h-full w-full" />,
  JavaScript: <IoLogoJavascript className="h-full w-full" />,
  TypeScript: <SiTypescript className="h-full w-full" />,
  Sql: <SiMysql className="h-full w-full" />,
  Twig: <GiTreeBranch className="h-full w-full" />,
  "Crm & Erp": <SiCivicrm className="h-full w-full" />,
  Xml: <BsFiletypeXml className="h-full w-full" />,
  "Html & Css": <FaHtml5 className="h-full w-full" />,
  Drupal: <FaDrupal className="h-full w-full" />,
  Kotlin: <TbBrandKotlin className="h-full w-full" />,
  C: <PiFileCDuotone className="h-full w-full" />,
  "C++": <PiFileCpp  className="h-full w-full" />,
  React: <FaReact className="h-full w-full" />,
  "React Native": <TbBrandReactNative className="h-full w-full" />,
  Tailwindcss: <RiTailwindCssFill className="h-full w-full" />,
  Supabase: <RiSupabaseFill className="h-full w-full" />,
  AppWrite: <SiAppwrite className="h-full w-full" />,
  Firebase: <IoLogoFirebase className="h-full w-full" />,
  StyleSheet: <RxFontStyle className="h-full w-full" />,
  Vercel: <IoLogoVercel className="h-full w-full" />,
  Expo: <SiExpo className="h-full w-full" />,
  Github: <FaGithub className="h-full w-full" />,
};

const MainComponentProjectDetail = ({
  onClose,
  isClosing,
  projectDetails,
  prevRoute,
}: {
  onClose: () => void;
  isClosing: boolean;
  projectDetails: ProjectDetails;
  prevRoute: string;
}) => {
  const navigate = useNavigate();
  const { showGallery, setShowGallery, phoneView, language } = useVariablesContext();

  useEffect(() => {
    document.title = `Emimenza | ${projectDetails.slug}`;
  }, [showGallery]);

  const handleClose = () => {
    document.title = `Emimenza | ${prevRoute}`;
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${
        isClosing ? "animate-fadeOutScale" : "animate-fadeInScale"
      }`}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-[#0b0b0d]/50"></div>
      <div className="bg-[#0b0b0d] border border-gray-800 rounded-[25px] w-[90%] h-[90%] relative flex flex-col md:overflow-hidden overflow-hidden p-5">
        <div className="flex flex-col w-full h-full flex-1 min-h-0">
          {/* Titulo y boton */}
          <div className="flex flex-row items-center justify-between">
            <span className="font-clash text-text_primary dark:text-dark-text_primary md:text-7xl-custom text-3xl-custom">
              {projectDetails.name}
            </span>
            <div className="h-full">
              <button
                className="text-white border border-white px-2 py-2 rounded-full font-bold flex flex-row items-center justify-between space-x-2"
                onClick={handleClose}
              >
                {!phoneView ? <span>Close</span> : null}
                <IoMdClose />
              </button>
            </div>
          </div>
          {/* Contenido principal */}
          <div className="flex flex-col flex-1 gap-4 overflow-auto">
            {/* Contenido */}
            <div className="flex flex-[1] flex-col sm:flex-row gap-2">
              <div className="flex flex-col justify-between h-full w-full flex-1">
                <span className="w-full h-full sm:w-[70%] text-text_secondary dark:text-dark-text_secondary text-xl-custom">
                  {language === "en" ? projectDetails.descriptionEN : projectDetails.descriptionES}
                </span>
                <div className="">
                  <p className="text-text_secondary dark:text-dark-text_secondary text-lg-custom mt-4">
                    <span className="text-white font-bold">
                      Technologies used:
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {projectDetails.technologies.map((tech, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-6 w-6 text-text_secondary dark:text-dark-text_secondary">
                          {technologyIcons[tech] || (
                            <FaPlus className="h-full w-full" />
                          )}
                        </div>
                        <span className="text-text_secondary dark:text-dark-text_secondary text-lg-custom">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center">
                  <div className="text-lg-custom text-white font-bold">
                    Date:
                  </div>
                  <div className="text-lg-custom text-gray-300 px-2">
                    {projectDetails.date}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="text-lg-custom text-white font-bold">
                    Docu:
                  </div>
                  <div
                    className="text-lg-custom Scroll text-gray-300 flex flex-row items-center justify-center space-x-2 cursor-pointer px-2"
                    onClick={() => navigate(`/projects/${projectDetails.slug}`)}
                  >
                    <span>Go</span>
                    <FiExternalLink />
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="text-lg-custom text-white font-bold">
                    Code:
                  </div>
                  <div
                    className="text-lg-custom text-gray-300 flex flex-row items-center justify-center space-x-2 cursor-pointer px-2"
                    onClick={() => window.open(projectDetails.link, "_blank")}
                  >
                    <span>Visit</span>
                    <FiExternalLink />
                  </div>
                </div>
              </div>
            </div>

            {/* Div de imágenes con altura controlada */}
            <div
              className="w-full flex flex-[1] min-h-[200px] overflow-x-hidden hover:overflow-x-auto"
              style={{ scrollbarGutter: "stable" }}
            >
              <div
                className="flex flex-nowrap space-x-4 cursor-pointer"
                onClick={() => setShowGallery(true)}
              >
                {projectDetails.storage.map((link, index) => {
                  const isVideo =
                    link.includes(".mp4") ||
                    link.includes(".webm") ||
                    link.includes(".ogg");

                  return (
                    <div
                      key={index}
                      className="h-full aspect-video flex-shrink-0 rounded-[20px] overflow-hidden bg-background dark:bg-dark-background"
                    >
                      {isVideo ? (
                        <video
                          src={link}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${link})` }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showGallery && (
        <Gallery
          items={projectDetails.storage.map((link) => ({
            src: link,
            type: link.includes(".mp4") ? "video" : "image",
          }))}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
};

export default MainComponentProjectDetail;
