import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */
const projects = [
  {
    id: "01",
    title: "SyN Distribuidora",
    tag: "React + Javascript",
    desc: "Sitio web profesional y responsive para distribuidora de frutos secos y productos naturales. Incluye catálogo de productos, información de contacto y diseño moderno que refleja la calidad de sus productos.",
    year: "2026",
    color: "#00ffc8",
    img: "/src/assets/imagen.jpg",
  },
  {
    id: "02",
    title: "Power Up: Mejorando Juntos",
    tag: "React + Tailwind CSS + Responsive",
    desc: "Página web completamente responsive para Brian Perez, personal trainer especializado en transformaciones físicas. Diseño motivacional con secciones de servicios, testimonios y call-to-action claros.",
    year: "2024",
    color: "#ff6ef7",
    img: "/src/assets/powerup.jpg",
  },
];

const skills = ["JavaScript", "React", "Tailwind v4", "Bootstrap", "Node.js", "Responsive design", "Git", "Github", "UI/UX"];

const services = [
  { num: "01", title: "Desarrollo Web", desc: "Sitios y aplicaciones a medida, limpios, rápidos y escalables." },
  { num: "02", title: "UI/UX & Frontend", desc: "Interfaces que comunican, sorprenden y convierten." },
  { num: "03", title: "Landing Pages", desc: "Páginas de alto impacto visual optimizadas para conversión." },
  { num: "04", title: "Consultoría", desc: "Revisión de código, arquitectura y mejora de proyectos existentes." },
];

/* ─── HOOKS ─────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── STYLES ────────────────────────────────────────────────── */
const G = {
  accent: "#00ffc8",
  bg: "#070709",
  text: "#f0ede8",
  muted: "rgba(240,237,232,0.38)",
  border: "rgba(240,237,232,0.07)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: ${G.bg};
    color: ${G.text};
    font-family: 'Outfit', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${G.bg}; }
  ::-webkit-scrollbar-thumb { background: rgba(0,255,200,0.3); border-radius: 4px; }

  /* ── Hamburger ── */
  .ham-line {
    display: block;
    width: 24px;
    height: 2px;
    background: ${G.text};
    transition: transform 0.35s cubic-bezier(.77,0,.18,1), opacity 0.2s;
    transform-origin: center;
  }
  .ham-open .ham-line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .ham-open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .ham-open .ham-line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

  /* ── Mobile menu overlay ── */
  .mobile-menu {
    position: fixed; inset: 0; z-index: 90;
    background: rgba(7,7,9,0.97);
    backdrop-filter: blur(20px);
    display: flex; flex-direction: column;
    justify-content: center; align-items: center; gap: 2.5rem;
    opacity: 0; pointer-events: none;
    transition: opacity 0.35s ease;
  }
  .mobile-menu.open { opacity: 1; pointer-events: auto; }

  /* ── FadeIn ── */
  .fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade.visible { opacity: 1; transform: translateY(0); }

  /* ── Project card ── */
  .proj-card {
    border: 1px solid ${G.border};
    overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
    cursor: pointer;
  }
  .proj-card:hover { border-color: rgba(0,255,200,0.35); transform: translateY(-4px); }
  .proj-card:hover .proj-img { transform: scale(1.04); }
  .proj-img { transition: transform 0.5s cubic-bezier(.25,.46,.45,.94); width: 100%; height: 220px; object-fit: cover; display: block; }

  /* ── Skill tag ── */
  .skill-tag {
    padding: 0.55rem 1.1rem;
    border: 1px solid ${G.border};
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: ${G.muted};
    letter-spacing: 0.05em;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    cursor: default;
  }
  .skill-tag:hover { border-color: rgba(0,255,200,0.45); color: ${G.text}; background: rgba(0,255,200,0.05); }

  /* ── Service card ── */
  .svc-card {
    padding: 2.25rem;
    border: 1px solid ${G.border};
    transition: border-color 0.3s, background 0.3s;
  }
  .svc-card:hover { border-color: rgba(0,255,200,0.3); background: rgba(0,255,200,0.03); }

  /* ── Contact link ── */
  .cta-link {
    display: inline-flex; align-items: center; gap: 0.65rem;
    padding: 0.9rem 1.6rem;
    border: 1px solid;
    font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.875rem;
    text-decoration: none; letter-spacing: 0.03em;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }

  /* ── Grid responsive ── */
  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    .projects-grid { grid-template-columns: 1fr !important; }
    .services-grid { grid-template-columns: 1fr !important; }
    .hero-h1 { font-size: clamp(3.5rem, 18vw, 6rem) !important; }
    .section-pad { padding: 5rem 1.25rem !important; }
    .hero-pad { padding: 0 1.25rem !important; }
    .hero-btns { flex-direction: column !important; align-items: flex-start !important; }
    .stats-row { gap: 1.75rem !important; }
    .contact-btns { flex-direction: column !important; align-items: flex-start !important; }
    .footer-row { flex-direction: column !important; gap: 0.75rem !important; }
  }
