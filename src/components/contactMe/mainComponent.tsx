import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail, SiReaddotcv } from "react-icons/si";
import Aurora from "../../blocks/Backgrounds/Aurora/Aurora";

const MainComponentContact = () => {
  return (
    <div className="h-screen w-screen relative">
      {/* <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30  animate-pulse z-10" />
      <div className="absolute top-1/2 left-2/4 w-80 h-80 bg-orange-500 rounded-full blur-3xl opacity-20  animate-pulse z-10" />
      <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-25  animate-pulse z-10" /> */}
      <div className="absolute bottom-0 left-0 w-full h-full z-0 rotate-180">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.5}
          speed={0.5}
        />
      </div>
      <div className="flex flex-col bg-black xl:pl-60 xl:pr-20 2xl:pl-60 2xl:pr-20 sm:pl-10 sm:pr-10 sm:py-20">
        <div className="flex flex-col w-full h-auto">
          <h1 className="text-white text-8xl font-bold">Contact</h1>
          <p className="mt-4 text-lg text-gray-300">
            Feel free to drop me a message anytime— I'm all ears for cool and
            creative ideas!
          </p>
          <div className="flex flex-row mt-5 ml-4 space-x-8 z-10" >
            <button className="h-20 w-20 aspect-square border border-gray-700 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out">
              <FaGithub className="text-gray-300 h-full w-full" />
            </button>
            <button className="h-20 w-20 aspect-square border border-gray-700 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out">
              <FaLinkedin className="text-gray-300 h-full w-full" />
            </button>
            <button className="h-20 w-20 aspect-square border border-gray-700 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out">
              <SiGmail className="text-gray-300 h-full w-full" />
            </button>
            <button className="h-20 w-20 aspect-square border border-gray-700 rounded-[15px] p-2 hover:bg-neutral-900 transition duration-300 ease-in-out">
              <SiReaddotcv  className="text-gray-300 h-full w-full" />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-60 w-auto p-5 h-2/5 ">
        <div className="grid grid-cols-2 grid-rows-3 gap-4 mt-10 text-white w-full justify-center items-center">
          <div className="text-lg font-bold">Side-projects</div>
          <div className="text-lg font-bold">Contact</div>
          <div className="text-lg text-gray-300">Text</div>
          <div className="text-lg text-gray-300">Github</div>
          <div className="text-lg text-gray-300">Text</div>
          <div className="text-lg text-gray-300">Linkedin</div>
          <div className="text-lg text-gray-300">Text</div>
          <div className="text-lg text-gray-300">Gmail</div>
        </div>
      </div>
    </div>
  );
};

export default MainComponentContact;
