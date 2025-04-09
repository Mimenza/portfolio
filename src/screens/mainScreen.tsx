import React from "react";

import MainComponentAboutMe from "../components/aboutMe/mainComponent";
import MainComponentProyects from "../components/proyects/mainComponent";

const MainScreen = () => (
  <div className="flex flex-col min-h-screen w-screen bg-black overflow-hidden overflow-x-hidden px-20 md:px-5">
    <MainComponentAboutMe />
    <MainComponentProyects />
  </div>
);
export default MainScreen;