`;

/* ─── FadeIn COMPONENT ──────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade${inView ? " visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* ─── NAV ────────────────────────────────────────────────────── */
const sections = ["inicio", "sobre", "habilidades", "proyectos", "servicios", "contacto"];

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <>
      <style>{css}</style>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(7,7,9,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${G.border}` : "1px solid transparent",
        transition: "background 0.4s, border-color 0.4s",
      }}>
        {/* Logo */}
        <button
          onClick={() => go("inicio")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.06em", color: G.text }}>G</span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.06em", color: G.accent }}>·</span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.06em", color: G.text }}>O</span>
        </button>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2rem" }} className="desktop-nav">
          {sections.map((s) => (
            <button key={s} onClick={() => go(s)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: active === s ? G.accent : G.muted,
              transition: "color 0.2s",
              padding: "0.25rem 0",
              borderBottom: active === s ? `1px solid ${G.accent}` : "1px solid transparent",
            }}>
              {s}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: "6px", padding: "4px", zIndex: 110, position: "relative" }}
          className={`ham-btn${open ? " ham-open" : ""}`}
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {sections.map((s, i) => (
          <button key={s} onClick={() => go(s)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.75rem", letterSpacing: "0.08em",
            color: active === s ? G.accent : G.text,
            transition: "color 0.2s",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
            transitionDelay: `${i * 0.06}s`,
            transitionProperty: "opacity, transform, color",
            transitionDuration: "0.4s",
          }}>
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Hide desktop nav & show ham on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .ham-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function HeroSection() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 550);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="inicio" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 2.5rem", position: "relative", overflow: "hidden" }} className="hero-pad">
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${G.border} 1px, transparent 1px), linear-gradient(90deg, ${G.border} 1px, transparent 1px)`, backgroundSize: "56px 56px", pointerEvents: "none" }} />
      {/* Glow */}
      <div style={{ position: "absolute", top: "40%", left: "45%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(0,255,200,0.055) 0%, transparent 68%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "920px", position: "relative", zIndex: 2, paddingTop: "6rem" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.22em", color: "rgba(0,255,200,0.75)", marginBottom: "1.75rem", textTransform: "uppercase" }}>
          {tick % 2 === 0 ? "▮" : " "}&nbsp; Disponible para proyectos
        </div>

        <h1 className="hero-h1" style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: "clamp(4.5rem, 13vw, 10rem)", lineHeight: 0.88, letterSpacing: "0.02em", color: G.text, margin: "0 0 2rem 0" }}>
          Gerard
          <br />
          <span style={{ color: "rgba(240,237,232,0.13)", WebkitTextStroke: `1px rgba(240,237,232,0.2)` }}>Ojeda</span>
        </h1>

        <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: G.muted, maxWidth: "460px", lineHeight: 1.7, margin: "0 0 3rem 0" }}>
          Desarrollador freelancer. Construyo interfaces que no se olvidan y productos que funcionan de verdad.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }} className="hero-btns">
          <button
            onClick={() => document.getElementById("proyectos").scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "0.875rem 2.25rem", background: G.accent, color: G.bg, border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.04em", transition: "opacity 0.2s, transform 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Ver proyectos ↓
          </button>
          <button
            onClick={() => document.getElementById("contacto").scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "0.875rem 2.25rem", background: "transparent", color: G.text, border: `1px solid ${G.border}`, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.875rem", letterSpacing: "0.04em", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,255,200,0.5)"; e.currentTarget.style.color = G.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.text; }}
          >
            Hablemos →
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(240,237,232,0.18)", textTransform: "uppercase", writingMode: "vertical-rl" }}>
        scroll ↓
      </div>
    </section>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="sobre" className="section-pad" style={{ padding: "8rem 2.5rem", borderTop: `1px solid ${G.border}` }}>
      <div style={{ maxWidth: "960px" }}>
        <FadeIn>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(0,255,200,0.55)", textTransform: "uppercase", marginBottom: "3.5rem" }}>
            — 001 / Sobre mí
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="about-grid">
          <FadeIn delay={0.1}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.95, letterSpacing: "0.02em", color: G.text }}>
              Código limpio.
              <br />
              <span style={{ color: G.accent }}>Resultados reales.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "1.05rem", color: G.muted, lineHeight: 1.8, marginBottom: "1.25rem" }}>
                Soy Gerard, desarrollador freelancer especializado en frontend moderno. Me obsesiona construir interfaces rápidas, accesibles y con identidad propia.
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "1.05rem", color: G.muted, lineHeight: 1.8 }}>
                No entrego plantillas. Entrego productos que resuelven problemas y que alguien va a querer mostrar.
              </p>
              <div style={{ display: "flex", gap: "3rem", marginTop: "3rem", paddingTop: "2rem", borderTop: `1px solid ${G.border}` }} className="stats-row">
                {[["15+", "Proyectos"], ["3+", "Años exp."], ["100%", "Freelance"]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", color: G.text, letterSpacing: "0.04em", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", color: "rgba(240,237,232,0.28)", textTransform: "uppercase", marginTop: "0.3rem" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────────── */
function SkillsSection() {
  return (
    <section id="habilidades" className="section-pad" style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${G.border}` }}>
      <FadeIn>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(0,255,200,0.55)", textTransform: "uppercase", marginBottom: "3rem" }}>
          — 002 / Habilidades
        </p>
      </FadeIn>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
        {skills.map((s, i) => (
          <FadeIn key={s} delay={i * 0.045}>
            <div className="skill-tag">{s}</div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────────── */
const projectLinks = [
  "https://s-y-n-beige.vercel.app/#sopas",
  "https://power-up-brian.vercel.app/",
];

function ProjectsSection() {
  return (
    <section id="proyectos" className="section-pad" style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${G.border}` }}>
      <FadeIn>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(0,255,200,0.55)", textTransform: "uppercase", marginBottom: "4rem" }}>
          — 003 / Proyectos
        </p>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }} className="projects-grid">
        {projects.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.1}>
            <a href={projectLinks[i]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
              <div className="proj-card" style={{ background: "rgba(255,255,255,0.015)" }}>
                <div style={{ overflow: "hidden", position: "relative" }}>
                  <img src={p.img} alt={p.title} className="proj-img" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(7,7,9,0.7) 100%)" }} />
                  <div style={{ position: "absolute", top: "1rem", left: "1rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: p.color, letterSpacing: "0.1em", background: "rgba(7,7,9,0.7)", padding: "0.3rem 0.65rem", border: `1px solid ${p.color}33` }}>
                    {p.tag}
                  </div>
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(240,237,232,0.4)", letterSpacing: "0.1em" }}>
                    {p.year}
                  </div>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "0.04em", color: G.text, lineHeight: 1 }}>
                      {p.title}
                    </h3>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(240,237,232,0.22)", letterSpacing: "0.1em" }}>
                      {p.id}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "0.875rem", color: G.muted, lineHeight: 1.65 }}>
                    {p.desc}
                  </p>
                  <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: p.color, letterSpacing: "0.1em" }}>Ver proyecto ↗</span>
                  </div>
                </div>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
/* ─── SERVICES ───────────────────────────────────────────────── */
function ServicesSection() {
  return (
    <section id="servicios" className="section-pad" style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${G.border}` }}>
      <FadeIn>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(0,255,200,0.55)", textTransform: "uppercase", marginBottom: "4rem" }}>
          — 004 / Servicios
        </p>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} className="services-grid">
        {services.map((s, i) => (
          <FadeIn key={s.title} delay={i * 0.09}>
            <div className="svc-card">
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "rgba(0,255,200,0.15)", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "1rem" }}>{s.num}</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.04em", color: G.text, marginBottom: "0.65rem" }}>{s.title}</h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: G.muted, lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────── */
function ContactSection() {
  return (
    <section id="contacto" className="section-pad" style={{ padding: "8rem 2.5rem", borderTop: `1px solid ${G.border}`, minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <FadeIn>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(0,255,200,0.55)", textTransform: "uppercase", marginBottom: "3rem" }}>
          — 005 / Contacto
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.88, letterSpacing: "0.02em", color: G.text, margin: "0 0 3rem 0" }}>
          ¿Tenés un
          <br />
          <span style={{ color: "rgba(240,237,232,0.13)", WebkitTextStroke: "1px rgba(240,237,232,0.2)" }}>proyecto?</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }} className="contact-btns">

          <a href="https://wa.me/5491136207025" target="_blank" rel="noopener noreferrer"
            className="cta-link"
            style={{ borderColor: "rgba(37,211,102,0.3)", color: "rgb(37,211,102)", background: "rgba(37,211,102,0.07)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.15)"; e.currentTarget.style.borderColor = "rgba(37,211,102,0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.07)"; e.currentTarget.style.borderColor = "rgba(37,211,102,0.3)"; }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>

          <a href="https://www.instagram.com/gerard.freelancer?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"
            className="cta-link"
            style={{ borderColor: "rgba(193,53,132,0.3)", color: "rgb(220,90,155)", background: "rgba(193,53,132,0.07)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(193,53,132,0.15)"; e.currentTarget.style.borderColor = "rgba(193,53,132,0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(193,53,132,0.07)"; e.currentTarget.style.borderColor = "rgba(193,53,132,0.3)"; }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>

          <a href="mailto:ojedagerard5@gmail.com"
            className="cta-link"
            style={{ borderColor: G.border, color: G.muted, background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(240,237,232,0.3)"; e.currentTarget.style.color = G.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.muted; }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            ojedagerard5@gmail.com
          </a>
        </div>
      </FadeIn>

      <div style={{ marginTop: "6rem", paddingTop: "1.75rem", borderTop: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }} className="footer-row">
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(240,237,232,0.2)" }}>
          © {new Date().getFullYear()} Gerard Ojeda
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(240,237,232,0.2)" }}>
          Hecho con React
        </span>
      </div>
    </section>
  );
}

/* ─── PRELOADER ──────────────────────────────────────────────── */
const preloaderCSS = `
  @keyframes bar-grow {
    0%   { width: 0%; }
    60%  { width: 85%; }
    100% { width: 100%; }
  }
  @keyframes counter-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes preloader-out {
    0%   { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-100%); }
  }
  .preloader-exit {
    animation: preloader-out 0.75s cubic-bezier(.77,0,.18,1) forwards;
  }
  @keyframes logo-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.35; }
  }
`;

function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Animate counter 0 → 100 over ~1.8s
    let start = null;
    const duration = 1800;
    const raf = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.floor(eased * 100));
      if (progress < 1) requestAnimationFrame(raf);
      else {
        // pequeña pausa antes de salir
        setTimeout(() => {
          setExiting(true);
          setTimeout(onDone, 750);
        }, 300);
      }
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <style>{preloaderCSS}</style>
      <div
        className={exiting ? "preloader-exit" : ""}
        style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: G.bg,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: "2.5rem",
        }}
      >
        {/* Top: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.06em", color: G.text, animation: "logo-pulse 1.4s ease infinite" }}>G</span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: G.accent, animation: "logo-pulse 1.4s ease infinite 0.2s" }}>·</span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.06em", color: G.text, animation: "logo-pulse 1.4s ease infinite 0.4s" }}>O</span>
        </div>

        {/* Center: big counter */}
        <div style={{ position: "absolute", top: "50%", left: "2.5rem", transform: "translateY(-50%)" }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem, 22vw, 14rem)",
            lineHeight: 1,
            letterSpacing: "0.02em",
            color: "rgba(240,237,232,0.06)",
            userSelect: "none",
            animation: "counter-up 0.4s ease forwards",
          }}>
            {String(pct).padStart(3, "0")}
          </div>
          <div style={{
            position: "absolute", bottom: "0.5rem", left: "0.25rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem", letterSpacing: "0.2em",
            color: G.accent,
            textTransform: "uppercase",
          }}>
            Cargando
          </div>
        </div>

        {/* Bottom: progress bar + percent */}
        <div>
          {/* Bar */}
          <div style={{ height: "1px", background: G.border, marginBottom: "1.25rem", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${pct}%`,
              background: `linear-gradient(90deg, rgba(0,255,200,0.4), ${G.accent})`,
              transition: "width 0.05s linear",
              boxShadow: `0 0 12px ${G.accent}`,
            }} />
          </div>
          {/* Bottom row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", color: "rgba(240,237,232,0.22)", textTransform: "uppercase" }}>
              Portfolio — Gerard Ojeda
            </span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: G.accent, letterSpacing: "0.04em" }}>
              {pct}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const obs = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveSection(id); }, { threshold: 0.25 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <div style={{
        background: G.bg, color: G.text, minHeight: "100vh",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease 0.1s",
      }}>
        <Nav active={activeSection} />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ServicesSection />
        <ContactSection />
      </div>
    </>
  );
}
