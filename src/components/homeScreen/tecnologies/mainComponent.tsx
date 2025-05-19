import React from "react";


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
             <span className="text-lg-custom text-secondary dark:text-dark-secondary">
              What do I use?
            </span>
          </div>
          <h1 className="text-text_primary dark:text-dark-text_primary text-6xl-custom font-bold font-clash">Tecnologies</h1>
          <p className="mt-4 text-lg-custom text-text_secondary dark:text-dark-text_secondary">
            Here you can find some of the tecnologies I have worked with.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainComponentTecnologies;
