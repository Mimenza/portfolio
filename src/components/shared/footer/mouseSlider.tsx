import React from "react";

import { useVariablesContext } from "../../../context/variablesContext";


const FooterSlider: React.FC = () => {
  const { phoneView, darkMode } = useVariablesContext();

  return (
    <>
      {!phoneView ? (
        <div className="absolute bottom-5 left-0 w-full h-20 flex items-center justify-center">
          <div
            className={`border w-[50px] h-[75px] rounded-2xl flex items-center justify-center animate-float ${
              darkMode ? "border-white" : "border-[#111827]"
            }`}
          >
            <div
              className={`h-3 w-3 rounded-full animate-fadeInDownScroll ${
                darkMode ? "bg-white" : "bg-[#111827]"
              }`}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FooterSlider;
