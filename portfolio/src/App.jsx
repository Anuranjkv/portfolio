import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const TECH_SKILLS = [
  { name: "HTML5", icon: "🌐", level: 85 },
  { name: "CSS3", icon: "🎨", level: 80 },
  { name: "JavaScript", icon: "⚡", level: 75 },
  { name: "React.js", icon: "⚛️", level: 70 },
  { name: "Tailwind CSS", icon: "💨", level: 72 },
  { name: "Python", icon: "🐍", level: 68 },
  { name: "C Programming", icon: "🔧", level: 65 },
];

const SOFT_SKILLS = [
  { name: "Communication", icon: "💬", desc: "Clear & effective communicator" },
  { name: "Problem Solving", icon: "🧩", desc: "Analytical & creative thinker" },
  { name: "Team Collaboration", icon: "🤝", desc: "Works well in agile teams" },
];

const PROJECTS = [
  {
    title: "Personal Portfolio",
    desc: "A responsive portfolio website showcasing my skills, projects, and experience built with React and Tailwind CSS.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    github: "#",
    accent: "#00e5ff",
  },
  {
    title: "To-Do List App",
    desc: "A feature-rich task manager with local storage persistence, priority labels, and smooth animations.",
    tags: ["React", "Hooks", "LocalStorage"],
    github: "#",
    accent: "#ffd60a",
  },
  {
    title: "Simple Calculator",
    desc: "A fully functional calculator supporting standard arithmetic operations with a clean dark UI.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "#",
    accent: "#a78bfa",
  },
  {
    title: "Python CLI Tool",
    desc: "A command-line utility for file organization that auto-sorts downloads into categorized folders.",
    tags: ["Python", "OS Module", "CLI"],
    github: "#",
    accent: "#34d399",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedSection({ children, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

function SkillBar({ name, icon, level }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span style={{ color: "#e2e8f0", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", letterSpacing: "0.05em" }}>
          <span className="mr-2">{icon}</span>{name}
        </span>
        <span style={{ color: "#00e5ff", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem" }}>{level}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "2px", height: "4px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: visible ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #00e5ff, #a78bfa)",
            borderRadius: "2px",
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1) 0.2s",
            boxShadow: "0 0 8px #00e5ff88",
          }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(${project.accent === "#00e5ff" ? "0,229,255" : project.accent === "#ffd60a" ? "255,214,10" : project.accent === "#a78bfa" ? "167,139,250" : "52,211,153"},0.07) 0%, rgba(15,23,42,0.95) 100%)`
          : "rgba(15,23,42,0.7)",
        border: `1px solid ${hovered ? project.accent + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "12px",
        padding: "28px",
        backdropFilter: "blur(12px)",
        transition: "all 0.4s ease",
        transform: visible ? (hovered ? "translateY(-6px)" : "translateY(0)") : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <h3 style={{
        color: "#f1f5f9",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "1.5rem",
        letterSpacing: "0.08em",
        marginBottom: "10px",
      }}>{project.title}</h3>
      <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "18px" }}>
        {project.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
        {project.tags.map(t => (
          <span key={t} style={{
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}40`,
            color: project.accent,
            borderRadius: "4px",
            padding: "2px 10px",
            fontSize: "0.75rem",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.04em",
          }}>{t}</span>
        ))}
      </div>
      <a
        href={project.github}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: project.accent,
          textDecoration: "none",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.8rem",
          letterSpacing: "0.06em",
          transition: "gap 0.2s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.gap = "10px"}
        onMouseLeave={e => e.currentTarget.style.gap = "6px"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
        View on GitHub →
      </a>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#e2e8f0",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  };

  return (
    <div style={{
      background: "#060d1a",
      minHeight: "100vh",
      color: "#e2e8f0",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      overflowX: "hidden",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060d1a; }
        ::-webkit-scrollbar-thumb { background: #00e5ff44; border-radius: 2px; }
        input:focus, textarea:focus { border-color: #00e5ff !important; box-shadow: 0 0 0 3px rgba(0,229,255,0.08); }
        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: #00e5ff !important; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,229,255,0.35) !important; }
        .btn-outline:hover { background: rgba(0,229,255,0.08) !important; transform: translateY(-2px); }
        .social-icon:hover { color: #00e5ff !important; transform: translateY(-3px); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-glow { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes grid-pan { 0%{transform:translateX(0) translateY(0)} 100%{transform:translateX(60px) translateY(60px)} }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .float-anim { animation: float 5s ease-in-out infinite; }
      `}</style>

      {/* Background grid & gradient */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "grid-pan 20s linear infinite",
        }} />
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 65%)",
          animation: "pulse-glow 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-5%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 65%)",
        }} />
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(6,13,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,229,255,0.1)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "0.1em", color: "#f1f5f9" }}>
            YN<span style={{ color: "#00e5ff" }}>.</span>
          </div>
          <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
            {NAV_LINKS.map(link => (
              <button key={link} className="nav-link"
                onClick={() => scrollTo(link)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'DM Mono', monospace", fontSize: "0.8rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: activeSection === link ? "#00e5ff" : "#94a3b8",
                  padding: "4px 0",
                  borderBottom: activeSection === link ? "1px solid #00e5ff" : "1px solid transparent",
                }}
              >{link}</button>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#e2e8f0", padding: "8px" }}
            id="mobile-menu-btn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: "rgba(6,13,26,0.98)", borderTop: "1px solid rgba(0,229,255,0.1)", padding: "16px 5%" }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'DM Mono', monospace", fontSize: "0.9rem",
                  letterSpacing: "0.08em", color: "#94a3b8", padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >{link}</button>
            ))}
          </div>
        )}
      </nav>

      <main style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 5%", paddingTop: "68px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "40px" }}>
              <div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.8rem",
                  color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase",
                  marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <span style={{ width: "30px", height: "1px", background: "#00e5ff", display: "inline-block" }} />
                  Available for opportunities
                </div>
                <h1 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                  lineHeight: 0.95, letterSpacing: "0.03em",
                  color: "#f1f5f9", marginBottom: "20px",
                }}>
                  YOUR<br />
                  <span style={{ color: "#00e5ff", textShadow: "0 0 40px rgba(0,229,255,0.4)" }}>NAME</span>
                  <span className="cursor-blink" style={{ color: "#ffd60a", marginLeft: "4px" }}>_</span>
                </h1>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  color: "#64748b", letterSpacing: "0.06em",
                  textTransform: "uppercase", marginBottom: "12px", fontWeight: 500,
                }}>BCA Graduate · Aspiring Software Developer</p>
                <p style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "#94a3b8",
                  maxWidth: "520px", lineHeight: 1.75, marginBottom: "40px",
                }}>
                  Passionate about learning new technologies and building user-friendly applications that make a real difference.
                </p>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <button className="btn-primary" onClick={() => scrollTo("Projects")} style={{
                    background: "linear-gradient(135deg, #00e5ff, #0ea5e9)",
                    border: "none", borderRadius: "6px",
                    padding: "14px 32px", color: "#060d1a",
                    fontFamily: "'DM Mono', monospace", fontWeight: 600,
                    fontSize: "0.85rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,229,255,0.25)",
                    transition: "all 0.3s ease",
                  }}>View Projects →</button>
                  <button className="btn-outline" onClick={() => scrollTo("Contact")} style={{
                    background: "transparent",
                    border: "1px solid rgba(0,229,255,0.4)",
                    borderRadius: "6px",
                    padding: "14px 32px", color: "#00e5ff",
                    fontFamily: "'DM Mono', monospace", fontWeight: 500,
                    fontSize: "0.85rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}>Contact Me</button>
                </div>
              </div>
              {/* Floating tech tags */}
              <div className="float-anim" style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                {["React.js", "Python", "JS", "CSS", "C"].map((t, i) => (
                  <div key={t} style={{
                    background: `rgba(0,229,255,${0.04 + i * 0.01})`,
                    border: "1px solid rgba(0,229,255,0.15)",
                    borderRadius: "8px", padding: "8px 20px",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.75rem", letterSpacing: "0.1em",
                    color: "#00e5ff",
                    transform: `translateX(${i % 2 === 0 ? -10 : 10}px)`,
                    opacity: 1 - i * 0.12,
                  }}>{t}</div>
                ))}
              </div>
            </div>
            <div style={{
              marginTop: "60px", display: "flex", alignItems: "center", gap: "12px",
              color: "#334155", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, #334155)" }} />
              Scroll down
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ padding: "100px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <AnimatedSection>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
                    // 01 — About
                  </p>
                  <h2 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    letterSpacing: "0.05em", color: "#f1f5f9",
                    lineHeight: 1, marginBottom: "28px",
                  }}>
                    WHO<br /><span style={{ color: "#00e5ff" }}>AM I</span>?
                  </h2>
                  <p style={{ color: "#94a3b8", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "18px" }}>
                    I'm a <strong style={{ color: "#e2e8f0" }}>BCA Graduate</strong> with a passion for creating innovative solutions through code. I have experience in full-stack development, from building responsive front-end interfaces to developing robust back-end systems. My goal is to leverage my skills to contribute to meaningful projects and continue growing as a developer.
                  </p>
                </div>
                <div>
                  {/* Placeholder for image or something */}
                  <div style={{ width: "100%", height: "300px", background: "rgba(0,229,255,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#00e5ff", fontSize: "2rem" }}>👨‍💻</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" style={{ padding: "100px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <AnimatedSection>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
                // 02 — Skills
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "0.05em", color: "#f1f5f9",
                lineHeight: 1, marginBottom: "28px",
              }}>
                TECH<br /><span style={{ color: "#00e5ff" }}>STACK</span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
                <div>
                  <h3 style={{ color: "#f1f5f9", fontSize: "1.2rem", marginBottom: "20px" }}>Technical Skills</h3>
                  {TECH_SKILLS.map(skill => <SkillBar key={skill.name} {...skill} />)}
                </div>
                <div>
                  <h3 style={{ color: "#f1f5f9", fontSize: "1.2rem", marginBottom: "20px" }}>Soft Skills</h3>
                  {SOFT_SKILLS.map(skill => (
                    <div key={skill.name} style={{ marginBottom: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "1.5rem" }}>{skill.icon}</span>
                        <div>
                          <div style={{ color: "#e2e8f0", fontWeight: 500 }}>{skill.name}</div>
                          <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{skill.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ padding: "100px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <AnimatedSection>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
                // 03 — Projects
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "0.05em", color: "#f1f5f9",
                lineHeight: 1, marginBottom: "28px",
              }}>
                MY<br /><span style={{ color: "#00e5ff" }}>WORK</span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
                {PROJECTS.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: "100px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <AnimatedSection>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#00e5ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
                // 04 — Contact
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "0.05em", color: "#f1f5f9",
                lineHeight: 1, marginBottom: "28px",
              }}>
                GET IN<br /><span style={{ color: "#00e5ff" }}>TOUCH</span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
                <div>
                  <p style={{ color: "#94a3b8", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "30px" }}>
                    Have a project in mind or just want to chat? I'd love to hear from you. Let's build something amazing together!
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ color: "#00e5ff", fontSize: "1.2rem" }}>📧</span>
                      <span style={{ color: "#e2e8f0" }}>your.email@example.com</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ color: "#00e5ff", fontSize: "1.2rem" }}>📱</span>
                      <span style={{ color: "#e2e8f0" }}>+1 (123) 456-7890</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ color: "#00e5ff", fontSize: "1.2rem" }}>📍</span>
                      <span style={{ color: "#e2e8f0" }}>Your City, Country</span>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                    required
                  />
                  <button
                    type="submit"
                    style={{
                      background: "linear-gradient(135deg, #00e5ff, #0ea5e9)",
                      border: "none",
                      borderRadius: "6px",
                      padding: "14px 32px",
                      color: "#060d1a",
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(0,229,255,0.25)",
                      transition: "all 0.3s ease",
                    }}
                    className="btn-primary"
                  >
                    Send Message
                  </button>
                  {submitted && (
                    <p style={{ color: "#00e5ff", fontSize: "0.9rem" }}>Thank you! Your message has been sent.</p>
                  )}
                </form>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
    </div>
  );
}