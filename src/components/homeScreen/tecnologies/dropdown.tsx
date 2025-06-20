import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
import { MdWebAsset } from "react-icons/md";
import { PiPaintBrushHousehold } from "react-icons/pi";
import { DiStackoverflow } from "react-icons/di";
import { BsGear } from "react-icons/bs";

import { useVariablesContext } from "../../../context/variablesContext";
import supabase from "../../../supabase/client";

type DropdownProps = {
  category: number;
};

const icons = [
  FaCode,
  MdWebAsset,
  PiPaintBrushHousehold,
  DiStackoverflow,
  BsGear,
];

export default function Dropdown({ category }: DropdownProps) {
  const { t } = useTranslation();
  const [skills, setSkills] = useState<any[]>([]);
  
  // Reemplazamos el array title por claves i18n:
  const titleKeys = [
    "home.technologies.dropdown.programmingLanguages",
    "home.technologies.dropdown.webDevelopment",
    "home.technologies.dropdown.frontendFrameworks",
    "home.technologies.dropdown.backendPlatforms",
    "home.technologies.dropdown.toolsServices",
  ];

  const [winHeight, setWinHeight] = useState(window.innerHeight);
  const [maxHeight, setMaxHeight] = useState(winHeight - 480);

  const { currentDropDown, setCurrentDropDown } = useVariablesContext();
  const isOpen = currentDropDown === category;

  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data: skills, error } = await supabase
          .from("Tecnologies")
          .select("*")
          .eq("category", category);

        if (error) {
          //console.error("Error fetching technologies:", error);
          return;
        }

        setSkills(skills || []);
      } catch (err) {
        //console.error("Error:", err);
      }
    };

    getSkills();

    const handleResize = () => {
      setWinHeight(window.innerHeight);
      setMaxHeight(window.innerHeight - 680);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [category]);

  const Icon = icons[category];

  return (
    <div
      className="w-full mx-auto dark:bg-dark-muted bg-muted bg-opacity-25 text-white rounded-2xl shadow cursor-pointer"
      onClick={() => setCurrentDropDown(isOpen ? -1 : category)}
    >
      <div className="p-5 text-left font-medium flex items-center justify-between cursor-pointer text-text_primary dark:text-dark-text_primary">
        <span className="flex items-center gap-2">
          {Icon && <Icon className="mr-2" />}
          {t(titleKeys[category])}
        </span>
        <button>
          {isOpen ? (
            <IoMdArrowDropup className="h-6 w-6 text-text_secondary dark:text-dark-text_secondary" />
          ) : (
            <IoMdArrowDropdown className="h-6 w-6 text-text_secondary dark:text-dark-text_secondary" />
          )}
        </button>
      </div>

      <div
        className="transition-[max-height] duration-500 overflow-hidden px-4"
        style={{ maxHeight: isOpen ? `${maxHeight}px` : "0px" }}
      >
        <div
          className={`flex flex-wrap gap-2 text-white/90 ${
            isOpen ? "overflow-y-auto pb-4" : "overflow-hidden pb-0"
          } scrollbar-hide transition-all duration-500`}
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {skills.map((skill, idx) => (
            <span key={skill.id} className="flex items-center">
              {skill.name}
              {idx < skills.length - 1 && (
                <svg
                  className="size-4 ml-2 text-secondary fill-background dark:fill-dark-background"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
                </svg>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
