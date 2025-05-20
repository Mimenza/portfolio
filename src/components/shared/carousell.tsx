import React from "react";

interface CarousellProps {
  words: string[];
  className?: string;
}

const Carousell: React.FC<CarousellProps> = ({ words, className }) => {
  // Repite el array varias veces para asegurar que nunca se quede sin palabras
  const repeatCount = 10; // Ajusta según el ancho de tu pantalla/carrusel
  const displayWords = Array(repeatCount).fill(words).flat();

  return (
    <div
      className={`overflow-hidden w-full py-6 my-20 border border-x border-text_secondary ${className || ""}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        className="flex flex-row items-center animate-carousel whitespace-nowrap gap-4"
        style={{ animation: "carousel-scroll 30s linear infinite" }}
      >
        {displayWords.map((word, idx) => (
          <React.Fragment key={word + idx}>
            <span className="text-3xl font-clash text-gray-400 font-medium tracking-wide">
              {word}
            </span>
            {idx < displayWords.length - 1 && (
              <svg
                className="size-4 text-secondary fill-background dark:fill-dark-background"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path>
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
      <style>
        {`
        @keyframes carousel-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${100 / repeatCount}%); }
        }
        .animate-carousel {
          min-width: ${repeatCount * 300}%;
        }
        `}
      </style>
    </div>
  );
};

export default Carousell;
