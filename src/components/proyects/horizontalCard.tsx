import { FaCode } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

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
    <div className="flex flex-col z-10 w-full sm:w-full md:w-full lg:w-full bg-gray-600 bg-opacity-25 hover:bg-opacity-50 p-5 rounded-[25px]">
      {/* Contenedor de la imagen */}
      <div
        className="aspect-[16/9] overflow-hidden group cursor-pointer rounded-[25px]"
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
          <h3 className="text-2xl text-white font-bold mb-2">{name}</h3>
          <p className="text-md text-gray-300">{status}</p>
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
            <FaArrowRight className="text-gray-300 h-full w-full" />
          </button>
        </div>
        
      </div>
      <div className="text-md text-gray-300 mt-2">
            {description}
        </div>
      
    </div>
  );
};

export default HorizontalCard;
