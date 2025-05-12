// import { useRef } from "react";

import { FaGithub } from "react-icons/fa";

import LightButton from "../../ui/lightButton";
import BlurText from "../../../blocks/TextAnimations/BlurText/BlurText";
import GradientText from "../../../blocks/TextAnimations/GradientText/GradientText";
import { ImgSpotlightBorder } from "../../ui/imgSpotlightBorder";
import { useNavigate } from "react-router-dom";

// import VariableProximity from "../../blocks/TextAnimations/VariableProximity/VariableProximity";

const MainComponentAboutMe = () => {
  const navigate = useNavigate();
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center">
      {/* Contenido existente */}
      <div className="w-full flex flex-col md:flex-row items-center animate-fadeInUp justify-between">
        {/* Left Text Div */}
        <div className="flex flex-col justify-center animate-float w-[50%] relative">
          <div className="flex flex-row items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="#e303fc"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z"
                clipRule="evenodd"
              />
            </svg>
            <GradientText
              colors={["#e303fc", "#5a03fc", "#038cfc", "#e303fc", "#5a03fc", "#038cfc"]}
              animationSpeed={2}
              showBorder={false}
              className=""
            >
              KNOW ME BETTER
            </GradientText>
          </div>

          <BlurText
            text="Hi there!"
            delay={150}
            animateBy="letters"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="text-8xl font-bold mb-6 z-10 text-text_primary"
            threshold={1}
          />

          <p className="text-lg leading-relaxed mb-6 text-text_secondary z-10">
            I'm{" "}
            <span className="font-bold text-text_primary">Endika Mimenza</span>,
            25-year-old web and mobile developer, with experience in application
            development. Currently learning React and React Native, while
            expanding my knowledge in backend development and languages like C
            and C++ at{" "}
            <a
              href="https://42urduliz.com"
              className="text-text_primary no-underline"
            >
              42 Urduliz
            </a>
            . Passionate about technology and continuous learning.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-text_secondary z-10">
            I'm passionate about the world of vintage technology and mechanical
            keyboards. In my free time, I'm working on a mobile app called{" "}
            <a
              href="https://travellens.com"
              className="text-text_primary no-underline"
            >
              TravelLens
            </a>
            , built with React Native. I've also created other mobile apps like{" "}
            <a
              href="https://sagarrajo.com"
              className="text-text_primary no-underline"
            >
              Sagarra Jo
            </a>{" "}
            and{" "}
            <a
              href="https://zap.com"
              className="text-text_primary no-underline"
            >
              Zap
            </a>
            . These are personal projects that let me explore and enjoy the
            intersection of creativity, code, and tech.
          </p>
          <div className="flex space-x-4 z-10">
            <button
              className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-opacity-90 flex flex-row items-center space-x-2"
              onClick={() =>
                window.open("https://github.com/Mimenza", "_blank")
              }
            >
              <span>Github</span>
              <FaGithub />
            </button>
            <LightButton onClick={() => {navigate("/about")}}> Read about me!</LightButton>
          </div>
        </div>

        <ImgSpotlightBorder />
      </div>
      {/* Footer */}
      <div className="absolute bottom-5 left-0 w-full h-20 flex items-center justify-center">
        <div className="border border-white w-[50px] h-[75px] rounded-2xl flex items-center justify-center animate-float">
          <div className="h-3 w-3 rounded-full bg-white animate-fadeInDownScroll" />
        </div>
      </div>
    </div>
  );
};

export default MainComponentAboutMe;
