import React, { useEffect, useRef, useState } from "react";

const ProjectCard = ({
  onClick,
  onClose,
}: {
  onClick?: () => void;
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
      className={`flex flex-col shadow-lg mt-5 mx-5 z-10 cursor-pointer ${
        isVisible ? "animate-fadeInUp" : "opacity-0"
      }`}
      onClick={onClick}
    >
      {/* Contenedor de la imagen */}
      <div className="w-full sm:w-full md:w-full lg:w-full xl:w-[450px] aspect-[16/9] bg-gray-400 rounded-[25px] overflow-hidden group">
        <img
          src="https://picsum.photos/200/300"
          alt="Project"
          className="h-full w-full object-cover rounded-t-[20px] transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Contenedor de texto */}
      <div className="p-4 max-w-[450px]">
        <h3 className="text-2xl text-white font-bold mb-2">Project name</h3>
        <p className="text-md text-gray-300 font-bold">
          Temporal project description in order the user to give a better idea
          of the project.
        </p>
        {onClose && (
          <button
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onClick
              onClose();
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
