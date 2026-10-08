import React from "react";

// Efek "slice glitch": teks terbelah horizontal jadi dua bagian (atas & bawah).
// Hampir sepanjang siklus teks diam, lalu dua kali "sobek" singkat — bagian atas
// dan bawah melompat ke arah berlawanan dan garis belahnya bergeser, kemudian
// kembali rata. Berjalan terus-menerus (loop 3 detik), tidak butuh hover.
//
// Caranya: teks aslinya dibuat transparan (cuma untuk memberi ruang & tetap
// terbaca screen reader), lalu ::before menampilkan setengah bagian atas dan
// ::after setengah bagian bawah dari atribut data-text, dipotong pakai clip-path.
// Pergerakannya memakai steps(1, end) supaya melompat tajam, bukan mulus.
export default function GlitchText({
  text = "Muharrom",
  color = "#FFFFFF",
  fontFamily = "'Chakra Petch', sans-serif",
  fontWeight = 700,
  fontSize = 78,
}) {
  return (
    <>
      <style>{`
        .slice-glitch {
          position: relative;
          margin: 0;
          line-height: 1;
          letter-spacing: 0.02em;
          text-align: center;
          cursor: default;
          user-select: none;
          color: transparent;
        }
        .slice-glitch::before,
        .slice-glitch::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          color: var(--glitch-color);
          text-align: center;
          will-change: transform, clip-path;
        }
        .slice-glitch::before {
          clip-path: inset(0 0 50% 0);
          animation: sliceTop 3s steps(1, end) infinite;
        }
        .slice-glitch::after {
          clip-path: inset(50% 0 0 0);
          animation: sliceBottom 3s steps(1, end) infinite;
        }

        /* Garis belah (cut) dibagi dua pseudo-element: bagian atas memotong
           dari bawah (inset bawah = 100 - cut), bagian bawah memotong dari
           atas (inset atas = cut). Nilai cut yang sama = tidak ada celah. */
        @keyframes sliceTop {
          0%, 60%   { transform: translateX(0);      clip-path: inset(0 0 50% 0); }
          61%       { transform: translateX(-0.07em); clip-path: inset(0 0 60% 0); }
          64%       { transform: translateX(0.05em);  clip-path: inset(0 0 38% 0); }
          67%, 82%  { transform: translateX(0);      clip-path: inset(0 0 50% 0); }
          83%       { transform: translateX(0.09em);  clip-path: inset(0 0 45% 0); }
          86%       { transform: translateX(-0.04em); clip-path: inset(0 0 65% 0); }
          89%, 100% { transform: translateX(0);      clip-path: inset(0 0 50% 0); }
        }
        @keyframes sliceBottom {
          0%, 60%   { transform: translateX(0);      clip-path: inset(50% 0 0 0); }
          61%       { transform: translateX(0.07em);  clip-path: inset(40% 0 0 0); }
          64%       { transform: translateX(-0.05em); clip-path: inset(62% 0 0 0); }
          67%, 82%  { transform: translateX(0);      clip-path: inset(50% 0 0 0); }
          83%       { transform: translateX(-0.09em); clip-path: inset(55% 0 0 0); }
          86%       { transform: translateX(0.04em);  clip-path: inset(35% 0 0 0); }
          89%, 100% { transform: translateX(0);      clip-path: inset(50% 0 0 0); }
        }

        /* Hormati pengaturan sistem "kurangi animasi": teks tampil rata & diam. */
        @media (prefers-reduced-motion: reduce) {
          .slice-glitch::before,
          .slice-glitch::after {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <h1
        className="slice-glitch"
        data-text={text}
        style={{
          fontFamily,
          fontWeight,
          fontSize: `clamp(40px, 9vw, ${fontSize}px)`,
          "--glitch-color": color,
        }}
      >
        {text}
      </h1>
    </>
  );
}
