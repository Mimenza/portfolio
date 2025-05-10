import React from "react";
import Menu from "../components/menu/menu";
const AboutScreen: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Menu selectedSection={1} />
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">About me</h1>
      </div>
    </div>
  );
};

export default AboutScreen;
