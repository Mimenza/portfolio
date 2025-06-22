import React, {
  useRef,
  useEffect
} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useLogedUser } from "../context/logedUserContext";
import { useVariablesContext } from "../context/variablesContext";
import MainComponentAboutMe from "../components/homeScreen/aboutMe/mainComponent";
import MainComponentProyects from "../components/homeScreen/proyects/mainComponent";
import MainComponentTecnologies from "../components/homeScreen/tecnologies/mainComponent";
import MainComponentContact from "../components/homeScreen/contactMe/mainComponent";
import FooterSlider from "../components/shared/footer/mouseSlider";
import ChatWidget from "../components/shared/chat/chatWidget";

import Menu from "../components/shared/menu/menu";
import PhoneMenu from "../components/shared/menu/phoneMenu";
import Carousell from "../components/shared/carousell";
import TechCarousell from "../components/shared/techCarousell";

const HomeScreen = () => {
  const { t } = useTranslation();
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const technologiesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logedUser } = useLogedUser();
  const { phoneView } = useVariablesContext();

  useEffect(() => {
    // if (!logedUser) {
    //   navigate("/login");
    // }
    document.title = `Emimenza | ${t("home.Home")}`;
  }, [t]);

  return (
    <div className="flex flex-col h-auto w-full">
      {/* Gradientes */}
      <div className="fixed top-0 left-0 w-screen h-10 z-10 bg-gradient-to-b from-background dark:from-dark-background to-transparent"></div>
      <div className="fixed bottom-0 left-0 w-screen h-10 z-10 bg-gradient-to-b from-transparent dark:to-dark-background to-background"></div>
      {phoneView ? (<PhoneMenu selectedSection={0} />): (<Menu selectedSection={0} />)}

      {/* Sections */}
      <div
        ref={aboutMeRef}
        className="relative w-full py-20 justify-center items-center flex md:min-h-screen h-auto"
      >
        <MainComponentAboutMe />
        <FooterSlider />
      </div>

      <ChatWidget />

      <Carousell
        words={[
          t("home.carousel.Team collaboration"),
          t("home.carousel.Adaptability"),
          t("home.carousel.Communication skills"),
          t("home.carousel.Time management"),
          t("home.carousel.Attention to detail"),
          t("home.carousel.Curiosity")
        ]}
      />

      <div ref={projectsRef} className="w-full py-10 justify-center items-center flex h-auto">
        <MainComponentProyects />
      </div>

      <div ref={technologiesRef} className="w-full py-10 justify-center items-center flex h-auto">
        <MainComponentTecnologies />
      </div>

      <TechCarousell />

      <div ref={contactRef} className="w-full py-10 justify-center items-center flex h-auto">
        <MainComponentContact />
      </div>
    </div>
  );
};

export default HomeScreen;
