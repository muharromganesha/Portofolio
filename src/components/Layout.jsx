import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { colors, fontDisplay, fontBody } from "../lib/theme";
import { lenisRef } from "../lib/lenisInstance";

const monoFont = "'JetBrains Mono', monospace";

// Sesuai desain baru: navbar berisi Proyek, Pengalaman, Kontak — tanpa animasi.
// "Kontak" bertipe scroll (bukan route) supaya URL tidak pernah berubah jadi
// "/#kontak" — jadi refresh selalu balik ke landing page, dan URL tidak
// "nyangkut" saat kamu scroll menjauh dari section itu.
const navItems = [
  { label: "Project", to: "/proyek", type: "route" },
  { label: "Experience", to: "/pengalaman", type: "route" },
  { label: "Contact", sectionId: "kontak", type: "scroll" },
];

export function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap');
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      html.lenis, html.lenis body { height: auto; }
      .lenis.lenis-smooth { scroll-behavior: auto !important; }
      .lenis.lenis-stopped { overflow: hidden; }
      a { color: inherit; text-decoration: none; }
      @keyframes clarifyIn {
        from { opacity: 0; filter: blur(18px); transform: translateY(12px); }
        to { opacity: 1; filter: blur(0); transform: translateY(0); }
      }
      .clarify {
        opacity: 0;
        animation: clarifyIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      input, textarea { font-family: 'Inter', sans-serif; }
      input:focus, textarea:focus, button:focus, a:focus {
        outline: 2px solid ${colors.amber};
        outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; transition: none !important; }
        /* Elemen di bawah ini mulai dari opacity:0 dan baru dimunculkan oleh
           animasi. Kalau animasi dimatikan lewat pengaturan sistem, elemen
           harus tetap ditampilkan — kalau tidak, teksnya hilang selamanya. */
        .clarify, .hero-item, .reveal, .ascii-letter {
          opacity: 1 !important;
          filter: none !important;
          transform: none !important;
        }
      }
      .card-hover { transition: border-color 0.2s ease, transform 0.2s ease; }
      .card-hover:hover { border-color: ${colors.amber}; transform: translateY(-2px); }
      .btn-primary { transition: opacity 0.2s ease; }
      .btn-primary:hover { opacity: 0.85; }
      @keyframes floatDot {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      .reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }
      .reveal-visible {
        opacity: 1;
        transform: translateY(0);
      }
      .hero-item {
        opacity: 0;
        animation: heroFadeUp 0.8s ease forwards;
      }
      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .type-cursor {
        display: inline-block;
        margin-left: 2px;
        animation: blink 0.9s step-end infinite;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
      @media (max-width: 720px) {
        .desktop-nav { display: none !important; }
        .mobile-menu-btn { display: block !important; }
      }
    `}</style>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll ke section tertentu tanpa pernah menyentuh URL (tidak pakai hash).
  // Kalau belum di halaman Beranda, pindah dulu ke "/" lewat state (bukan
  // hash), baru scroll setelah halamannya termuat.
  const scrollToSection = (sectionId) => {
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -20 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (location.pathname === "/") {
      doScroll();
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const renderNavItem = (item, extraStyle) =>
    item.type === "scroll" ? (
      <button
        key={item.label}
        onClick={() => {
          scrollToSection(item.sectionId);
          setMenuOpen(false);
        }}
        style={{
          fontFamily: monoFont,
          fontSize: 15,
          color: colors.textPrimary,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          ...extraStyle,
        }}
      >
        {item.label}
      </button>
    ) : (
      <Link
        key={item.to}
        to={item.to}
        onClick={() => setMenuOpen(false)}
        style={{ fontFamily: monoFont, fontSize: 15, color: colors.textPrimary, ...extraStyle }}
      >
        {item.label}
      </Link>
    );

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: colors.bg,
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "22px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ fontFamily: monoFont, fontWeight: 700, fontSize: 22, color: colors.textPrimary }}>
          MG
        </Link>
        <nav style={{ display: "flex", gap: 32 }} className="desktop-nav">
          {navItems.map((item) => renderNavItem(item))}
        </nav>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", color: colors.textPrimary, cursor: "pointer" }}
          className="mobile-menu-btn"
          aria-label="Buka menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <div style={{ borderTop: `1px solid ${colors.border}`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {navItems.map((item) => renderNavItem(item))}
        </div>
      )}
    </header>
  );
}

export function Section({ id, children, style }) {
  return (
    <section id={id} style={{ padding: "96px 24px", ...style }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

export function SectionHeading({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: fontDisplay,
          fontSize: "clamp(28px, 4vw, 38px)",
          fontWeight: 500,
          color: colors.textPrimary,
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: fontBody, color: colors.textSecondary, fontSize: 16, marginTop: 10, maxWidth: 560, lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
