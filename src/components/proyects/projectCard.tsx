import React, { useEffect, useRef, useState } from "react";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentCard = cardRef.current; // Copy ref to a variable
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the card is visible
    );

    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col shadow-lg mt-5 mx-5 z-10 ${
        isVisible ? "animate-fadeInUp" : "opacity-0"
      }`}
    >
      {/* Contenedor de la imagen */}
      <div className="w-full sm:w-full md:w-full lg:w-full xl:w-[450px] aspect-[16/9] bg-gray-400 rounded-[25px] overflow-hidden group cursor-pointer"  onClick={onClickProject}>
        <img
          src="https://picsum.photos/200/300"
          alt="Project"
          className="h-full w-full object-cover rounded-t-[20px] transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        
      </div>

      {/* Contenedor de texto */}
      <div className="p-4 max-w-[450px] h-[90px]">
        <div className="flex flex-row justify-between items-center h-full">
          <div className="">
            <h3 className="text-2xl text-white font-bold mb-2">Project name</h3>
            <p className="text-md text-gray-300">On development</p>
          </div>
          <div className="flex flex-row h-full space-x-2">
            <button className="h-full w-full aspect-square border border-gray-700 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out" onClick={onClickCode}>
              <FaCode className="text-gray-300 h-full w-full" />
            </button>
            <button className="h-full w-full aspect-square border border-gray-700 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out" onClick={onClickProject}>
              <FaArrowRight className="text-gray-300 h-full w-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
