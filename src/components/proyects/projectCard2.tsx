import React, { useEffect, useRef, useState } from "react";

const ProjectCard2 = ({
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
      className={`flex flex-col mt-5 mx-5 z-10 rounded-[20px] overflow-hidden border border-neutral-800 ${
        isVisible ? "animate-fadeInUp" : "opacity-0"
      }`}
      onClick={onClick}
    >
      {/* Contenedor de la imagen */}
      <div className="w-full sm:w-full md:w-full lg:w-full xl:w-[450px] aspect-[16/9] overflow-hidden group relative cursor-pointer">
        <img
        //   src="https://picsum.photos/200/300"
          alt="Project"
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 z-0"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col z-10">
          <div className="bg-gradient-to-b from-transparent to-black bottom-0 w-full h-full" />
          {/* Contenedor de texto */}
          <div className=" bottom-0 w-full h-auto">
            <div className="bg-black p-5 relative z-10">
              <h3 className="text-2xl text-white font-bold mb-2">
                Project name
              </h3>
              <p className="text-md text-gray-300 font-bold">
                Temporal project description in order the user to give a better
                idea of the project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard2;
