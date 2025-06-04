import React from "react";
import { useTranslation, Trans } from "react-i18next";

const AboutMe: React.FC = () => {
  const { t } = useTranslation();

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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
        </svg>
        {t("about.aboutMe.title")}
      </p>

      <div>
        <p className="text-lg-custom leading-relaxed mb-6 text-text_secondary dark:text-dark-text_secondary">
          <Trans
            i18nKey="about.aboutMe.intro"
            components={{
              1: (
                <span className="font-bold font-clash text-text_primary dark:text-dark-text_primary" />
              ),
              3: (
                <a
                  href="https://42urduliz.com"
                  className="text-text_primary dark:text-dark-text_primary no-underline font-clash"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
            }}
          />
        </p>

        <p className="text-lg-custom leading-relaxed mb-6 text-text_secondary dark:text-dark-text_secondary">
          <Trans
            i18nKey="about.aboutMe.hobbies"
            components={{
              1: (
                <a
                  href="https://emimenza.vercel.app/projects/TravelLens"
                  className="text-text_primary dark:text-dark-text_primary no-underline font-clash"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              3: (
                <a
                  href="https://emimenza.vercel.app/projects/SagarraJo"
                  className="text-text_primary dark:text-dark-text_primary no-underline font-clash"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              5: (
                <a
                  href="https://emimenza.vercel.app/projects/Zap"
                  className="text-text_primary dark:text-dark-text_primary no-underline font-clash"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
