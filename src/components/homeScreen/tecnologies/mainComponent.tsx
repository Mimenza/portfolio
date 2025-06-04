import React, { useEffect, useState } from "react";

import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import { useVariablesContext } from "../../../context/variablesContext";
import Dropdown from "./dropdown";

import defaultImg from "../../../assets/imgs/pg.jpeg";
import img1 from "../../../assets/imgs/PL.avif";
import img2 from "../../../assets/imgs/WD.webp";
import img3 from "../../../assets/imgs/FE.webp";
import img4 from "../../../assets/imgs/BE.jpeg";
import img5 from "../../../assets/imgs/TS.jpeg";

import { useTranslation } from "react-i18next";

const MainComponentTecnologies = () => {
  const { t } = useTranslation();
  const { currentDropDown } = useVariablesContext();
  const images = [img1, img2, img3, img4, img5];

  const [fade, setFade] = useState(true);
  const [imgSrc, setImgSrc] = useState(defaultImg);

  useEffect(() => {
    setFade(false); // inicia fade out
    const timeout = setTimeout(() => {
      setImgSrc(currentDropDown === -1 ? defaultImg : images[currentDropDown]);
      setFade(true); // inicia fade in
    }, 200);

    return () => clearTimeout(timeout);
  }, [currentDropDown]);

  return (
    <div className="h-full w-full">
      <div className="flex flex-col md:mt-20 gap-5">
        <div className="flex flex-col w-full h-auto">
          <div className="flex flex-row items-center gap-2 mb-2">
            <svg
              className="size-4 text-secondary fill-background dark:fill-dark-background"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
            </svg>
            <ShinyText
              text={t("home.technologies.speciality")}
              disabled={false}
              speed={2}
              className="text-lg-custom text-secondary dark:text-dark-secondary"
            />
          </div>
          <h1 className="text-text_primary dark:text-dark-text_primary text-6xl-custom font-bold font-clash">
            {t("home.technologies.title")}
          </h1>
          <p className="mt-4 text-lg-custom text-text_secondary dark:text-dark-text_secondary">
            {t("home.technologies.description")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-full h-auto gap-5">
          <div className="flex flex-col gap-2 flex-1 min-w-0 w-full">
            <Dropdown category={0} />
            <Dropdown category={1} />
            <Dropdown category={2} />
            <Dropdown category={3} />
            <Dropdown category={4} />
          </div>
          <div className="flex-1 w-full mt-4 md:mt-0">
            <div className="relative w-full aspect-[16/9] rounded-[25px] overflow-hidden">
              <img
                className={`absolute inset-0 w-full h-full object-cover rounded-[25px] transition-opacity duration-300 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
                src={imgSrc}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponentTecnologies;
