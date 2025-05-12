import React from "react";
import GradientText from "../../../blocks/TextAnimations/GradientText/GradientText";

const MainComponentTecnologies = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col mt-20">
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
              WHAT DO I USE?
            </GradientText>
          </div>
          <h1 className="text-text_primary text-6xl font-bold">Tecnologies</h1>
          <p className="mt-4 text-lg text-text_secondary">
            Here you can find some of the tecnologies I have worked with.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainComponentTecnologies;
