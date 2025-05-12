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
    <div className="h-auto w-full flex flex-row">
      <div className="flex-[1]">
        <p className="text-text_primary">{date}</p>
      </div>
      <div className="flex flex-[2] flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="font-bold text-text_primary">{name}</div>
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

        <div className="text-text_secondary">{description}</div>
        <div className="h-20 flex flex-nowrap space-x-4">
            {storage.map((link, index) => {
              const isVideo =
                link.includes(".mp4") ||
                link.includes(".webm") ||
                link.includes(".ogg");

              return (
                <div
                  key={index}
                  className="h-full aspect-video flex-shrink-0 rounded-[10px] overflow-hidden bg-black"
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
    // <div
    //   className="flex flex-col z-10 w-full sm:w-full md:w-full lg:w-full bg-muted bg-opacity-25 rounded-[25px] shadow-lg shadow-black/30 border border-muted border-opacity-25 p-2 m-2 cursor-pointer group"
    // >
    //   {/* Contenedor de la imagen */}
    //   <div className="aspect-[16/9] rounded-[25px] overflow-hidden group">
    //     <img
    //       src={cover || Default}
    //       className="h-full w-full object-cover rounded-[25px] transition-transform duration-300 ease-in-out group-hover:scale-105"
    //     />
    //   </div>
    //   {/* Contenedor de texto */}
    //   <div className="justify-between flex flex-row h-[60px] m-2">
    //     <div className="items-center h-full w-auto">
    //       <h3 className="text-2xl text-text_primary font-bold mb-2">{name}</h3>
    //       <p className="text-md text-text_secondary">{status}</p>
    //     </div>
    //     <div className="flex flex-row h-full space-x-2 items-center">
    //       <button
    //         className="h-full w-full aspect-square border border-muted border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out"
    //         onClick={() => window.open(link, "_blank")}
    //       >
    //         <FaCode className="text-text_third h-full w-full" />
    //       </button>
    //       <button
    //         className="h-full w-full aspect-square border border-muted border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out"
    //         onClick={() => onClickProject && onClickProject(id)}
    //       >
    //         <FaArrowRight className="text-text_third h-full w-full" />
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProjectCard;
