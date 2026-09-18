import React, { useRef, useState, useLayoutEffect } from "react";

const monoFont = "'JetBrains Mono', monospace";

export default function Hero() {
  const wrapperRef = useRef(null);
  const markerRef = useRef(null); // penanda tak terlihat, persis di posisi huruf "s"
  const [dataAnalystOffset, setDataAnalystOffset] = useState(0);

  // Mengukur jarak pixel asli dari tepi kiri wrapper ke posisi huruf "s"
  // pada "Ganesha" — supaya "Data Analyst" selalu presisi di bawahnya,
  // walau ukuran font keduanya berbeda dan layar di-resize.
  useLayoutEffect(() => {
    function measure() {
      if (wrapperRef.current && markerRef.current) {
        const wrapperLeft = wrapperRef.current.getBoundingClientRect().left;
        const markerLeft = markerRef.current.getBoundingClientRect().left;
        setDataAnalystOffset(markerLeft - wrapperLeft);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    // Font custom butuh waktu untuk termuat — ukur ulang setelah siap.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      style={{
        minHeight: "calc(100vh - 88px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 32px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes lightIn {
          from { opacity: 0; }
          to { opacity: 0.9; }
        }
        .glow-light {
          opacity: 0;
          animation: lightIn 1.6s ease forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .glow-light { opacity: 0.9 !important; }
        }
        /* Di layar sempit (HP), semua teks dipaksa rata tengah dan font
           dikecilkan, supaya tidak lagi terpotong seperti di desktop. */
        @media (max-width: 640px) {
          .hero-eyebrow, .hero-role {
            text-align: center !important;
            margin-left: 0 !important;
          }
          .hero-name {
            font-size: clamp(54px, 18vw, 92px) !important;
            padding-left: 0 !important;
            text-align: center !important;
          }
        }
      `}</style>

      <div ref={wrapperRef} style={{ position: "relative", width: "100%", maxWidth: 900 }}>
        {/* Lampu sorot blur di belakang teks */}
        <div
          className="glow-light"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "85%",
            height: "160%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 72%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 0,
            animationDelay: "0.4s",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* "Hi, I am" */}
          <p
            className="clarify hero-eyebrow"
            style={{
              fontFamily: monoFont,
              fontWeight: 400,
              fontSize: "clamp(14px, 1.6vw, 20px)",
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "0.02em",
              animationDelay: "0.1s",
            }}
          >
            Hi,I am
          </p>

          {/* Baris pertama nama */}
          <h1
            className="clarify hero-name"
            style={{
              fontFamily: monoFont,
              fontWeight: 700,
              fontSize: "clamp(60px, 24vw, 112px)",
              color: "#FFFFFF",
              margin: "4px 0 0",
              lineHeight: 1.05,
              animationDelay: "0.45s",
            }}
          >
            Muharrom
          </h1>

          {/* Baris kedua nama — Teks utuh agar aman untuk Translasi & SEO */}
          <h1
            className="clarify hero-name"
            style={{
              fontFamily: monoFont,
              fontWeight: 700,
              fontSize: "clamp(60px, 24vw, 112px)",
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.05,
              paddingLeft: "2ch",
              animationDelay: "0.8s",
            }}
          >
            Ganesha
          </h1>

          {/* Elemen Pengukur Tersembunyi (Hidden Ruler)
              Elemen ini tidak terlihat di layar dan diabaikan oleh screen reader,
              tugasnya hanya mensimulasikan teks "Gane" dengan font yang 100% sama
              agar markerRef bisa mengukur titik jatuhnya huruf "s" dengan akurat. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              visibility: "hidden",
              pointerEvents: "none",
              fontFamily: monoFont,
              fontWeight: 700,
              fontSize: "clamp(60px, 24vw, 112px)",
              margin: 0,
              lineHeight: 1.05,
              paddingLeft: "2ch",
            }}
          >
            Ganes<span ref={markerRef} style={{ display: "inline-block", width: 0 }} />
          </div>

          {/* Peran — posisinya dihitung persis dari pengukuran di atas */}
          <p
            className="clarify hero-role"
            style={{
              fontFamily: monoFont,
              fontWeight: 400,
              fontSize: "clamp(14px, 1.6vw, 20px)",
              color: "#FFFFFF",
              margin: "6px 0 0",
              marginLeft: `${dataAnalystOffset}px`,
              letterSpacing: "0.02em",
              animationDelay: "1.15s",
            }}
          >
            Data Enthusiast
          </p>
        </div>
      </div>
    </section>
  );
}
