import React from "react";
import { FaJava } from "react-icons/fa";
import { FaAngular } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { DiJqueryLogo } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { GiTreeBranch } from "react-icons/gi";
import { SiCivicrm } from "react-icons/si";
import { BsFiletypeXml } from "react-icons/bs";
import { FaHtml5 } from "react-icons/fa";
import { FaDrupal } from "react-icons/fa6";
import { TbBrandKotlin } from "react-icons/tb";
import { PiFileCDuotone } from "react-icons/pi";
import { PiFileCSharpDuotone } from "react-icons/pi";
import { FaReact } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";
import { RiTailwindCssFill } from "react-icons/ri";
import { RiSupabaseFill } from "react-icons/ri";
import { SiAppwrite } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { RxFontStyle } from "react-icons/rx";
import { IoLogoVercel } from "react-icons/io5";
import { SiExpo } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const techs = [
  { name: "Java", icon: FaJava },
  { name: "Angular", icon: FaAngular },
  { name: "Php", icon: FaPhp },
  { name: "Jquery", icon: DiJqueryLogo },
  { name: "JavaScript", icon: IoLogoJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "MySQL", icon: SiMysql },
  { name: "Twig", icon: GiTreeBranch },
  { name: "CRM/ERP", icon: SiCivicrm },
  { name: "XML", icon: BsFiletypeXml },
  { name: "HTML/CSS", icon: FaHtml5 },
  { name: "Drupal", icon: FaDrupal },
  { name: "Kotlin", icon: TbBrandKotlin },
  { name: "C", icon: PiFileCDuotone },
  { name: "C++", icon: PiFileCSharpDuotone },
  { name: "React", icon: FaReact },
  { name: "React Native", icon: TbBrandReactNative },
  { name: "Tailwind", icon: RiTailwindCssFill },
  { name: "Supabase", icon: RiSupabaseFill },
  { name: "Appwrite", icon: SiAppwrite },
  { name: "Firebase", icon: IoLogoFirebase },
  { name: "StyleSheet", icon: RxFontStyle },
  { name: "Vercel", icon: IoLogoVercel },
  { name: "Expo", icon: SiExpo },
  { name: "Github", icon: FaGithub },
];

const TechCarousell = () => {
 // Repite el array varias veces para asegurar que nunca se quede sin palabras
   const repeatCount = 10; // Ajusta según el ancho de tu pantalla/carrusel
   const displayWords = Array(repeatCount).fill(techs).flat();
 
   return (
     <div
       className={`overflow-hidden w-full py-6 my-10 mb:my-20 border border-x border-text_secondary`}
       style={{
         maskImage:
           "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
       }}
     >
       <div
         className="flex flex-row items-center animate-carousel whitespace-nowrap gap-4"
         style={{ animation: "carousel-scroll 30s linear infinite" }}
       >
        {displayWords.map((word, idx) => {
  const IconComponent = word.icon;
  return (
    <React.Fragment key={word.name + idx}>
      <span className="text-3xl font-clash text-gray-400 font-medium tracking-wide flex items-center gap-2">
        <IconComponent className="text-secondary"/>
        {word.name}
      </span>
      {idx < displayWords.length - 1 && (
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
      )}
    </React.Fragment>
  );
})}
       </div>
       <style>
         {`
         @keyframes carousel-scroll {
           0% { transform: translateX(0); }
           100% { transform: translateX(-${100 / repeatCount}%); }
         }
         .animate-carousel {
           min-width: ${repeatCount * 200}%;
         }
         `}
       </style>
     </div>
   );
};

export default TechCarousell;

