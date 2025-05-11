import { FaCode } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

import { FaJava } from "react-icons/fa"; //Java
import { FaAngular } from "react-icons/fa"; //Angular
import { FaPhp } from "react-icons/fa"; //Php
import { DiJqueryLogo } from "react-icons/di"; //Jquery
import { IoLogoJavascript } from "react-icons/io5"; //JavaScript
import { SiTypescript } from "react-icons/si"; //TypeScript
import { SiMysql } from "react-icons/si"; //MySQL
import { GiTreeBranch } from "react-icons/gi"; //Twig
import { SiCivicrm } from "react-icons/si"; //crm erp
import { BsFiletypeXml } from "react-icons/bs"; //Xml
import { FaHtml5 } from "react-icons/fa"; //html css
import { FaDrupal } from "react-icons/fa6"; //Drupal
import { TbBrandKotlin } from "react-icons/tb"; //kotlin
import { PiFileCDuotone } from "react-icons/pi"; //C
import { PiFileCSharpDuotone } from "react-icons/pi"; //C++
import { FaReact } from "react-icons/fa"; //React
import { TbBrandReactNative } from "react-icons/tb"; //React Native
import { RiTailwindCssFill } from "react-icons/ri"; //Tailwind
import { RiSupabaseFill } from "react-icons/ri"; //Supabase
import { SiAppwrite } from "react-icons/si"; //appwrite
import { IoLogoFirebase } from "react-icons/io5"; //Firebase
import { FaPlus } from "react-icons/fa"; //Plus
import { RxFontStyle } from "react-icons/rx"; // StyleSheet

import { IoLogoVercel } from "react-icons/io5"; //Vercel
import { SiExpo } from "react-icons/si"; //Expo
import { FaGithub } from "react-icons/fa"; //Github

import { env } from "process";
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
    "C++": <PiFileCSharpDuotone className="h-full w-full" />,
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

  return (
        <div className="flex flex-col z-10 w-full sm:w-full md:w-full lg:w-full bg-gray-600 bg-opacity-25 p-5 rounded-[25px] group transition-transform duration-300 ease-in-out">
          {/* Contenedor de la imagen */}
          <div
            className="aspect-[16/9] overflow-hidden cursor-pointer rounded-[25px]"
            onClick={() => onClickProject && onClickProject(id)}
          >
            <video
              src={cover}
              autoPlay
              muted
              loop
              className="h-full w-full object-cover rounded-[25px] transition-transform duration-300 ease-in-out group-hover:scale-105"
              onError={(e) => {
                const videoElement = e.target as HTMLVideoElement;
                videoElement.style.display = "none";
                const imgElement = videoElement.nextElementSibling as HTMLImageElement;
                imgElement.style.display = "block";
              }}
            />
            <img
              src={cover}
              className="h-full w-full object-cover rounded-[25px] transition-transform duration-300 ease-in-out group-hover:scale-105 hidden"
              onError={(e) => {
                const imgElement = e.target as HTMLImageElement;
                imgElement.src = Default || "";
              }}
            />
          </div>
    
          {/* Contenedor de texto */}
          <div className="justify-between flex flex-row h-[60px] m-2">
            <div className="items-center h-full w-auto">
              <h3 className="text-[clamp(1.25rem,2.5vw,1.5rem)] text-text_primary font-bold mb-2">{name}</h3>
              <p className="text-[clamp(0.75rem,1.5vw,1.25rem)] text-text_secondary whitespace-nowrap">{status}</p>
            </div>
            <div className="flex flex-row h-full space-x-2 items-center ">

              {technologies.slice(0, 4).map((tech, index) => (
              <div
                key={index}
                className="h-full w-full aspect-square border border-gray-600 border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out text-gray-300"
              >
                {technologyIcons[tech] || <FaPlus className="h-full w-full" />}
              </div>
            ))}
            </div>
          </div>
          <div className="text-md text-text_third mt-4 w-full text-justify">
            {description.length > 200
              ? `${description.substring(0, 200)}...`
              : description}
          </div>
        </div>
      );
    };

export default HorizontalCard;