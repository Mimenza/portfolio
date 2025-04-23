import React, { ReactNode } from "react";

interface LightButtonProps {
  children: ReactNode; // Cambiado de 'text' a 'children'
  onClick?: () => void;
}

const LightButton: React.FC<LightButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="relative px-6 py-2 rounded-full font-medium text-white overflow-hidden"
      onClick={onClick}
      style={{ backgroundColor: "black" }}
    >
      {/* RGB animated border */}
      <span
        className="absolute inset-0 rounded-full z-0"
        style={{
          backgroundImage: "linear-gradient(270deg, #ec4899, #8b5cf6, #3b82f6)",
          backgroundSize: "600% 600%",
          filter: "blur(15px)", // Aumenta el difuminado para mayor suavidad
          animation: "rgb-border-animation 4s linear infinite",
          boxSizing: "border-box",
          padding: "6px", // Ajusta el grosor del borde
          transition: "box-shadow 0.3s ease-in-out", // Solo transitar sombra
        }}
      />

      {/* Overlay black background */}
      <span
        className="absolute inset-[2px] rounded-full z-10"
        style={{ backgroundColor: "black" }}
      />

      {/* Content */}
      <span className="relative z-20">{children}</span>

      {/* Inline keyframes via style tag */}
      <style>
        {`
          @keyframes rgb-border-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Mejorar el efecto de luz cuando el mouse pasa por encima */
          button:hover .absolute {
            box-shadow: 0 0 40px 10px rgba(59, 130, 246, 0.7), 0 0 80px 10px rgba(138, 21, 21, 0.4); /* Resplandor sin deformar */
          }

          /* Transición solo para el botón, no para el borde */
          button {
            transition: transform 0.3s ease-in-out;
          }

          button:hover {
            transform: scale(1.05); /* Solo aplicamos escala al botón */
          }
        `}
      </style>
    </button>
  );
};

export default LightButton;