import { FaJava, FaAngular, FaPhp, FaHtml5, FaReact, FaPlus, FaDocker, FaWordpress, FaGithub } from "react-icons/fa";
import { FaDrupal } from "react-icons/fa6";
import { DiJqueryLogo } from "react-icons/di";
import { IoLogoJavascript, IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import { SiTypescript, SiMysql, SiCivicrm, SiAppwrite, SiMariadb, SiNginx, SiExpo } from "react-icons/si";
import { GiTreeBranch } from "react-icons/gi";
import { BsFiletypeXml } from "react-icons/bs";
import { TbBrandKotlin, TbBrandReactNative } from "react-icons/tb";
import { PiFileCDuotone, PiFileCpp } from "react-icons/pi";
import { RiTailwindCssFill, RiSupabaseFill } from "react-icons/ri";
import { RxFontStyle } from "react-icons/rx";

import { useVariablesContext } from "../../context/variablesContext";

const Default = process.env.REACT_APP_PROJECT_DEFAULT_IMG;

const HorizontalCard = ({
  onClickProject,
  id,
  name,
  link,
  status,
  description,
  img,
  technologies,
  cover,
}: {
  onClickProject?: (id: Number) => void;
  onClose?: () => void;
  id: Number;
  name: string;
  link: string;
  status: string;
  description: string;
  img: string[];
  technologies: string[];
  cover: string;
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
  return (
    <div
      className={`flex flex-col w-full sm:w-full md:w-full lg:w-full dark:bg-dark-muted bg-muted bg-opacity-25 group transition-transform duration-300 ease-in-out gap-2 ${
        phoneView ? "rounded-[12px] p-2" : "rounded-[25px] p-5"
      }`}
    >
      {/* Contenedor de la imagen */}
      <div
        className={`aspect-[16/9] overflow-hidden cursor-pointer ${
          phoneView ? "rounded-[12px]" : "rounded-[25px]"
        }`}
        onClick={() => onClickProject && onClickProject(id)}
      >
        <video
          src={cover}
          autoPlay
          muted
          loop
          className={`h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 ${
            phoneView ? "rounded-[12px]" : "rounded-[25px]"
          }`}
          onError={(e) => {
            const videoElement = e.target as HTMLVideoElement;
            videoElement.style.display = "none";
            const imgElement =
              videoElement.nextElementSibling as HTMLImageElement;
            imgElement.style.display = "block";
          }}
        />
        <img
          src={cover}
          className={`h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 hidden ${
            phoneView ? "rounded-[12px]" : "rounded-[25px]"
          }`}
          onError={(e) => {
            const imgElement = e.target as HTMLImageElement;
            imgElement.src = Default || "";
          }}
        />
      </div>

      {/* Contenedor de texto */}
      <div
        className={` flex flex-row   ${
          phoneView ? "my-1 h-auto items-center" : "my-2 h-[60px]"
        }`}
      >
        <div className="h-full w-auto flex flex-col flex-[1] justify-center">
          <h3
            className={` ${
              phoneView ? "text-sm-custom" : "text-lg-custom"
            } text-text_primary dark:text-dark-text_primary font-bold justify-between flex flex-row items-center`}
          >
            {name}
            {phoneView ? <span>{status}</span> : null}
          </h3>
          {!phoneView ? (
            <p className="text-sm-custom text-text_secondary dark:text-dark-text_secondary dark:text-dark-text_primary whitespace-nowrap">
              {status}
            </p>
          ) : null}
        </div>
        {!phoneView ? (
          <div className="flex flex-wrap gap-2 items-center justify-end flex-[1] overflow-hidden">
            {technologies.slice(0, 4).map((tech, index) => (
              <div
                key={index}
                className="h-full w-full flex items-center justify-center aspect-square max-w-[60px] max-h-[60px] flex-shrink-0 border border-gray-600 border-opacity-25 rounded-[15px] p-1 hover:bg-neutral-900 transition duration-300 ease-in-out text-gray-300"
              >
                <div className="w-full h-full">
                  {technologyIcons[tech] || (
                    <FaPlus className="w-full h-full object-contain" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {!phoneView ? (
        <div
          className="text-md-custom text-text_third dark:text-dark-text_third w-full text-justify overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineClamp: 2,
            maxHeight: "3em", // Aproximadamente 2 líneas
          }}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
};

export default HorizontalCard;
