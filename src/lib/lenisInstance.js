// Referensi bersama ke instance Lenis (smooth scroll) yang aktif, supaya
// komponen lain (misalnya Home.jsx) bisa memerintahkan scroll dengan cara
// yang benar-benar sinkron dengan Lenis — bukan lewat scrollIntoView bawaan
// browser yang bisa "kalah" sama animasi scroll milik Lenis.
export const lenisRef = { current: null };
