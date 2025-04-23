import { FaCode } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const ProjectCard = ({
  onClickCode,
  onClickProject,
  onClose,
}: {
  onClickCode?: () => void;
  onClickProject?: () => void;
  onClose?: () => void;
}) => {
  return (
    <div className="flex flex-col shadow-lg z-10 w-full sm:w-full md:w-full lg:w-full">
      {/* Contenedor de la imagen */}
      <div
        className=" aspect-[16/9] bg-gray-400 rounded-[25px] overflow-hidden group cursor-pointer"
        onClick={onClickProject}
      >
        <img
          src="https://picsum.photos/200/300"
          alt="Project"
          className="h-full w-full object-cover rounded-t-[20px] transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Contenedor de texto */}
      <div className="justify-between flex flex-row h-[60px] m-2">
        <div className="items-center h-full w-auto">
          <h3 className="text-2xl text-white font-bold mb-2">Project name</h3>
          <p className="text-md text-gray-300">On development</p>
        </div>
        <div className="flex flex-row h-full space-x-2 items-center">
          <button
            className="h-full w-full aspect-square border border-gray-700 rounded-[15px] p-2 bg-black hover:bg-neutral-900 transition duration-300 ease-in-out"
            onClick={onClickCode}
          >
            <FaCode className="text-gray-300 h-full w-full" />
          </button>
          <button
            className="h-full w-full aspect-square border border-gray-700 rounded-[15px] p-2 bg-black hover:bg-neutral-900 transition duration-300 ease-in-out "
            onClick={onClickProject}
          >
            <FaArrowRight className="text-gray-300 h-full w-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
