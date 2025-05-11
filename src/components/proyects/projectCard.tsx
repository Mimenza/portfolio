import { FaCode } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { env } from "process";
import { useEffect } from "react";
const Default = process.env.REACT_APP_PROJECT_DEFAULT_IMG;


const ProjectCard = ({
  onClickProject,
  id,
  name,
  link,
  status,
  img,
  technologies,
  cover,
  slug,
}: {
  onClickProject?: (id:Number) => void;
  onClose?: () => void;
  id: Number;
  name: string;
  link: string;
  status: string;
  img: Array<string>;
  technologies: Array<string>;
  cover: string;
  slug: string;
}) => {
  return (
    <div
      className="flex flex-col z-10 w-full sm:w-full md:w-full lg:w-full bg-muted bg-opacity-25 rounded-[25px] shadow-lg shadow-black/30 border border-muted border-opacity-25 p-2 m-2 cursor-pointer group"
    >
      {/* Contenedor de la imagen */}
      <div className="aspect-[16/9] rounded-[25px] overflow-hidden group">
        <img
          src={cover || Default}
          className="h-full w-full object-cover rounded-[25px] transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      {/* Contenedor de texto */}
      <div className="justify-between flex flex-row h-[60px] m-2">
        <div className="items-center h-full w-auto">
          <h3 className="text-2xl text-text_primary font-bold mb-2">{name}</h3>
          <p className="text-md text-text_secondary">{status}</p>
        </div>
        <div className="flex flex-row h-full space-x-2 items-center">
          <button
            className="h-full w-full aspect-square border border-muted border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out"
            onClick={() => window.open(link, "_blank")}
          >
            <FaCode className="text-text_third h-full w-full" />
          </button>
          <button
            className="h-full w-full aspect-square border border-muted border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out"
            onClick={() => onClickProject && onClickProject(id)}
          >
            <FaArrowRight className="text-text_third h-full w-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
