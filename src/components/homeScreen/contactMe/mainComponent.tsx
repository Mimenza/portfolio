import { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";

import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

import { useVariablesContext } from "../../../context/variablesContext";

import Footer from "../../shared/footer/footer";
import ShinyText from "../../../blocks/TextAnimations/ShinyText/ShinyText";
import RotatingText from "../../../blocks/TextAnimations/RotatingText/RotatingText";


const MainComponentContact = () => {
  const { t } = useTranslation();
  const { phoneView } = useVariablesContext();
  const [form, setForm] = useState({ subject: "", message: "" });
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
        {
          subject: form.subject,
          message: form.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setForm({ subject: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col">
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
            </svg>
            <ShinyText
              text={t("home.contactMe.getInTouch")}
              disabled={false}
              speed={2}
              className="text-lg-custom text-secondary dark:text-dark-secondary"
            />
          </div>
          <h1 className="text-text_primary dark:text-dark-text_primary text-6xl-custom font-bold font-clash">
            {t("home.contactMe.title")}
          </h1>
          <p className="mt-4 text-lg-custom text-text_secondary dark:text-dark-text_secondary">
            {t("home.contactMe.intro")}
          </p>
        </div>
      </div>

      <div className="flex-[1] flex flex-col md:flex-row mb-20">
        <div className="flex-[1] flex flex-col gap-4 items-center">
          <div className="flex flex-row text-xl-custom font-bold text-text_secondary w-full h-auto mt-10 items-center justify-center gap-2">
            {t("home.contactMe.talkAbout")}
            <RotatingText
              texts={t("home.contactMe.topics", { returnObjects: true })}
              mainClassName="px-2 sm:px-2 md:px-3 bg-secondary text-white text-xl-custom font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            />
          </div>

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
              {!phoneView ? "GitHub" : null}
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
            <form className="flex flex-col gap-4 h-full" onSubmit={handleSubmit}>
              <input
                type="text"
                name="subject"
                placeholder={t("home.contactMe.form.subjectPlaceholder")}
                value={form.subject}
                onChange={handleChange}
                className="p-2 rounded-md bg-muted dark:bg-dark-muted text-text_primary dark:text-dark-text_primary placeholder:text-left focus:outline focus:outline-secondary"
              />
              <textarea
                name="message"
                placeholder={t("home.contactMe.form.messagePlaceholder")}
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="p-2 rounded-md bg-muted dark:bg-dark-muted text-text_primary dark:text-dark-text_primary flex-grow placeholder:text-left resize-none overflow-auto focus:outline focus:outline-secondary"
              ></textarea>
              <button
                type="submit"
                className="p-2 bg-muted dark:bg-dark-muted text-text_primary dark:text-dark-text_primary rounded-md dark:hover:bg-dark-primary-dark"
              >
                {t("home.contactMe.form.sendButton")}
              </button>
              {status === "success" && (
                <span className="text-green-600">{t("home.contactMe.form.successMessage")}</span>
              )}
              {status === "error" && (
                <span className="text-red-600">{t("home.contactMe.form.errorMessage")}</span>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainComponentContact;
