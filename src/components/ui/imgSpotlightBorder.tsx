import React, { use, useRef, useState, useEffect } from "react";

export const ImgSpotlightBorder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="hidden md:flex items-center justify-center order-first md:order-none z-10"
    >
      <div className="relative h-96 w-72">

        {/* Imagen */}
        <div className="relative h-full w-full z-20 rounded-[22px] overflow-hidden border-2 border-muted border-opacity-25">
          <img
            src={process.env.REACT_APP_SUPABASE_PROFILE_PHOTO_URL}
            alt="About Me"
            className="h-full w-full object-cover rounded-[22px]"
          />
        </div>
      </div>
    </div>
  );
};
