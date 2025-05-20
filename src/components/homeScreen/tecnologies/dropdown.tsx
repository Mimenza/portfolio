import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import supabase from "../../../supabase/client";
import { FaCode } from "react-icons/fa6";
import { MdWebAsset } from "react-icons/md";
import { PiPaintBrushHousehold } from "react-icons/pi";
import { DiStackoverflow } from "react-icons/di";
import { BsGear } from "react-icons/bs";

import { useVariablesContext } from "../../../context/variablesContext";
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
  const [skills, setSkills] = useState<any[]>([]);
  const [title, setTitle] = useState([
    "Programming Languages",
    "Web Development",
    "Frontend Frameworks & Libraries",
    "Backend & Full Stack Platforms",
    "Tools & Services",
  ]);

  const { currentDropDown, setCurrentDropDown } = useVariablesContext();

  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data: skills, error } = await supabase
          .from("Tecnologies")
          .select("*")
          .eq("category", category);

        if (error) {
          console.error("Error fetching technologies:", error);
          return;
        }

        if (skills) {
          setSkills(skills);
        } else {
          console.error("No skills found");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getSkills();
  }, []);
  const isOpen = currentDropDown === category;

  return (
    <motion.div
      layout
      className="w-full mx-auto dark:bg-dark-muted bg-muted bg-opacity-25 text-white rounded-2xl shadow cursor-pointer"
      onClick={() =>
        setCurrentDropDown(isOpen ? -1 : category)
      }
    >
      <div className="p-5 text-left font-medium flex items-center justify-between text-text_primary dark:text-dark-text_primary">
        <span className="flex items-center gap-2">
          {icons[category] &&
            (() => {
              const Icon = icons[category];
              return <Icon className="mr-2" />;
            })()}
          {title[category]}
        </span>
        <span className="text-text_secondary dark:text-dark-text_secondary">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden px-4 pb-4"
          >
            <div className="flex flex-row flex-wrap items-center gap-2 text-white/90">
              {skills.map((skill, idx) => (
                <span key={skill.id} className="flex items-center">
                  {skill.name}
                  {idx < skills.length - 1 && (
                    <svg
                      className="size-4 mx-2 text-secondary fill-background dark:fill-dark-background"
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
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
