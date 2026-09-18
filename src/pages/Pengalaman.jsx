import React from "react";
import { Section, SectionHeading } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { colors, fontMono } from "../lib/theme";
import { experience } from "../lib/data";

export default function Pengalaman() {
  return (
    <Section style={{ paddingTop: 64 }}>
      <Reveal>
        <SectionHeading title="Experience" />
      </Reveal>
      <div style={{ position: "relative", paddingLeft: 28 }}>
        <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: colors.border }} />
        {experience.map((exp, i) => (
          <Reveal key={i} delay={i * 100}>
            <div style={{ position: "relative", marginBottom: i === experience.length - 1 ? 0 : 36 }}>
              <div
                style={{ position: "absolute", left: -28, top: 4, width: 11, height: 11, borderRadius: "50%", background: colors.bg, border: `2px solid ${colors.amber}` }}
              />
              <p style={{ fontFamily: fontMono, fontSize: 12.5, color: colors.textMuted, margin: "0 0 6px" }}>{exp.period}</p>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: colors.textPrimary }}>
                {exp.role} <span style={{ color: colors.textSecondary, fontWeight: 400 }}>· {exp.company}</span>
              </h3>
              <p style={{ color: colors.textSecondary, fontSize: 14.5, lineHeight: 1.7, marginTop: 8, maxWidth: 560 }}>{exp.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
