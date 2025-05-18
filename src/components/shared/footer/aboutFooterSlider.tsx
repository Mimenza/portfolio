import React from "react";
import { useVariablesContext } from "../../../context/variablesContext";

const FooterSlider: React.FC = () => {
  const { phoneView } = useVariablesContext();

  console.log("phoneView", phoneView);
  return (

    <>
      {!phoneView ? (
        <div className="absolute bottom-5 left-0 w-full h-20 flex items-center justify-center">
          <div className="border border-white w-[50px] h-[75px] rounded-2xl flex items-center justify-center animate-float">
            <div className="h-3 w-3 rounded-full bg-white animate-fadeInDownScroll" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FooterSlider;
