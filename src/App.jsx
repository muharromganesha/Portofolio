import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { lenisRef } from "./lib/lenisInstance";
import { Navbar, GlobalStyles } from "./components/Layout";
import { colors, fontBody } from "./lib/theme";
import Home from "./pages/Home";
import Proyek from "./pages/Proyek";
import Pengalaman from "./pages/Pengalaman";

export default function App() {
  // Smooth scroll "berat" — scroll tidak langsung instan, tapi mengikuti
  // dengan sedikit inersia/lag mengejar posisi target. Duration lebih besar
  // dan lerp lebih kecil = terasa makin berat.
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6, // makin besar = makin berat/lambat
      lerp: 0.08, // makin kecil = makin "berat" mengejar posisi target
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <div style={{ background: colors.bg, color: colors.textPrimary, fontFamily: fontBody, minHeight: "100vh" }}>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyek" element={<Proyek />} />
          <Route path="/pengalaman" element={<Pengalaman />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
