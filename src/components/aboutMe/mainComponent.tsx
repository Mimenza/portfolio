// import { useRef } from "react";

import { PiChatTeardropThin } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";

import LightButton from "../ui/lightButton";
import Aurora from "../../blocks/Backgrounds/Aurora/Aurora";
import BlurText from "../../blocks/TextAnimations/BlurText/BlurText";

import { ImgSpotlightBorder } from "../ui/imgSpotlightBorder";

// import VariableProximity from "../../blocks/TextAnimations/VariableProximity/VariableProximity";

const MainComponentAboutMe = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="relative h-auto w-screen flex flex-col items-center justify-center bg-black sm:h-auto md:h-screen lg:h-screen xl:h-screen 2xl:h-screen xl:pl-20 xl:pr-20 2xl:pl-20 2xl:pr-20 sm:pl-10 sm:pr-10 sm:py-20">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.7}
          speed={0.5}
        />
      </div>
      {/*Nueva fila: Botón adicional */}
      <div className="w-full flex py-6 absolute top-0 justify-between items-center px-40 animate-fadeInDown">
        <button className="px-6 py-2 rounded-full mr-20 flex flex-row items-center justify-between space-x-2"></button>
        <button className="bg-white text-black px-6 py-2 rounded-full mr-20 flex flex-row items-center justify-between space-x-2">
          <p>Say hi!</p>
          <PiChatTeardropThin />
        </button>
      </div>

      {/* Contenido existente */}
      <div className="w-full flex flex-col md:flex-row items-center animate-fadeInUp justify-around">
        {/* Left Text Div */}
        <div className=" text-white flex flex-col justify-center animate-float w-[50%] relative">
          <BlurText
            text="About me"
            delay={150}
            animateBy="letters"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="text-8xl font-bold mb-6 z-10"
            threshold={1}
          />

          {/* <div ref={containerRef} style={{ position: "relative" }}>
            <VariableProximity
              label={"About me"}
              className={"variable-proximity-demo text-8xl font-bold mb-6 z-10"}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff="gaussian"
            />
          </div> */}

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
            <LightButton onClick={() => {}}> Read my cv!</LightButton>
          </div>
        </div>

        <ImgSpotlightBorder />
      </div>
      {/* Footer */}
      <div className="absolute bottom-5 left-0 w-full h-20 bg-black flex items-center justify-center">
        <div className="border border-white w-[50px] h-[75px] rounded-2xl flex items-center justify-center animate-float">
          <div className="h-3 w-3 rounded-full bg-white animate-fadeInDownScroll" />
        </div>
      </div>
    </div>
  );
};

export default MainComponentAboutMe;
