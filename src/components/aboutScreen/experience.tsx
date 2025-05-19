import React, { useEffect } from "react";
import { Experience as ExperienceInterface } from "../../interface/Experience";
import supabase from "../../supabase/client";
import { useVariablesContext } from "../../context/variablesContext";

const Experience: React.FC = () => {
  const [experience, setExperience] = React.useState<ExperienceInterface[]>([]);
  const { phoneView } = useVariablesContext();

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
      <p className="text-text_primary dark:text-dark-text_primary text-bold flex flex-row items-center gap-2 font-bold font-clash text-xl-custom">
      <svg
                className="size-4 text-secondary fill-background dark:fill-dark-background"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
              </svg>
        Experience
      </p>

      {experience.map((exp, index) => (
        <div key={index} className="h-auto w-full flex flex-row">
          {!phoneView ? (
            <div className="flex-[1]">
              <p className="text-text_primary dark:text-dark-text_primary">
                {exp.date}
              </p>
            </div>
          ) : null}

          <div className="flex flex-[2] flex-col gap-5">
            <div className="flex flex-row justify-between items-center h-10">
              <div className="font-bold text-text_primary dark:text-dark-text_primary h-10 flex flex-row items-center gap-2">
                {phoneView ? (
                  <img
                    src={exp.logo}
                    alt="logo"
                    className="h-full aspect-square rounded-[10px]"
                  />
                ) : null}
                {exp.company}
              </div>

              {phoneView ? (
                <div className="font-bold text-text_primary dark:text-dark-text_primary">
                  {exp.date}
                </div>
              ) : (
                <img
                  src={exp.logo}
                  alt="logo"
                  className="h-full aspect-square rounded-[10px]"
                />
              )}
            </div>

            <div className="text-text_secondary dark:text-dark-text_secondary">
              {exp.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
