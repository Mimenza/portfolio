import React, { useState } from "react";

type MediaItem = {
  type: "image" | "video";
  src: string;
};

interface GalleryProps {
  items: MediaItem[];
  initialIndex?: number;
  onClose?: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ items, initialIndex = 0, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);

  if (!items || items.length === 0) return null;

  const goPrev = () => setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const goNext = () => setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.3s",
      }}
    >
      {/* Cerrar */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 32,
          right: 40,
          fontSize: 32,
          color: "#fff",
          background: "none",
          border: "none",
          cursor: "pointer",
          zIndex: 1010,
        }}
        aria-label="Cerrar galería"
      >
        ×
      </button>

      {/* Flecha izquierda */}
      <button
        onClick={goPrev}
        style={{
          position: "absolute",
          left: 30,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 40,
          color: "#fff",
          background: "none",
          border: "none",
          cursor: "pointer",
          zIndex: 1010,
        }}
        aria-label="Anterior"
      >
        ‹
      </button>

      {/* Visualizador */}
      <div
        style={{
          maxWidth: "90vw",
          maxHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          overflow: "hidden",
          background: "#111",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          position: "relative",
        }}
      >
        {items[current].type === "image" ? (
          <img
            src={items[current].src}
            alt={`media-${current}`}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              background: "#222",
              transition: "opacity 0.3s",
            }}
          />
        ) : (
          <video
            src={items[current].src}
            controls
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              background: "#222",
            }}
          />
        )}
      </div>

      {/* Flecha derecha */}
      <button
        onClick={goNext}
        style={{
          position: "absolute",
          right: 30,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 40,
          color: "#fff",
          background: "none",
          border: "none",
          cursor: "pointer",
          zIndex: 1010,
        }}
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* Indicador */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#fff",
          background: "rgba(0,0,0,0.5)",
          borderRadius: 8,
          padding: "4px 16px",
          fontSize: 16,
          letterSpacing: 1,
        }}
      >
        {current + 1} / {items.length}
      </div>
    </div>
  );
};

export default Gallery;
