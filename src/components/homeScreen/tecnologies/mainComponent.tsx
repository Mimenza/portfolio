import React from "react";

import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import RotatingText from "../../../blocks/TextAnimations/RotatingText/RotatingText";

import Dropdown from "./dropdown";
const MainComponentTecnologies = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col mt-20 gap-5">
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
              text="Speciality"
              disabled={false}
              speed={2}
              className="text-lg-custom text-secondary dark:text-dark-secondary"
            />
          </div>
          <h1 className="text-text_primary dark:text-dark-text_primary text-6xl-custom font-bold font-clash">
            Areas of Expertise
          </h1>
          <p className="mt-4 text-lg-custom text-text_secondary dark:text-dark-text_secondary">
            Here you can find some of the tecnologies I have worked with.
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-full h-auto gap-5">
          <div className="flex flex-col gap-2 flex-1 min-w-0 w-full">
            <Dropdown
             category={0}
            />
            <Dropdown
              category={1}
            />
            <Dropdown
              category={2}
            />
            <Dropdown
              category={3}
            />
            <Dropdown
              category={4}
            />
          </div>
          <div className="flex flex-1 min-w-0 w-full items-start bg-secondary rounded-[25px] aspect-video md:aspect-[16/9] mt-4 md:mt-0" />
        </div>
      </div>
    </div>
  );
};

export default MainComponentTecnologies;
