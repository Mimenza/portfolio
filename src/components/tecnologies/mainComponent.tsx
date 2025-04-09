import React from "react";


const MainComponentTecnologies = () => {
  return (
    <div className="h-auto w-screen">
      <div className="flex flex-col md:flex-row bg-black sm:h-auto md:h-screen lg:h-screen xl:h-screen 2xl:h-screen xl:pl-60 xl:pr-20 2xl:pl-60 2xl:pr-20 sm:pl-10 sm:pr-10 sm:py-20">
        <div className="flex flex-col w-full h-auto">
          <h1 className="text-white text-4xl font-bold">Tecnologies</h1>
          <p className="mt-4 text-lg text-gray-300">
            Here you can find some of the tecnologies I have worked with.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainComponentTecnologies;
