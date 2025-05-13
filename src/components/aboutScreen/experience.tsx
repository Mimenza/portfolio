import React, { useEffect } from "react";
import { Experience as ExperienceInterface } from "../../interface/Experience";
import supabase from "../../supabase/client";

const Experience: React.FC = () => {
  const [experience, setExperience] = React.useState<ExperienceInterface[]>([]);
  
  useEffect(() => {
    const getExperience = async () => {
      try {
        const { data: experience, error } = await supabase
          .from("Experience")
          .select("*")
          .order("date", { ascending: false });

        if (error) {
          console.error("Error fetching experience:", error);
          return;
        }

        if (experience) {
          setExperience(experience);
        } else {
          console.error("No experience found");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getExperience();
  }, []);

  return (
    <div className="w-full flex flex-col h-auto gap-5">
      <p className="text-text_primary dark:text-dark-text_primary text-bold flex flex-row items-center gap-2 font-bold text-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className="size-4 dark:fill-dark-secondary fill-secondary"
        >
          <path
            fillRule="evenodd"
            d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z"
            clipRule="evenodd"
          />
        </svg>
        Experience
      </p>

      {experience.map((exp, index) => (
        <div key={index} className="h-auto w-full flex flex-row">
          <div className="flex-[1]">
            <p className="text-text_primary dark:text-dark-text_primary">{exp.date}</p>
          </div>
          <div className="flex flex-[2] flex-col gap-5">
            <div className="flex flex-row justify-between items-center h-10">
              <div className="font-bold text-text_primary dark:text-dark-text_primary">{exp.company}</div>
              <img
                src={exp.logo}
                alt="logo"
                className="h-full aspect-square rounded-[10px]"
              />
            </div>
            <div className="text-text_secondary dark:text-dark-text_secondary">{exp.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
