import React from "react";

import { PiChatTeardropThin } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";
import { PiMouseScrollThin } from "react-icons/pi";

import LightButton from "../ui/lightButton";
import Aurora from "../../blocks/Backgrounds/Aurora/Aurora";
import BlurText from "../../blocks/TextAnimations/BlurText/BlurText";

import { ImgSpotlightBorder } from "../ui/imgSpotlightBorder";

const MainComponentAboutMe = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="relative h-auto w-screen flex flex-col items-center justify-center bg-black sm:h-auto md:h-screen lg:h-screen xl:h-screen 2xl:h-screen xl:pl-20 xl:pr-20 2xl:pl-20 2xl:pr-20 sm:pl-10 sm:pr-10 sm:py-20">
      {/* Animaciones de fondo */}
      {/* <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30  animate-pulse z-10" />
      <div className="absolute top-1/2 left-2/4 w-80 h-80 bg-orange-500 rounded-full blur-3xl opacity-20  animate-pulse z-10" />
      <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-25  animate-pulse z-10" /> */}

      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.7}
          speed={0.5}
        />
      </div>
      {/* Nueva fila: Botón adicional */}
      <div className="w-full flex py-6 absolute top-0 justify-between items-center px-40 animate-fadeInDown">
        <button className="bg-black text-black px-6 py-2 rounded-full mr-20 flex flex-row items-center justify-between space-x-2">
          <p>Temp</p>
        </button>
        <button className="bg-white text-black px-6 py-2 rounded-full mr-20 flex flex-row items-center justify-between space-x-2">
          <p>Say hi!</p>
          <PiChatTeardropThin />
        </button>
      </div>

      {/* Contenido existente */}
      <div className="w-full flex flex-col md:flex-row items-center pl-40 animate-fadeInUp">
        {/* Left Text Div */}
        <div className="flex-[2] text-white flex flex-col justify-center pr-10 animate-float">
          {/* <h4 className="text-8xl font-bold mb-6 z-10">About me</h4> */}

          <BlurText
            text="About me"
            delay={150}
            animateBy="letters"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="text-8xl font-bold mb-6 z-10"
            threshold={1}
          />

          <p className="text-lg leading-relaxed mb-6 text-gray-400 z-10">
            I'm <span className="font-bold text-white">Endika Mimenza</span>,
            24-year-old web and mobile developer, with experience in application
            development. Currently learning React and React Native, while
            expanding my knowledge in backend development and languages like C
            and C++ at{" "}
            <a href="https://42urduliz.com" className="text-white no-underline">
              42 Urduliz
            </a>
            . Passionate about technology and continuous learning.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-400 z-10">
            I'm passionate about the world of vintage technology and mechanical
            keyboards. In my free time, I'm working on a mobile app called{" "}
            <a
              href="https://travellens.com"
              className="text-white no-underline"
            >
              TravelLens
            </a>
            , built with React Native. I've also created other mobile apps like{" "}
            <a href="https://sagarrajo.com" className="text-white no-underline">
              Sagarra Jo
            </a>{" "}
            and{" "}
            <a href="https://zap.com" className="text-white no-underline">
              Zap
            </a>
            . These are personal projects that let me explore and enjoy the
            intersection of creativity, code, and tech.
          </p>
          <div className="flex space-x-4 z-10">
            <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-400 flex flex-row items-center space-x-2">
              <span>Github</span>
              <FaGithub />
            </button>
            <LightButton text="Read my Cv" onClick={() => {}} />
          </div>
        </div>

        {/* Right Image Div */}
        {/* <div className="flex-[1] hidden md:flex items-center justify-center order-first md:order-none">
          <div className="h-96 w-72 bg-gray-400 rounded-xl overflow-hidden z-10">
            <img
              src="/path/to/your/image.jpg"
              alt="About Me"
              className="h-full w-full object-cover"
            />
          </div>
        </div> */}
        <ImgSpotlightBorder />
      </div>
      {/* Footer */}
      <div className="absolute bottom-5 left-0 w-full h-20 bg-black flex items-center justify-center">
          <div className="border border-white w-[50px] h-[75px] rounded-2xl flex items-center justify-center animate-float">
            <div className="h-3 w-3 rounded-full bg-white animate-fadeInDownScroll"/>
          </div>
      </div>
    </div>
  );
};

export default MainComponentAboutMe;
