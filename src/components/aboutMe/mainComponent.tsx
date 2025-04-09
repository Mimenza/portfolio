import React from "react";

import LightButton from "../ui/lightButton";

const MainComponentAboutMe = () => {
  return (
    <div className="h-auto w-screen flex flex-col md:flex-row items-center bg-black sm:h-auto md:h-screen lg:h-screen xl:h-screen 2xl:h-screen xl:pl-60 xl:pr-20 2xl:pl-60 2xl:pr-20 sm:pl-10 sm:pr-10 sm:py-20">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-floating1 animate-pulse"/>
      <div className="absolute top-1/2 left-2/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-floating2 animate-pulse"/>
      <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-25 animate-floating3 animate-pulse"/>
    
      {/* Left Text Div */}
      <div className="flex-[2] text-white flex flex-col justify-center pr-10">
        <h4 className="text-5xl font-bold mb-6">About me</h4>
        <p className="text-lg leading-relaxed mb-6 text-gray-400">
          I'm <span className="font-bold text-white">Endika Mimenza</span>,
          24-year-old web and mobile developer, with experience in application
          development. Currently learning React and React Native, while
          expanding my knowledge in backend development and languages like C and
          C++ at 42 Urduliz. Passionate about technology and continuous
          learning.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-gray-400">
          I'm passionate about the world of vintage technology and mechanical
          keyboards. In my free time, I'm working on a mobile app called{" "}
          <a href="#" className="text-white no-underline">
            TravelLens
          </a>
          , built with React Native. I've also created other mobile apps like{" "}
          <a href="#" className="text-white no-underline">
            Sagarra Jo
          </a>{" "}
          and{" "}
          <a href="#" className="text-white no-underline">
            Zap
          </a>
          . These are personal projects that let me explore and enjoy the
          intersection of creativity, code, and tech.
        </p>
        <div className="flex space-x-4">
          <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-400">
            Github
          </button>
          <LightButton text="Read my Cv" onClick={() => {}} />
        </div>
      </div>
      
      {/* Right Image Div */}
      <div className="flex-[1] flex items-center justify-center order-first md:order-none sm:pb-">
        <div className="h-96 w-72 bg-gray-400 rounded-xl overflow-hidden z-10">
          <img
            src="/path/to/your/image.jpg"
            alt="About Me"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MainComponentAboutMe;
