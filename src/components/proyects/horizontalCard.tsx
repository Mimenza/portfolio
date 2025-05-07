import { FaCode } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

import { FaJava } from "react-icons/fa";
import { FaAngular } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { FaPlus } from "react-icons/fa";
const HorizontalCard = ({
  onClickProject,
  id,
  name,
  link,
  status,
  description,
}: {
  onClickProject?: (id: Number) => void;
  onClose?: () => void;
  id: Number;
  name: string;
  link: string;
  status: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col z-10 w-full sm:w-full md:w-full lg:w-full bg-gray-600 bg-opacity-25 p-5 rounded-[25px] group transition-transform duration-300 ease-in-out">
      {/* Contenedor de la imagen */}
      <div
        className="aspect-[16/9] overflow-hidden cursor-pointer rounded-[25px]"
        onClick={() => onClickProject && onClickProject(id)}
      >
        <img
          src="https://picsum.photos/200/300"
          alt="Project"
          className="h-full w-full object-cover rounded-[25px] transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Contenedor de texto */}
      <div className="justify-between flex flex-row h-[60px] m-2">
        <div className="items-center h-full w-auto">
          <h3 className="text-[clamp(1.25rem,2.5vw,1.5rem)] text-text_primary font-bold mb-2">{name}</h3>
          <p className="text-[clamp(0.75rem,1.5vw,1.25rem)] text-text_secondary whitespace-nowrap">{status}</p>
        </div>
        <div className="flex flex-row h-full space-x-2 items-center">
          <button
            className="h-full w-full aspect-square border border-gray-600 border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out"
            onClick={() => window.open(link, "_blank")}
          >
            <FaCode className="text-gray-300 h-full w-full" />
          </button>
          <button
            className="h-full w-full aspect-square border border-gray-600 border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out"
            onClick={() => onClickProject && onClickProject(id)}
          >
            <FaArrowRight className="text-text_third h-full w-full" />
          </button>
        </div>
      </div>
      <div className="h-auto w-full flex flex-nowrap items-center justify-center gap-4 p-2 overflow-hidden">
        <div className="flex flex-1 aspect-square border border-gray-600 border-opacity-25 rounded-[15px] p-2 bg-text_third cursor-pointer flex items-center justify-center">
          <FaJava className="h-full w-full" />
        </div>
        <div className="aspect-squareflex flex-1 border border-gray-600 border-opacity-25 rounded-[15px] p-2 bg-text_third cursor-pointer flex items-center justify-center">
          <FaAngular className="h-full w-full" />
        </div>
        <div className="aspect-square flex flex-1 border border-gray-600 border-opacity-25 rounded-[15px] p-2 bg-text_third cursor-pointer flex items-center justify-center">
          <FaReact className="h-full w-full" />
        </div>
        <div className="aspect-square flex flex-1 border border-gray-600 border-opacity-25 rounded-[15px] p-2 bg-text_third cursor-pointer flex items-center justify-center">
          <SiMysql className="h-full w-full" />
        </div>
        <div className="aspect-square flex flex-1 border border-gray-600 border-opacity-25 rounded-[15px] p-2 bg-text_third cursor-pointer flex items-center justify-center">
          <FaPlus className="h-full w-full" />
        </div>
      </div>
      <div className="text-md text-text_third mt-2 w-full text-justify">
        {description.length > 200
          ? `${description.substring(0, 200)}...`
          : description}
      </div>
    </div>
  );
};

export default HorizontalCard;
