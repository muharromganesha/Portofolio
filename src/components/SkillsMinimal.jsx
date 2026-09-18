import React from "react";
import { Terminal, BarChart3, Table } from "lucide-react";
import { Section } from "./Layout";
import { Reveal } from "./Reveal";
import { colors, fontDisplay } from "../lib/theme";

const monoFont = "'JetBrains Mono', monospace";

// Ganti isi array di bawah ini sesuai keahlian kamu.
const skillCategories = [
  {
    label: "Programming Language",
    icon: Terminal,
    items: ["SQL", "Python 3 Libraries : NumPy, Pandas, Matplotlib"],
  },
  {
    label: "Visualization Tools",
    icon: BarChart3,
    items: ["Power BI", "Looker"],
  },
  {
    label: "Spreadsheet",
    icon: Table,
    items: ["Excel", "Google Sheets"],
  },
];

function SkillRow({ index, category, isLast }) {
  const Icon = category.icon;
  return (
    <Reveal delay={index * 100}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "56px 1fr",
          gap: 24,
          alignItems: "baseline",
          padding: "28px 0",
          borderBottom: isLast ? "none" : `1px dashed ${colors.border}`,
        }}
        className="skill-row"
      >
        <span
          style={{
            fontFamily: monoFont,
            fontSize: 14,
            color: colors.textMuted,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={16} color={colors.amber} />
            </div>
            <h3
              style={{
                fontFamily: fontDisplay,
                fontSize: "clamp(18px, 2vw, 22px)",
                fontWeight: 600,
                color: colors.textPrimary,
                margin: 0,
              }}
            >
              {category.label}
            </h3>
          </div>
          <p
            style={{
              fontFamily: monoFont,
              fontSize: 14.5,
              color: colors.textSecondary,
              margin: 0,
              lineHeight: 1.8,
            }}
          >
            {category.items.join("  ·  ")}
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 560px) {
          .skill-row { grid-template-columns: 32px 1fr !important; }
        }
      `}</style>
    </Reveal>
  );
}

export default function SkillsMinimal() {
  return (
    <Section id="keahlian" style={{ borderTop: `1px solid ${colors.border}` }}>
      <Reveal>
        <h2
          style={{
            fontFamily: fontDisplay,
            fontSize: "clamp(28px, 3.5vw, 38px)",
            fontWeight: 600,
            color: colors.textPrimary,
            margin: 0,
          }}
        >
          Skills
        </h2>
      </Reveal>

      <div style={{ marginTop: 32 }}>
        {skillCategories.map((category, i) => (
          <SkillRow
            key={category.label}
            index={i}
            category={category}
            isLast={i === skillCategories.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
