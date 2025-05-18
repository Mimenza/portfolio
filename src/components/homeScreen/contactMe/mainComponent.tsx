import Footer from "../../shared/footer/footer";
import GradientText from "../../../blocks/TextAnimations/GradientText/GradientText";

import { useVariablesContext } from "../../../context/variablesContext";
import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const MainComponentContact = () => {
  const {phoneView} = useVariablesContext();
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col mt-20">
        <div className="flex flex-col w-full h-auto">
          <div className="flex flex-row items-center gap-2 mb-2">
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
          <h1 className="text-text_primary dark:text-dark-text_primary text-6xl-custom font-bold">
            Contact
          </h1>
          <p className="mt-4 text-lg-custom text-text_secondary dark:text-dark-text_secondary">
            Have a question or want to get in touch? Feel free to reach out.{" "}
            <br />
          </p>
        </div>
      </div>
      <div className="flex-[1] flex flex-col md:flex-row mb-20">
        <div className="flex-[1] flex flex-col gap-4 items-center">
          <div className="flex flex-row gap-5 mt-10 ">
            <div className="group flex flex-row text-text_secondary dark:text-dark-text_secondary hover:text-text_primary hover:dark:text-dark-text_primary items-center gap-2 cursor-pointer" onClick={() => window.open("mailto:mimenzae@gmail.com")}>
              <SiGmail className="h-10 w-10" />
             {!phoneView ? ("Gmail") : null}
            </div>
            <div className="group flex flex-row text-text_secondary dark:text-dark-text_secondary hover:text-text_primary hover:dark:text-dark-text_primary items-center gap-2 cursor-pointer" onClick={() => window.open("https://github.com/mimenza")}>
              <FaGithub className="h-10 w-10" />
              {!phoneView ? ("Github") : null}
            </div>
            <div className="group flex flex-row text-text_secondary dark:text-dark-text_secondary hover:text-text_primary hover:dark:text-dark-text_primary items-center gap-2 cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/endika-m-99aa26252/")}>
              <FaLinkedin className="h-10 w-10" />
              {!phoneView ? ("LinkedIn") : null}
            </div>
          </div>
          <div className="group flex flex-col items-center">
            <span className="text-text_secondary dark:text-dark-text_secondary group-hover:text-text_primary group-hover:dark:text-dark-text_primary transition-colors cursor-pointer" >
              mimenzae@gmail.com
            </span>
          </div>
        </div>
        <div className="flex-[1] flex p-2">
          <div className="flex-[1] p-4">
            <form className="flex flex-col gap-4 h-full">
              <input
                type="text"
                placeholder="Subject"
                className="p-2 rounded-md bg-background_light dark:bg-dark-muted_light text-text_primary dark:text-dark-text_primary placeholder:text-left focus:outline focus:outline-secondary"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 rounded-md bg-background_light dark:bg-dark-muted_light text-text_primary dark:text-dark-text_primary placeholder:text-left focus:outline focus:outline-secondary"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="p-2 rounded-md bg-background_light dark:bg-dark-muted_light text-text_primary dark:text-dark-text_primary flex-grow placeholder:text-left resize-none overflow-auto focus:outline focus:outline-secondary"
              ></textarea>
              <button
                type="submit"
                className="p-2 bg-primary bg-background_light dark:bg-dark-muted_light text-text_primary dark:text-dark-text_primary rounded-md dark:hover:bg-dark-primary-dark"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainComponentContact;
