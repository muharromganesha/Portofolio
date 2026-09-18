import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HardDrive } from "lucide-react";
import { Section } from "./Layout";
import { Reveal } from "./Reveal";
import { Github, Article } from "./Icons";
import { colors, fontDisplay, fontBody, fontMono } from "../lib/theme";

// Ganti data di bawah ini dengan proyek unggulan kamu sendiri. "thumbnail"
// sebaiknya screenshot proyek (taruh file di /public lalu isi path-nya,
// misal "/thumbnails/openbook.png"). Kalau belum ada gambar, kotak
// placeholder otomatis muncul. Isi "" (string kosong) pada githubUrl /
// mediumUrl / driveUrl kalau proyeknya tidak punya link itu — ikonnya
// otomatis disembunyikan.
const featuredProjects = [
  {
    title: "Dashboard Kekerasan di Jawa Barat",
    desc: "Membuat dashboard serta menganalisis kualitas pencatatan data di Jawa Barat dan melihat kekerasan apa yang paling banyak terjadi berdasarkan kota/kabupaten atau tahun.",
    tags: ["Excel", "Power BI"],
    thumbnail: "/thumbnails/project-1.png",
    githubUrl: "https://github.com/muharromganesha/Kekerasan-di-JawaBarat",
    mediumUrl: "https://medium.com/@MuharromGanesha/analisis-tren-dan-kualitas-data-pelaporan-kasus-kekerasan-di-jawa-barat-2018-2024-5cdc7e4ceea6?sharedUserId=MuharromGanesha",
    driveUrl: "",
  },
  {
    title: "Dashboard Penjualan Ritel",
    desc: "Menganalisis penjualan sebuah ritel fiktif untuk dilihat barang apa yang yang paling sering dibeli serta melihat perkembangan toko per kuarter.",
    tags: ["Python (Pandas)", "Power BI"],
    thumbnail: "/thumbnails/project-2.png",
    githubUrl: "https://github.com/muharromganesha/Online-Retail-Sales-Analysis",
    mediumUrl: "https://medium.com/@MuharromGanesha/analisis-online-retail-sales-performance-2010-2011-4ec8da1a3637?sharedUserId=MuharromGanesha",
    driveUrl: "",
  },
];

// Jenis-jenis link opsional per proyek. Ikon+tooltip cuma muncul kalau
// field terkait diisi (bukan string kosong).
const linkTypes = [
  { key: "githubUrl", icon: Github, label: "GitHub" },
  { key: "mediumUrl", icon: Article, label: "Artikel" },
  { key: "driveUrl", icon: HardDrive, label: "Google Drive" },
];

function ProjectCard({ project, delay }) {
  const availableLinks = linkTypes.filter((lt) => project[lt.key]);

  return (
    <Reveal delay={delay}>
      <div
        className="card-hover"
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          background: colors.surface,
          overflow: "hidden",
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 10",
            background: colors.surfaceAlt,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <img
            src={project.thumbnail}
            alt={project.title}
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
              fontFamily: fontBody,
              fontSize: 13,
              textAlign: "center",
              padding: 16,
            }}
          >
            Taruh screenshot di {project.thumbnail}
          </div>
        </div>

        {/* Konten */}
        <div style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <h3 style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 600, color: colors.textPrimary, margin: 0 }}>
              {project.title}
            </h3>
            {project.status && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: colors.textSecondary, flexShrink: 0, marginTop: 4 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5FBE7A", display: "inline-block" }} />
                {project.status}
              </span>
            )}
          </div>

          <p style={{ margin: "12px 0 0", fontSize: 14, color: colors.textSecondary, lineHeight: 1.6 }}>
            {project.desc}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 12,
                  color: colors.textSecondary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 999,
                  padding: "4px 12px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link ke luar (GitHub / Artikel / Google Drive) — tooltip nama
              link muncul di atas ikon saat di-hover */}
          {availableLinks.length > 0 && (
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
              {availableLinks.map((lt) => (
                <div key={lt.key} className="icon-link-wrap">
                  <span className="icon-tooltip">{lt.label}</span>
                  <a
                    href={project[lt.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${lt.label} — ${project.title}`}
                    className="card-hover icon-link"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
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
}

export default function ProjectsPreview() {
  return (
    <Section id="projects-preview" style={{ background: colors.surface }}>
      <Reveal>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 32, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
          Projects
        </h2>
        <div style={{ borderTop: `1px dashed ${colors.border}`, margin: "24px 0 40px" }} />
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="projects-preview-grid">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.title} project={project} delay={i * 120} />
        ))}
      </div>

      <Reveal delay={260}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <Link
            to="/proyek"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#FFFFFF",
              color: "#1A1A1A",
              fontFamily: fontBody,
              fontWeight: 600,
              fontSize: 15,
              padding: "13px 28px",
              borderRadius: 999,
            }}
          >
            More Projects
            <ArrowRight size={17} />
          </Link>
        </div>
      </Reveal>

      <style>{`
        @media (max-width: 780px) {
          .projects-preview-grid { grid-template-columns: 1fr !important; }
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
