import { FaCode } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

import { useVariablesContext } from "../../../context/variablesContext";
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
  onClickProject?: (id: Number) => void;
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
  const { phoneView } = useVariablesContext();
  return (
    <div
      className={`flex flex-col w-full sm:w-full md:w-full lg:w-full dark:bg-dark-muted bg-muted bg-opacity-25 shadow-lg shadow-black/30 border dark:border-dark-muted border-muted border-opacity-25 cursor-pointer group gap-2 ${
        phoneView ? "rounded-[12px] p-2" : "rounded-[25px] p-3"
      }`}
      onClick={() => onClickProject && onClickProject(id)}
    >
      {/* Contenedor de la imagen */}
      <div
        className={`aspect-[16/9] overflow-hidden group ${
          phoneView ? "rounded-[12px]" : "rounded-[25px]"
        }`}
      >
        <img
          src={cover || Default}
          className={`h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 ${
            phoneView ? "rounded-[12px]" : "rounded-[25px]"
          }`}
        />
      </div>
      {/* Contenedor de texto */}
      <div
        className={`flex flex-row   ${
          phoneView
            ? "my-1 h-auto items-center"
            : "my-2 h-[60px] justify-between"
        }`}
      >
        <div className="items-center h-full w-auto">
          <h3
            className={` ${
              phoneView ? "text-sm-custom" : "text-lg-custom"
            } text-2xl-custom text-text_primary dark:text-dark-text_primary font-bold`}
          >
            {name}
          </h3>
          {!phoneView ? (
            <p className="text-md-custom text-text_secondary dark:text-dark-text_secondary">
              {status}
            </p>
          ) : null}
        </div>
        {!phoneView ? (
          <div className="flex flex-row h-full space-x-2 items-center">
            <button
              className="h-full w-full aspect-square border dark:border-dark-muted border-muted border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out"
              onClick={() => window.open(link, "_blank")}
            >
              <FaCode className="text-text_third dark:text-dark-text_third h-full w-full" />
            </button>
            <button
              className="h-full w-full aspect-square border dark:border-dark-muted border-muted border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out"
              onClick={() => onClickProject && onClickProject(id)}
            >
              <FaArrowRight className="text-text_third dark:text-dark-text_third h-full w-full" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard;
