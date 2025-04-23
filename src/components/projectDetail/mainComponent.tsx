import React from "react";
import { IoMdClose } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
const MainComponentProjectDetail = ({
  onClose,
  isClosing,
}: {
  onClose: () => void;
  isClosing: boolean;
}) => (
  <div
    className={`fixed inset-0 z-20 flex items-center justify-center ${
      isClosing ? "animate-fadeOutScale" : "animate-fadeInScale"
    }`}
  >
    {/* Backdrop Blur */}
    <div className="absolute inset-0 backdrop-blur-sm bg-black/50"></div>
    {/* Modal Content */}
    <div className="bg-black border border-gray-800 rounded-[25px] w-[90%] h-[90%] relative flex flex-col overflow-hidden p-5">
      <div className="w-full flex flex-[2] bg-black justify-between">
        {" "}
        <button
          className="bg-black text-white border border-white px-6 py-2 rounded-full font-bold absolute top-5 right-5 flex flex-row items-center justify-between space-x-2"
          onClick={onClose}
        >
          <span>Close</span>
          <IoMdClose />
        </button>
        <div className="min-w-[40%] max-w-[60%]">
          <p className="text-white text-5xl font-bold">Project Title</p>
          <p className="text-gray-400  text-lg mt-4">
            Project description goes here. This is a brief overview of the
            project. It can include details about the project's purpose,
            features, and any other relevant information. Project description
            goes here. This is a brief overview of the project. It can include
            details about the project's purpose, features, and any other
            relevant information. Project description goes here. This is a brief
            overview of the project. It can include details about the project's
            purpose, features, and any other relevant information.
          </p>
          <p className="text-gray-400 text-lg mt-4">
            <span className="text-white font-bold">Technologies used:</span>{" "}
            React, TypeScript, Tailwind CSS, Node.js, Express
          </p>
        </div>

        <div className="flex flex-col pt-20">
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg text-white font-bold">Date:</div>
            <div className="text-lg text-gray-300 px-2">Text</div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg text-white font-bold">Link:</div>
            <div className="text-lg text-gray-300 flex flex-row items-center justify-center space-x-2 cursor-pointer px-2">
              <span>Visit</span>

              <FiExternalLink />
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full flex flex-[4] overflow-x-hidden hover:overflow-x-auto"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="flex flex-nowrap space-x-4">
          {/* Elemento 1 */}
          <div className="h-full aspect-video bg-gray-700 flex-shrink-0 rounded-[20px]"></div>
          {/* Elemento 2 */}
          <div className="h-full aspect-video bg-gray-600 flex-shrink-0 rounded-[20px]"></div>
          {/* Elemento 3 */}
          <div className="h-full aspect-video bg-gray-500 flex-shrink-0 rounded-[20px]"></div>
          {/* Agrega más elementos según sea necesario */}
        </div>
      </div>
    </div>
  </div>
);

export default MainComponentProjectDetail;
