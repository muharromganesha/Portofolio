import React from "react";
import { FileText, Globe, Code2, Lightbulb } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import GlitchText from "./GlitchText";
import { colors, fontDisplay } from "../lib/theme";

// lucide-react v1 tidak lagi punya ikon "X"/Twitter, jadi dibuat SVG sendiri.
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill={props.color || "currentColor"}>
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H2l8.1-9.3L1 2h6.9l4.8 6.4L18.9 2Zm-1.2 18h1.9L7.4 4h-2l12.3 16Z" />
    </svg>
  );
}

// Ganti href di bawah ini dengan tautan asli kamu.
const links = [
  { icon: Linkedin, href: "https://linkedin.com/in/muharrom-ganesha2503", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/muharromganesha", label: "GitHub" },
  { icon: Globe, href: "https://muharromganesha.vercel.app", label: "Website" },
  { icon: FileText, href: "/cv-muharrom-ganesha.pdf", label: "CV / Resume" },
];

// Ganti teks ini dengan nama/kata yang kamu inginkan.
const bigText = "Muharrom";

export default function ContactSection() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&display=swap');
        .contact-link:hover {
          border-color: ${colors.amber} !important;
          color: ${colors.textPrimary} !important;
        }
      `}</style>

      <h2 style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
        Contact
      </h2>
      <div style={{ borderTop: `1px dashed ${colors.border}`, margin: "14px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div style={{ display: "flex", gap: 14 }}>
          {links.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="contact-link"
              style={{
                width: 38,
                height: 38,
                borderRadius: 9,
                background: colors.surfaceAlt,
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.textSecondary,
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
            >
              <item.icon size={16} />
            </a>
          ))}
        </div>

        <div style={{ textAlign: "right", maxWidth: 380 }}>
          <p style={{ fontStyle: "italic", color: colors.textPrimary, fontSize: 14, margin: 0 }}>
            "In God we trust, all others bring data."
          </p>
          <p style={{ marginTop: 4, fontSize: 12, color: colors.textSecondary, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
            <Code2 size={12} /> W. Edwards Deming <Lightbulb size={12} />
          </p>
        </div>
      </div>

      <div style={{ borderTop: `1px dashed ${colors.border}`, margin: "20px 0 0" }} />

      <div style={{ padding: "18px 0 4px" }}>
        <GlitchText text={bigText} color="#FFFFFF" fontSize={78} />
      </div>
    </div>
  );
}
