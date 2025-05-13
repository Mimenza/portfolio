import React from "react";

const AboutMe: React.FC = () => {
  return (
    <div className="w-full flex flex-col h-auto gap-5">
      <p className="text-text_primary dark:text-dark-text_primary text-bold flex flex-row items-center gap-2 font-bold text-xl">
        {" "}
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
        </svg>{" "}
        About
      </p>
      <div>
        <p className="text-lg leading-relaxed mb-6 text-text_secondary dark:text-dark-text_secondary z-10">
          I'm{" "}
          <span className="font-bold text-text_primary dark:text-dark-text_primary">Endika Mimenza</span>,
          25-year-old web and mobile developer, with experience in application
          development. Currently learning React and React Native, while
          expanding my knowledge in backend development and languages like C and
          C++ at{" "}
          <a
            href="https://42urduliz.com"
            className="text-text_primary dark:text-dark-text_primary no-underline"
          >
            42 Urduliz
          </a>
          . Passionate about technology and continuous learning.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-text_secondary dark:text-dark-text_secondary z-10">
          I'm passionate about the world of vintage technology and mechanical
          keyboards. In my free time, I'm working on a mobile app called{" "}
          <a
            href="https://emimenza/projects/TravelLens.vercel.app"
            className="text-text_primary dark:text-dark-text_primary no-underline"
          >
            TravelLens
          </a>
          , built with React Native. I've also created other mobile apps like{" "}
          <a
            href="https://emimenza/projects/SagarraJo.vercel.app"
            className="text-text_primary dark:text-dark-text_primary no-underline"
          >
            Sagarra Jo
          </a>{" "}
          and{" "}
          <a href="https://emimenza/projects/Zap.vercel.app" className="text-text_primary dark:text-dark-text_primary no-underline">
            Zap
          </a>
          . These are personal projects that let me explore and enjoy the
          intersection of creativity, code, and tech.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
