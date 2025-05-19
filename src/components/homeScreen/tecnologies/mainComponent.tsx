import React from "react";

import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import RotatingText from "../../../blocks/TextAnimations/RotatingText/RotatingText";

const MainComponentTecnologies = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col mt-20">
        <div className="flex flex-col w-full h-auto">
          <div className="flex flex-row items-center gap-2 mb-2">
            <svg
              className="size-4 text-secondary fill-background dark:fill-dark-background"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
            </svg>
            <ShinyText
              text="What do I use?"
              disabled={false}
              speed={2}
              className="text-lg-custom text-secondary dark:text-dark-secondary"
            />
          </div>
          <h1 className="text-text_primary dark:text-dark-text_primary text-6xl-custom font-bold font-clash">
            Tecnologies
          </h1>
          <p className="mt-4 text-lg-custom text-text_secondary dark:text-dark-text_secondary">
            Here you can find some of the tecnologies I have worked with.
          </p>
        </div>
        <div className="flex flex-row text-xl-custom font-bold text-text_secondary w-full h-auto mt-10 items-center justify-center gap-2">
          This is a 
          <RotatingText
            texts={["Test", "Beta", "Prototype", "Pilot", "Demo"]}
            mainClassName="px-2 sm:px-2 md:px-3 bg-secondary text-white text-xl-custom font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainComponentTecnologies;

