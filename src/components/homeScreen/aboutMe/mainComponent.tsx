import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { useVariablesContext } from "../../../context/variablesContext";
import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import Particles from "../../../blocks/Backgrounds/Particles/Particles";

const MainComponentAboutMe = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setLoadingBarLoading } = useVariablesContext();

  const handleRedirect = () => {
    setLoadingBarLoading(true);
    setTimeout(() => {
      setLoadingBarLoading(false);
      navigate(`/about`);
    }, 500);
  };

  return (
    <section className="w-full min-h-[70vh] flex flex-col justify-center items-start md:pt-16 md:pb-8 px-2 md:px-0">
      {/* Background Particles */}
      <div
        className="absolute top-0 left-0 bottom-0 w-full h-full"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={1000}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      {/* Greeting */}
      <div className="mb-6 flex items-center gap-3 ">
        <span className="inline-block">
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
        </span>
        <ShinyText
          text={t("home.aboutMe.greeting")}
          disabled={false}
          speed={2}
          className="text-lg-custom text-text_secondary dark:text-dark-text_secondary"
        />
      </div>

      {/* Headline */}
      <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-clash font-bold leading-tight text-text_primary dark:text-dark-text_primary max-w-5xl mb-4">
        <Trans
          i18nKey="home.aboutMe.headline"
          components={{
            1: <span className="text-secondary" />,
            3: <span className="text-secondary" />,
            5: <span className="text-secondary" />,
          }}
        />
      </h1>

      {/* Description */}
      <div className="flex flex-col md:flex-row md:justify-between w-full mb-8">
        <div className="flex flex-row gap-5">
          <div className="flex flex-1 items-center justify-center">
            <div className="border-b dark:border-dark-text_secondary border-text_secondary w-full" />
          </div>
          <p className=" flex-[1] text-lg-custom text-text_secondary dark:text-dark-text_secondary">
            {t("home.aboutMe.description")}
          </p>
        </div>
      </div>

      {/* Social & CTA */}
      <div className="flex flex-col md:flex-row justify-between w-full z-10">
        <div className="flex flex-row gap-6 mt-4 text-sm-custom text-text_secondary dark:text-dark-text_secondary">
          <a
            href="https://www.linkedin.com/in/endika-m-99aa26252/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition"
          >
            LINKEDIN ↗
          </a>
          <a
            href="https://github.com/Mimenza"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition"
          >
            GITHUB ↗
          </a>
          <a
            href="https://letterboxd.com/mimenza/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition"
          >
            LETTERBOXD ↗
          </a>
          <a
            href="mailto:mimenzae@gmail.com"
            className="hover:text-secondary transition"
          >
           GMAIL ↗
          </a>
        </div>
        <div className="mt-6 md:mt-0 flex items-center">
          <button
            className="bg-text_primary dark:bg-dark-text_primary text-background dark:text-dark-background px-7 py-3 rounded-full font-bold hover:bg-opacity-90 flex flex-row items-center space-x-2 text-lg-custom shadow hover:scale-105 transition-all duration-300"
            onClick={() => handleRedirect()}
          >
            {t("home.aboutMe.cta")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainComponentAboutMe;
