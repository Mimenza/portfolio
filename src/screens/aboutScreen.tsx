import React from "react";
import Menu from "../components/menu/menu";
import Footer from "../components/footer/footer";

const AboutScreen: React.FC = () => {
  // Disable global scrolling X
  document.body.style.overflowX = "hidden";

  return (
    <div className="w-full h-full">
      <Menu selectedSection={1} />

      <div className="w-full flex flex-col min-h-screen py-10">
        <div className="flex-grow h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">About me</h1>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutScreen;
