import React from "react";
import { HardDrive } from "lucide-react";
import { Section, SectionHeading } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { Github, Article } from "../components/Icons";
import { colors, fontDisplay, fontMono } from "../lib/theme";
import { projects } from "../lib/data";

// Kumpulan link opsional per proyek. Ikon+tooltip hanya muncul kalau
// field-nya diisi (bukan string kosong) di lib/data.js.
const linkTypes = [
  { key: "githubUrl", icon: Github, label: "GitHub" },
  { key: "mediumUrl", icon: Article, label: "Artikel" },
  { key: "driveUrl", icon: HardDrive, label: "Google Drive" },
];

export default function Proyek() {
  return (
    <Section style={{ paddingTop: 64 }}>
      <Reveal>
        <SectionHeading
          title="Project"
          subtitle="Beberapa proyek yang pernah saya buat."
        />
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="project-grid">
        {projects.map((p, i) => {
          const availableLinks = linkTypes.filter((lt) => p[lt.key]);
          return (
            <Reveal key={i} delay={i * 100}>
              <div
                className="card-hover"
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: 10,
                  overflow: "hidden",
                  background: colors.surface,
                }}
              >
                {/* Thumbnail — taruh screenshot di /public/thumbnails/, atau
                    biarkan; placeholder otomatis muncul kalau belum ada file. */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 10",
                    background: colors.surfaceAlt,
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    style={{
                      display: "none",
                      position: "absolute",
                      inset: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      color: colors.textMuted,
                      fontFamily: fontMono,
                      fontSize: 12.5,
                      textAlign: "center",
                      padding: 16,
                    }}
                  >
                    Taruh screenshot di {p.thumbnail}
                  </div>
                </div>

                <div style={{ padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <h3 style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 500, margin: 0, color: colors.textPrimary, maxWidth: 220 }}>
                      {p.title}
                    </h3>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: fontMono, fontSize: 22, color: colors.amber, margin: 0 }}>{p.metric}</p>
                      <p style={{ fontSize: 11, color: colors.textMuted, margin: 0 }}>{p.metricLabel}</p>
                    </div>
                  </div>
                  <p style={{ color: colors.textSecondary, fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{ fontSize: 12, fontFamily: fontMono, color: colors.teal, background: colors.tealSoft, padding: "4px 10px", borderRadius: 3 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link ke luar (GitHub / Artikel / Google Drive) — tooltip
                      nama link muncul di atas ikon saat di-hover, dan ikon
                      cuma muncul kalau field terkait diisi di data.js */}
                  {availableLinks.length > 0 && (
                    <div style={{ display: "flex", gap: 10, marginTop: 20, paddingTop: 20, borderTop: `1px dashed ${colors.border}` }}>
                      {availableLinks.map((lt) => (
                        <div key={lt.key} className="icon-link-wrap">
                          <span className="icon-tooltip">{lt.label}</span>
                          <a
                            href={p[lt.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${lt.label} — ${p.title}`}
                            className="card-hover icon-link"
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 9,
                              border: `1px solid ${colors.border}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: colors.textSecondary,
                            }}
                          >
                            <lt.icon size={16} />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 780px) {
          .project-grid { grid-template-columns: 1fr !important; }
        }
        .icon-link-wrap {
          position: relative;
          display: inline-flex;
        }
        .icon-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: ${colors.surfaceAlt};
          color: ${colors.textPrimary};
          font-family: ${fontMono};
          font-size: 11px;
          padding: 4px 9px;
          border-radius: 6px;
          border: 1px solid ${colors.border};
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
        }
        .icon-link-wrap:hover .icon-tooltip {
          opacity: 1;
        }
      `}</style>
    </Section>
  );
}
