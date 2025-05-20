import React, { useEffect } from "react";
import Menu from "../components/shared/menu/menu";
import Footer from "../components/shared/footer/footer";
import AboutMe from "../components/aboutScreen/aboutMe";
import Projects from "../components/aboutScreen/projects";
import Experience from "../components/aboutScreen/experience";
import Certification from "../components/aboutScreen/certifications";
import Education from "../components/aboutScreen/education";

import Particles from "../blocks/Backgrounds/Particles/Particles";

import { useLogedUser } from "../context/logedUserContext";
import { useNavigate } from "react-router-dom";

const AboutScreen: React.FC = () => {
  const { logedUser } = useLogedUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!logedUser) {
      navigate("/login");
    }
    // Disable global scrolling X
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    document.title = "🔧 Emimenza | About";
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [logedUser, navigate]);

  return (
    <div className="w-full h-auto">
      <Menu selectedSection={1} />
      <div className="w-full flex flex-col min-h-screen pt-20 pb-10">
        <div className="flex-grow min-h-screen h-auto flex justify-center my-10 mb-40">
          <div className="h-full w-full sm:mx-[30px] 2xl:mx-[200px] 3xl:mx-[300px] flex flex-col gap-20">
            <div className="flex flex-row gap-5">
              <img
                className="flex-[1] rounded-full w-24 aspect-square object-cover"
                src={process.env.REACT_APP_SUPABASE_PROFILE_PHOTO_URL}
                alt="profilePic"
              />
              <div className="flex-[3] flex flex-col h-auto justify-center">
                <p className="text-text_primary dark:text-dark-text_primary font-clash">
                  Endika Mimenza
                </p>
                <p className="text-text_secondary dark:text-dark-text_secondary">
                  Developer
                </p>
                <p className="text-text_secondary dark:text-dark-text_secondary">
                  <a
                    href="https://emimenza.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text_primary hover:dark:text-dark-text_primary cursor-pointer"
                  >
                    emimenza.vercel.app
                  </a>
                </p>
              </div>
            </div>
            <AboutMe />
            <Projects />
            <Experience />
            <Education />
            <Certification />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutScreen;
