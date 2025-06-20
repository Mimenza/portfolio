import React, { useState } from "react";

import { FaJava, FaAngular, FaPhp, FaHtml5, FaReact, FaPlus, FaDocker, FaWordpress, FaGithub } from "react-icons/fa";
import { DiJqueryLogo } from "react-icons/di";
import { IoLogoJavascript, IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import { SiTypescript, SiMysql, SiCivicrm, SiAppwrite, SiMariadb, SiNginx, SiExpo } from "react-icons/si";
import { GiTreeBranch } from "react-icons/gi";
import { BsFiletypeXml } from "react-icons/bs";
import { FaDrupal } from "react-icons/fa6";
import { TbBrandKotlin, TbBrandReactNative } from "react-icons/tb";
import { PiFileCDuotone, PiFileCpp } from "react-icons/pi";
import { RiTailwindCssFill, RiSupabaseFill } from "react-icons/ri";
import { RxFontStyle } from "react-icons/rx";

import Gallery from "../shared/projectDetail/gallery";

import { useVariablesContext } from "../../context/variablesContext";


const ProjectCard = ({
  id,
  name,
  description,
  date,
  link,
  status,
  technologies,
  storage,
  cover,
  slug,
}: {
  onClose?: () => void;
  id: Number;
  name: string;
  description: string;
  date: string;
  link: string;
  status: string;
  storage: Array<string>;
  technologies: Array<string>;
  cover: string;
  slug: string;
}) => {
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
    Docker: <FaDocker className="h-full w-full" />,
    Wordpress: <FaWordpress className="h-full w-full" />,
    MariaDB: <SiMariadb className="h-full w-full" />,
    Nginx: <SiNginx className="h-full w-full" />,
  };

  const { phoneView } = useVariablesContext();
  const [showGallery, setShowGallery] = useState(false);
  return (
    <div className="h-auto w-full flex flex-row">
      {!phoneView ? (
        <div className="flex-[1]">
          <p className="text-text_primary dark:text-dark-text_primary">
            {date}
          </p>
        </div>
      ) : null}

      <div className="flex flex-[2] flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="font-bold text-text_primary dark:text-dark-text_primary">
            {name}
          </div>
          {!phoneView ? (
            <div className="flex flex-row h-full space-x-2 items-center ">
              {technologies.slice(0, 4).map((tech, index) => (
                <div
                  key={index}
                  className="h-full w-full aspect-square border border-gray-600 border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out text-gray-300"
                >
                  {technologyIcons[tech] || (
                    <FaPlus className="h-full w-full" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="font-bold text-text_primary dark:text-dark-text_primary">
              {date}
            </div>
          )}
        </div>

        <div className="text-text_secondary dark:text-dark-text_secondary">
          {description}
        </div>
        <div className="h-20 flex flex-nowrap space-x-4" onClickCapture={() => setShowGallery(true)}>
          {storage.slice(0, 1).map((link, index) => {
            const isVideo =
              link.includes(".mp4") ||
              link.includes(".webm") ||
              link.includes(".ogg");

            return (
              <div
                key={index}
                className="h-full aspect-video flex-shrink-0 rounded-[10px] overflow-hidden bg-background dark:bg-dark-background cursor-pointer"
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
      {showGallery && (
        <Gallery
          items={storage.map((link) => ({
            src: link,
            type: link.includes(".mp4") ? "video" : "image",
          }))}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
};

export default ProjectCard;
