import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail, SiReaddotcv } from "react-icons/si";
import Aurora from "../../blocks/Backgrounds/Aurora/Aurora";
import GradientText from "../../blocks/TextAnimations/GradientText/GradientText";

const MainComponentContact = () => {
  return (
    <div className="h-screen w-screen relative">
      {/* <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30  animate-pulse z-10" />
      <div className="absolute top-1/2 left-2/4 w-80 h-80 bg-orange-500 rounded-full blur-3xl opacity-20  animate-pulse z-10" />
      <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-25  animate-pulse z-10" /> */}
      {/* <div className="absolute bottom-[-350px] left-0 w-full h-full z-0 rotate-180">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.5}
          speed={0.5}
        />
      </div> */}
      <div className="flex flex-col xl:pl-60 xl:pr-20 2xl:pl-60 2xl:pr-20 sm:pl-10 sm:pr-10 sm:py-20">
        <div className="flex flex-col w-full h-auto">
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
              colors={[
                "#e303fc",
                "#5a03fc",
                "#038cfc",
                "#e303fc",
                "#5a03fc",
                "#038cfc",
              ]}
              animationSpeed={2}
              showBorder={false}
              className=""
            >
              LETS CONNECT
            </GradientText>
          </div>
          <h1 className="text-text_primary text-6xl font-bold">Contact</h1>
          <p className="mt-4 text-lg text-text_secondary">
            Feel free to drop me a message anytime— I'm all ears for cool and
            creative ideas!
          </p>
          <div className="flex flex-row mt-5 ml-4 space-x-8 z-10">
            <button className="h-20 w-20 aspect-square border border-muted border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out">
              <FaGithub className="text-text_secondary h-full w-full" />
            </button>
            <button className="h-20 w-20 aspect-square border border-muted border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out">
              <FaLinkedin className="text-text_secondary h-full w-full" />
            </button>
            <button className="h-20 w-20 aspect-square border border-muted border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out">
              <SiGmail className="text-text_secondary h-full w-full" />
            </button>
            <button className="h-20 w-20 aspect-square border border-muted border-opacity-25 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out">
              <SiReaddotcv className="text-text_secondary h-full w-full" />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-60 w-auto p-5 h-2/5 ">
        <div className="grid grid-cols-2 grid-rows-3 gap-4 mt-10 text-white w-full justify-center items-center">
          <div className="text-lg font-bold text-text_primary">
            Side-projects
          </div>
          <div className="text-lg font-bold text-text_primary">Contact</div>
          <div className="text-lg text-text_secondary">Text</div>
          <div className="text-lg text-text_secondary">Github</div>
          <div className="text-lg text-text_secondary">Text</div>
          <div className="text-lg text-text_secondary">Linkedin</div>
          <div className="text-lg text-text_secondary">Text</div>
          <div className="text-lg text-text_secondary">Gmail</div>
        </div>
      </div>
    </div>
  );
};

export default MainComponentContact;
