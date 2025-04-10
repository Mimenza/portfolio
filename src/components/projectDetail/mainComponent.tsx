import React from "react";

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
    <div className="bg-black border border-gray-800 rounded-[25px] w-[90%] h-[90%] relative">
      <button
        className="bg-black text-white border border-white px-6 py-2 rounded-full font-bold absolute top-5 right-5"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default MainComponentProjectDetail;
