import React, { useState, useRef } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*01";

// Efek "glitch scramble": saat cursor masuk, tiap huruf cepat berganti-ganti
// karakter acak, lalu satu per satu (dari kiri ke kanan) "terkunci" kembali
// ke huruf aslinya. Saat cursor keluar, teks langsung kembali normal.
export default function GlitchText({
  text = "Muharrom",
  color = "#FFFFFF",
  fontFamily = "'Chakra Petch', sans-serif",
  fontWeight = 700,
  fontSize = 78,
}) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef(null);
  const iterationRef = useRef(0);

  const scramble = () => {
    clearInterval(intervalRef.current);
    iterationRef.current = 0;

    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterationRef.current) return text[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      if (iterationRef.current >= text.length) {
        clearInterval(intervalRef.current);
        setDisplay(text);
      }

      iterationRef.current += 1 / 2.5;
    }, 35);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setDisplay(text);
  };

  return (
    <h1
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{
        fontFamily,
        fontWeight,
        fontSize: `clamp(40px, 9vw, ${fontSize}px)`,
        color,
        margin: 0,
        lineHeight: 1,
        letterSpacing: "0.02em",
        textAlign: "center",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {display}
    </h1>
  );
}
