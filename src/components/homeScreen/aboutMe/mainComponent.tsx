// import { useRef } from "react";

import { useNavigate } from "react-router-dom";

import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import Particles from "../../../blocks/Backgrounds/Particles/Particles";
import Magnet from "../../../blocks/Animations/Magnet/Magnet";

const MainComponentAboutMe = () => {
  const navigate = useNavigate();
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <section className="w-full min-h-[70vh] flex flex-col justify-center items-start pt-16 pb-8 px-2 md:px-0">
      {/* Presentación */}
      <div
        className="absolute top-0 left-0 bottom-0 w-full h-full z-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={1000}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="mb-6 flex items-center gap-3 ">
        <span className="inline-block">
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
        </span>
        <ShinyText
          text="Hey! It's me Endika,"
          disabled={false}
          speed={2}
          className="text-lg-custom text-text_secondary dark:text-dark-text_secondary"
        />
      </div>

      {/* Título principal */}
      <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-clash font-bold leading-tight text-white max-w-5xl mb-4">
        <span className="text-secondary">Purpose-driven</span> development,
        meaningful digital solutions from{" "}
        <span className="text-secondary">front</span> to{" "}
        <span className="text-secondary">back</span>
      </h1>

      {/* Subtítulo / descripción */}
      <div className="flex flex-col md:flex-row md:justify-between w-full mb-8">
        <div className="flex flex-row gap-5">
          <div className="flex flex-1 items-center justify-center">
            <div className="border-b dark:border-dark-text_secondary border-text_secondary w-full" />
          </div>
          <p className=" flex-[1] text-lg-custom text-gray-300">
            I build meaningful digital solutions from front to back. Passionate
            about technology, vintage hardware, and continuous learning.
            Currently focused on React, React Native, and backend development.
          </p>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="flex flex-col md:flex-row justify-between w-full z-10">
        <div className="flex flex-row gap-6 mt-4 text-sm-custom text-gray-400">
          <a
            href="https://www.linkedin.com/in/endika-m-99aa26252/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition"
          >
            LINKEDIN ↗
          </a>
          <a
            href="https://github.com/Mimenza"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition"
          >
            GITHUB ↗
          </a>
          <a
            href="https://letterboxd.com/mimenza/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition"
          >
            LETTERBOX ↗
          </a>
          <a
            href="mailto:emimenza@gmail.com"
            className="hover:text-secondary transition"
          >
            GMAIL ↗
          </a>
        </div>
        <div className="mt-6 md:mt-0 flex items-center">
          <Magnet padding={250} disabled={false} magnetStrength={5}>
            <button
              className="bg-white text-black px-7 py-3 rounded-full font-bold hover:bg-opacity-90 flex flex-row items-center space-x-2 text-lg-custom shadow hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/about")}
            >
              Know me better
            </button>
          </Magnet>
        </div>
      </div>
    </section>
  );
};

export default MainComponentAboutMe;
