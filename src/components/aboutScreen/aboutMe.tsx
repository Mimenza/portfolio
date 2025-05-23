import React from "react";

const AboutMe: React.FC = () => {
  return (
    <div className="w-full flex flex-col h-auto gap-5">
      
      <p className="text-text_primary dark:text-dark-text_primary text-bold flex flex-row items-center gap-2 font-bold font-clash text-xl-custom">
        {" "}
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
              </svg>{" "}
        About
      </p>
      <div>
        <p className="text-lg-custom leading-relaxed mb-6 text-text_secondary dark:text-dark-text_secondary">
          I'm{" "}
          <span className="font-bold font-clash text-text_primary dark:text-dark-text_primary">Endika Mimenza</span>,
          25-year-old web and mobile developer, with experience in application
          development. Currently learning React and React Native, while
          expanding my knowledge in backend development and languages like C and
          C++ at{" "}
          <a
            href="https://42urduliz.com"
            className="text-text_primary dark:text-dark-text_primary no-underline font-clash"
          >
            42 Urduliz
          </a>
          . Passionate about technology and continuous learning.
        </p>
        <p className="text-lg-custom leading-relaxed mb-6 text-text_secondary dark:text-dark-text_secondary">
          I'm passionate about the world of vintage technology and mechanical
          keyboards. In my free time, I'm working on a mobile app called{" "}
          <a
            href="https://emimenza/projects/TravelLens.vercel.app"
            className="text-text_primary dark:text-dark-text_primary no-underline font-clash"
          >
            TravelLens
          </a>
          , built with React Native. I've also created other mobile apps like{" "}
          <a
            href="https://emimenza/projects/SagarraJo.vercel.app"
            className="text-text_primary dark:text-dark-text_primary no-underline font-clash"
          >
            Sagarra Jo
          </a>{" "}
          and{" "}
          <a href="https://emimenza/projects/Zap.vercel.app" className="text-text_primary dark:text-dark-text_primary no-underline font-clash">
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
