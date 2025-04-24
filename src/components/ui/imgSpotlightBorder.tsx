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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div ref={containerRef} className="relative h-96 w-72">
        {/* Borde tipo spotlight */}
        <div
          className="absolute -inset-1 rounded-[26px] z-10 pointer-events-none transition-opacity duration-300"
          style={{
            opacity,
            background: "linear-gradient(135deg, #ff6ec4, #7873f5)", // 🎨 Gradiente personalizado
            maskImage: `radial-gradient(100px 100px at ${position.x}px ${position.y}px, white 30%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(100px 100px at ${position.x}px ${position.y}px, white 30%, transparent 80%)`,
            maskComposite: "exclude",
            WebkitMaskComposite: "destination-out",
          }}
        />

        {/* Imagen */}
        <div className="relative h-full w-full z-20 rounded-[22px] overflow-hidden">
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
