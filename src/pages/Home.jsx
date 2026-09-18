import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import SkillsMinimal from "../components/SkillsMinimal";
import ProjectsPreview from "../components/ProjectsPreview";
import ContactSection from "../components/ContactSection";
import { colors } from "../lib/theme";
import { lenisRef } from "../lib/lenisInstance";

export default function Home() {
  const location = useLocation();

  // Scroll otomatis ke section yang dituju kalau Home dibuka lewat navigasi
  // dari halaman lain (Navbar mengirim { state: { scrollTo: "kontak" } }),
  // bukan lewat hash URL — supaya URL tidak pernah "nyangkut" jadi "/#kontak"
  // dan refresh halaman selalu kembali ke landing page dari atas.
  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -20 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 80);
      }
    }
  }, [location.state]);

  return (
    <>
      {/* HERO */}
      <div id="top">
        <Hero />
      </div>

      {/* ABOUT ME */}
      <AboutMe />

      {/* SKILLS */}
      <SkillsMinimal />

      {/* PROJECTS PREVIEW */}
      <ProjectsPreview />

      {/* CONTACT */}
      <Section id="kontak" style={{ borderTop: `1px solid ${colors.border}`, padding: "56px 24px" }}>
        <Reveal>
          <ContactSection />
        </Reveal>
      </Section>
    </>
  );
}
