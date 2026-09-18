import React from "react";
import { Section } from "./Layout";
import { Reveal } from "./Reveal";
import { colors } from "../lib/theme";

const monoFont = "'JetBrains Mono', monospace";

// Ganti href di bawah ini dengan link resume/CV asli kamu (bisa link Google
// Drive, atau file .pdf yang kamu taruh di folder /public lalu diarahkan
// ke "/nama-file.pdf").
const RESUME_URL = "#";

export default function AboutMe() {
  return (
    <Section id="tentang">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: 48,
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* FOTO — ganti src di bawah ini dengan foto kamu sendiri.
            Taruh file foto di folder /public lalu arahkan src ke
            "/nama-file-foto.png" (contoh: /profile.png) */}
        <Reveal>
          <img
            src="/profile.png"
            alt="Foto profil"
            style={{
              width: "100%",
              maxWidth: 340,
              display: "block",
              objectFit: "cover",
            }}
            onError={(e) => {
              // Kalau foto belum ditaruh, tampilkan kotak placeholder
              // supaya layout tidak rusak/kosong.
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
          <div
            style={{
              display: "none",
              width: "100%",
              maxWidth: 340,
              aspectRatio: "340 / 480",
              border: `1px dashed ${colors.border}`,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              color: colors.textMuted,
              fontFamily: monoFont,
              fontSize: 13,
              textAlign: "center",
              padding: 16,
            }}
          >
            Taruh foto di /public/profile.png
          </div>
        </Reveal>

        {/* TEKS */}
        <div>
          <Reveal delay={120}>
            <h2
              style={{
                fontFamily: monoFont,
                fontWeight: 700,
                fontSize: "clamp(32px, 4.5vw, 52px)",
                color: colors.textPrimary,
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              About Me
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p
              style={{
                fontFamily: monoFont,
                fontSize: "clamp(15px, 1.6vw, 18px)",
                color: colors.textSecondary,
                lineHeight: 1.7,
                marginTop: 20,
                maxWidth: 640,
              }}
            >
              I am Tech entusiast with a bachelor degree in Informatics Engineering who has a deep interest in the world of data, 
              i am passionate about problem solving and transforming raw data into insights. I am experienced in processing datasets, 
              performing data cleaning, and building visualisations to identify hidden trends and patterns.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: monoFont,
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#1A1A1A",
                  background: "#FFFFFF",
                  padding: "12px 28px",
                  borderRadius: 999,
                  display: "inline-block",
                }}
              >
                Resume
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}
