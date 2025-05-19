import Footer from "../../shared/footer/footer";
import GradientText from "../../../blocks/TextAnimations/GradientText/GradientText";

import { useVariablesContext } from "../../../context/variablesContext";
import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const MainComponentContact = () => {
  const { phoneView } = useVariablesContext();
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col mt-20">
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
              </svg>
            <span className="text-lg-custom text-secondary dark:text-dark-secondary">
              Let's get in touch!
            </span>
          </div>
          <h1 className="text-text_primary dark:text-dark-text_primary text-6xl-custom font-bold font-clash">
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
            <div
              className="group flex flex-row text-text_secondary dark:text-dark-text_secondary hover:text-text_primary hover:dark:text-dark-text_primary items-center gap-2 cursor-pointer"
              onClick={() => window.open("mailto:mimenzae@gmail.com")}
            >
              <SiGmail className="h-10 w-10" />
              {!phoneView ? "Gmail" : null}
            </div>
            <div
              className="group flex flex-row text-text_secondary dark:text-dark-text_secondary hover:text-text_primary hover:dark:text-dark-text_primary items-center gap-2 cursor-pointer"
              onClick={() => window.open("https://github.com/mimenza")}
            >
              <FaGithub className="h-10 w-10" />
              {!phoneView ? "Github" : null}
            </div>
            <div
              className="group flex flex-row text-text_secondary dark:text-dark-text_secondary hover:text-text_primary hover:dark:text-dark-text_primary items-center gap-2 cursor-pointer"
              onClick={() =>
                window.open("https://www.linkedin.com/in/endika-m-99aa26252/")
              }
            >
              <FaLinkedin className="h-10 w-10" />
              {!phoneView ? "LinkedIn" : null}
            </div>
          </div>
          <div className="group flex flex-col items-center">
            <span className="text-text_secondary dark:text-dark-text_secondary group-hover:text-text_primary group-hover:dark:text-dark-text_primary transition-colors cursor-pointer">
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
