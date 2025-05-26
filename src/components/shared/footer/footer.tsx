import React from "react";
import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoVercel } from "react-icons/io5";
import { RiSupabaseLine } from "react-icons/ri";

import { CiPlane } from "react-icons/ci";
import { TbPingPong } from "react-icons/tb";
import { MdOutlineContactPage } from "react-icons/md";

import { useVariablesContext } from "../../../context/variablesContext";
const Footer: React.FC = () => {
  const { phoneView } = useVariablesContext();

  return (
    <div className="w-full min-h-[200px] flex flex-col items-center justify-center pb-0">
      <div className="w-full border-t border-t-text_secondary dark:border-t-dark-text_secondary border-opacity-25 mx-[40px] my-5" />
      <div className="w-full flex items-center justify-between flex-col md:flex-row gap-5 px-[20px]">
        <div className="flex gap-5 justify-between w-full md:w-auto">
          <SiGmail className="h-10 w-10 text-text_secondary dark:text-dark-text_secondary hover:text-text_primary hover:dark:text-dark-text_primary cursor-pointer"  onClick={() => window.open("mailto:mimenzae@gmail.com")} />{" "}
          <FaGithub className="h-10 w-10 text-text_secondary dark:text-dark-text_secondary hover:text-text_primary hover:dark:text-dark-text_primary  cursor-pointer" onClick={() => window.open("https://github.com/mimenza")}/>{" "}
          <FaLinkedin className="h-10 w-10 text-text_secondary dark:text-dark-text_secondary hover:text-text_primary hover:dark:text-dark-text_primary  cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/endika-m-99aa26252/")}/>
        </div>
        {phoneView ? (
          <div className="w-full border-t border-t-text_secondary dark:border-t-dark-text_secondary border-opacity-25 mx-[140px] " />
        ) : null}

        <div className="w-full md:w-auto">
          <div className="grid grid-cols-3 gap-y-3 text-text_secondary dark:text-dark-text_secondary items-center w-full justify-between">
            <span className="justify-self-start">Built with</span>
            <FaReact className="h-5 w-5 justify-self-center" />
            <span className="justify-self-end">React</span>

            <span className="justify-self-start">Styled with</span>
            <RiTailwindCssFill className="h-5 w-5 justify-self-center" />
            <span className="justify-self-end">Tailwind</span>

            <span className="justify-self-start">Deployed with</span>
            <IoLogoVercel className="h-5 w-5 justify-self-center" />
            <span className="justify-self-end">Vercel</span>

            <span className="justify-self-start">Handled with</span>
            <RiSupabaseLine className="h-5 w-5 justify-self-center" />
            <span className="justify-self-end">Supabase</span>
          </div>
        </div>
        {!phoneView ? (
          <div className=" w-full md:w-auto">
            <div className="flex flex-col gap-5  text-text_secondary dark:text-dark-text_secondary justify-between w-full md:w-auto">
              <span className="flex flex-row items-center gap-5 justify-between hover:text-text_primary hover:dark:text-dark-text_primary  cursor-pointer">
                TravelLens <CiPlane className="h-5 w-5" />
              </span>
              <span className="flex flex-row items-center gap-5 justify-between hover:text-text_primary hover:dark:text-dark-text_primary  cursor-pointer">
                Transcendence <TbPingPong className="h-5 w-5" />
              </span>
              <span className="flex flex-row items-center gap-5 justify-between hover:text-text_primary hover:dark:text-dark-text_primary  cursor-pointer">
                Portfolio <MdOutlineContactPage className="h-5 w-5" />
              </span>
            </div>
          </div>
        ) : null}
      </div>
      <div className="w-full border-t border-t-text_secondary dark:border-t-dark-text_secondary border-opacity-25 mx-[20px] my-5" />
      <div className="w-full flex items-center justify-center my-5">
        <span className="text-text_secondary dark:text-dark-text_secondary">
          © 2025 - All rights reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
