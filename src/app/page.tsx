"use client";

import { useChat } from "@ai-sdk/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/* ───── data ───── */

const SUGGESTED = [
  { q: "What production AI systems has she built?", icon: "🔧" },
  { q: "Tell me about her RAG and multi-agent experience", icon: "🤖" },
  { q: "What open source contributions has she made?", icon: "🌍" },
  { q: "Why should we hire Mansi?", icon: "💡" },
  { q: "What's her tech stack?", icon: "⚡" },
  { q: "Tell me about her IBM experience", icon: "🏢" },
];

const PROJECTS = [
  {
    name: "Forge",
    desc: "AI Agent Evaluation & Orchestration — multi-agent workflows, RAG, LLM eval, guardrails, cost tracking",
    tags: ["FastAPI", "Claude API", "LangGraph", "Next.js"],
    live: "https://web-lyart-gamma-37.vercel.app",
    code: "https://github.com/Mansi2221/forge",
    gradient: "from-purple-500 to-blue-500",
    glow: "rgba(168,85,247,0.15)",
    span: "md:col-span-2",
  },
  {
    name: "DeployKit",
    desc: "Production readiness scanner — instant deploy/no-deploy verdict across 6 categories, 52 tests",
    tags: ["Python", "CLI", "Next.js"],
    live: "https://deploykit.vercel.app",
    code: "https://github.com/Mansi2221/deploykit",
    gradient: "from-green-400 to-cyan-500",
    glow: "rgba(34,197,94,0.15)",
    span: "",
  },
  {
    name: "Eligible",
    desc: "Clinical trial matching — OMOP harmonization, agentic matching, PHI redaction, FHIR output",
    tags: ["LangGraph", "dbt", "FHIR", "FastAPI"],
    code: "https://github.com/Mansi2221/eligible",
    gradient: "from-yellow-400 to-orange-500",
    glow: "rgba(249,115,22,0.15)",
    span: "",
  },
  {
    name: "TalentRAG",
    desc: "Hybrid retrieval (sparse + dense), cross-encoder reranking, LLM judge evaluation",
    tags: ["FAISS", "FastAPI", "Docker"],
    code: "https://github.com/Mansi2221/talent-rag",
    gradient: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.15)",
    span: "",
  },
  {
    name: "Clarify",
    desc: "AI Business Analyst — brief in, full deliverable pack out. 70x speedup over manual review",
    tags: ["Next.js 16", "AI SDK", "FastAPI"],
    live: "https://clarify-alpha.vercel.app",
    code: "https://github.com/Mansi2221/clarify",
    gradient: "from-orange-400 to-red-500",
    glow: "rgba(239,68,68,0.15)",
    span: "",
  },
  {
    name: "TravelMind",
    desc: "5 parallel tool calls, real-time web search, structured travel briefings in <10s",
    tags: ["Groq", "Tavily", "Next.js"],
    live: "https://travelmind-ten.vercel.app",
    code: "https://github.com/Mansi2221/travelmind",
    gradient: "from-cyan-400 to-blue-500",
    glow: "rgba(6,182,212,0.15)",
    span: "md:col-span-2",
  },
];

const EXPERIENCE = [
  {
    role: "Forward Deployed Engineer (GenAI) Intern",
    company: "IBM",
    location: "USA",
    period: "May 2026 – Aug 2026",
    gradient: "from-purple-500 to-blue-500",
    icon: "🚀",
    highlights: [
      { metric: "10+", label: "GenAI PoCs delivered" },
      { metric: "45%", label: "reduction in inaccurate responses" },
      { metric: "35%", label: "faster solution evaluation" },
    ],
    bullets: [
      "Multi-agent AI workflows with LangGraph, watsonx.ai, MCP — planning, tool routing, self-reflection",
      "RAG pipelines reducing manual lookup time by ~20% during client PoC testing",
      "Guardrails for prompt injection, data leakage, and hallucinations across GPT-5, Claude, Gemini",
    ],
  },
  {
    role: "AI Engineer",
    company: "Hexaware Technologies",
    location: "India",
    period: "Aug 2023 – Jul 2025",
    gradient: "from-cyan-400 to-green-400",
    icon: "🤖",
    highlights: [
      { metric: "15%", label: "retrieval relevance boost" },
      { metric: "45%", label: "less manual research" },
      { metric: "20%", label: "automation time saved" },
    ],
    bullets: [
      "RAG pipelines with LangChain, LlamaIndex, embeddings, and vector databases",
      "Semantic search and Text-to-SQL on Azure OpenAI, Pinecone",
      "Multi-agent workflows with CrewAI and LLM tool calling",
    ],
  },
  {
    role: "Backend Software Engineer",
    company: "Cybage Software",
    location: "India",
    period: "Jun 2021 – Jul 2023",
    gradient: "from-orange-400 to-pink-500",
    icon: "⚙️",
    highlights: [
      { metric: "10%", label: "faster query response" },
      { metric: "15%", label: "fewer deploy steps" },
      { metric: "8%", label: "fewer recurring defects" },
    ],
    bullets: [
      "Java, Spring Boot — REST APIs, microservices, Redis caching",
      "PostgreSQL optimization with indexing strategies",
      "CI/CD with Docker, Jenkins, AWS, GitHub Actions",
    ],
  },
];

const SKILLS = [
  { cat: "GenAI & Agents", items: ["LangGraph", "CrewAI", "LangChain", "LlamaIndex", "MCP", "Claude API", "GPT-5", "watsonx.ai"], color: "#a855f7" },
  { cat: "RAG & LLM Eng", items: ["RAG", "Text-to-SQL", "Embeddings", "Semantic Search", "Prompt Engineering", "Tool Calling"], color: "#3b82f6" },
  { cat: "LLM Eval & Safety", items: ["Ragas", "TruLens", "LangSmith", "NeMo Guardrails", "Guardrails AI", "LLM Observability"], color: "#06b6d4" },
  { cat: "Backend", items: ["FastAPI", "Flask", "Spring Boot", "REST APIs", "Microservices", "Node.js"], color: "#22c55e" },
  { cat: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Pinecone", "pgvector", "FAISS", "ETL"], color: "#eab308" },
  { cat: "Cloud & DevOps", items: ["Azure", "AWS", "Docker", "Kubernetes", "Jenkins", "GitHub Actions"], color: "#f97316" },
];

const MARQUEE_SKILLS = [
  "Python", "Java", "TypeScript", "SQL", "LangGraph", "CrewAI", "LangChain",
  "Claude API", "GPT-5", "FastAPI", "Spring Boot", "Next.js", "React",
  "Docker", "Kubernetes", "AWS", "Azure", "PostgreSQL", "Redis", "Pinecone",
  "RAG", "Multi-Agent", "Guardrails", "LLM Eval", "MCP", "watsonx.ai",
];

const OSS = [
  { repo: "anthropics/anthropic-cookbook", count: 7, color: "#a855f7" },
  { repo: "run-llama/llama_index", count: 3, color: "#3b82f6" },
  { repo: "microsoft/agent-governance-toolkit", count: 1, color: "#22c55e" },
];

/* ───── helpers ───── */

function getMessageText(msg: { parts: Array<{ type: string; text?: string }> }) {
  return msg.parts.filter((p) => p.type === "text").map((p) => p.text ?? "").join("");
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let s = 0;
          const step = (t: number) => {
            if (!s) s = t;
            const p = Math.min((t - s) / 1500, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ───── variants ───── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ───── page ───── */

export default function Home() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);

  function ask(q: string) {
    sendMessage({ text: q });
    chatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <>
      <div className="aurora" />
      <div className="noise" />

      <main className="relative z-10">
        {/* ── NAV ── */}
        <nav className="fixed top-0 inset-x-0 z-50 glass">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs animate-pulse-glow">
                MP
              </div>
              <span className="font-semibold text-sm text-white/90">Mansi Patil</span>
            </div>
            <div className="flex items-center gap-5 text-sm">
              {["Experience", "Projects", "Skills", "Ask AI"].map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="text-white/40 hover:text-white transition font-medium hidden sm:block">
                  {l}
                </a>
              ))}
              <a href="https://github.com/Mansi2221" target="_blank" rel="noopener" className="text-white/40 hover:text-white transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/mansipatil22" target="_blank" rel="noopener" className="text-white/40 hover:text-white transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-[8%] w-32 h-32 rounded-full bg-purple-500/20 blur-2xl animate-float" />
          <div className="absolute top-40 right-[12%] w-24 h-24 rounded-full bg-blue-500/20 blur-2xl animate-float-2" />
          <div className="absolute bottom-32 left-[20%] w-20 h-20 rounded-full bg-pink-500/15 blur-2xl animate-float-3" />
          <div className="absolute bottom-20 right-[25%] w-28 h-28 rounded-full bg-cyan-500/15 blur-2xl animate-float" />
          <div className="absolute top-[30%] left-[50%] w-16 h-16 rounded-full bg-yellow-400/10 blur-xl animate-float-2" />

          <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="text-center relative z-10 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium glass mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400">Open to FDE roles</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] mb-6"
            >
              <span className="text-white">Hi, I&apos;m </span>
              <span className="grad-text-rainbow">Mansi</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl sm:text-2xl text-white/50 font-medium max-w-2xl mx-auto mb-4"
            >
              I take AI from <span className="text-purple-400">prototype</span> to{" "}
              <span className="text-blue-400">production</span> with customers
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-white/30 mb-10"
            >
              4+ years · FDE Intern @ IBM · MS Purdue &apos;26 · 10+ GenAI PoCs shipped
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <a href="#ask-ai" className="group px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:-translate-y-0.5">
                💬 Ask My AI Portfolio
                <span className="ml-1 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="#experience" className="px-7 py-3.5 rounded-2xl glass text-white/80 font-semibold text-sm hover:text-white hover:border-white/20 transition-all hover:-translate-y-0.5">
                View Experience
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-xs text-white/20">scroll</span>
              <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-white/30 animate-scroll" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── SKILL MARQUEE ── */}
        <section className="py-8 overflow-hidden border-y border-white/5">
          <div className="animate-marquee flex gap-8 whitespace-nowrap">
            {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((s, i) => (
              <span key={i} className="text-sm font-medium text-white/15 hover:text-white/40 transition cursor-default flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-purple-500/50" />
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              {[
                { v: 4, s: "+", l: "Years Exp", color: "purple" },
                { v: 10, s: "+", l: "GenAI PoCs", color: "blue" },
                { v: 11, s: "", l: "OSS PRs", color: "cyan" },
                { v: 120, s: "+", l: "Tests Written", color: "green" },
              ].map((s) => (
                <motion.div
                  key={s.l}
                  variants={scaleIn}
                  className="glass rounded-2xl p-6 text-center hover:border-white/10 transition group"
                >
                  <div className={`text-4xl font-black bg-gradient-to-r from-${s.color}-400 to-${s.color}-600 bg-clip-text text-transparent`}>
                    <Counter value={s.v} suffix={s.s} />
                  </div>
                  <div className="text-xs text-white/30 mt-1 font-medium tracking-wide uppercase">{s.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest text-purple-400 uppercase mb-3">Career</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
                Work <span className="grad-text">Experience</span>
              </motion.h2>
            </motion.div>

            <motion.div className="space-y-6" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              {EXPERIENCE.map((exp) => (
                <motion.div
                  key={exp.role}
                  variants={fadeUp}
                  className="glass rounded-2xl p-6 md:p-8 card-glow group"
                  style={{ ["--glow" as string]: exp.gradient === "from-purple-500 to-blue-500" ? "rgba(168,85,247,0.08)" : exp.gradient === "from-cyan-400 to-green-400" ? "rgba(6,182,212,0.08)" : "rgba(249,115,22,0.08)" }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 mb-5">
                    <span className="text-3xl">{exp.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}>
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="text-xs text-white/30 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap self-start font-medium">{exp.period}</span>
                  </div>

                  {/* Metric pills */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {exp.highlights.map((h) => (
                      <div key={h.label} className="bg-white/[0.03] rounded-xl p-3 text-center border border-white/[0.04]">
                        <div className={`text-xl font-black bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}>{h.metric}</div>
                        <div className="text-[10px] text-white/30 mt-0.5 leading-tight">{h.label}</div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-2">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-white/40 leading-relaxed flex gap-2.5">
                        <span className="text-purple-400 mt-0.5 shrink-0">▸</span>
                        <span className="group-hover:text-white/60 transition">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <span className="text-3xl">🎓</span>
              <div className="flex-1">
                <h3 className="font-bold text-white">Master&apos;s in Business Analytics &amp; Information Management</h3>
                <p className="text-sm grad-text font-semibold">Purdue University (West Lafayette), USA</p>
              </div>
              <span className="text-xs text-white/30 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap font-medium">Aug 2025 – Dec 2026</span>
            </motion.div>
          </div>
        </section>

        {/* ── PROJECTS (Bento Grid) ── */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest text-blue-400 uppercase mb-3">Portfolio</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
                What I&apos;ve <span className="grad-text-warm">Built</span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              {PROJECTS.map((p) => (
                <motion.div
                  key={p.name}
                  variants={fadeUp}
                  className={`glass rounded-2xl p-6 card-glow group ${p.span}`}
                  style={{ ["--glow" as string]: p.glow }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`text-lg font-bold bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent`}>
                      {p.name}
                    </h3>
                    <div className="flex gap-2 text-xs font-medium">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener" className="text-green-400/60 hover:text-green-400 transition">Live ↗</a>
                      )}
                      <a href={p.code} target="_blank" rel="noopener" className="text-white/30 hover:text-white/60 transition">Code ↗</a>
                    </div>
                  </div>
                  <p className="text-sm text-white/35 leading-relaxed mb-4 group-hover:text-white/55 transition">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] text-white/30 font-medium border border-white/[0.04]">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3">Expertise</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
                Tech <span className="grad-text">Stack</span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              {SKILLS.map((s) => (
                <motion.div key={s.cat} variants={fadeUp} className="glass rounded-2xl p-5 card-glow group">
                  <div className="text-sm font-bold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span style={{ color: s.color }}>{s.cat}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((item) => (
                      <span key={item} className="text-xs px-2.5 py-1.5 rounded-lg bg-white/[0.03] text-white/40 font-medium border border-white/[0.04] group-hover:text-white/60 group-hover:border-white/8 transition">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── OPEN SOURCE ── */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest text-green-400 uppercase mb-3">Contributions</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
                Open <span className="grad-text-warm">Source</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/30 mt-3">11 PRs merged to the AI infra I actually deploy with</motion.p>
            </motion.div>

            <motion.div className="grid md:grid-cols-3 gap-4" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              {OSS.map((o) => (
                <motion.a
                  key={o.repo}
                  variants={scaleIn}
                  href={`https://github.com/${o.repo}`}
                  target="_blank"
                  rel="noopener"
                  className="glass rounded-2xl p-6 card-glow block text-center group"
                >
                  <div className="text-5xl font-black mb-2" style={{ color: o.color }}>
                    <Counter value={o.count} />
                  </div>
                  <div className="text-xs text-white/30 font-medium">PR{o.count > 1 ? "s" : ""} to</div>
                  <div className="text-sm font-semibold text-white/60 mt-1 group-hover:text-white transition">{o.repo.split("/")[1]}</div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── ASK AI ── */}
        <section id="ask-ai" ref={chatRef} className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest text-pink-400 uppercase mb-3">AI-Powered</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
                Ask <span className="grad-text-rainbow">Anything</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/30 mt-3">Powered by Claude — every answer grounded in real work</motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/5"
            >
              <div className="border-b border-white/5 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-white/40">AI Portfolio Assistant</span>
                </div>
                <span className="text-[10px] text-white/20 bg-white/5 px-2.5 py-0.5 rounded-full font-medium">Claude</span>
              </div>

              <div className="h-[420px] overflow-y-auto p-5 space-y-4">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="text-5xl mb-4 animate-float">💬</div>
                    <p className="text-white/25 mb-6 text-sm">Pick a question or type your own</p>
                    <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                      {SUGGESTED.map((s) => (
                        <button
                          key={s.q}
                          onClick={() => ask(s.q)}
                          className="text-xs px-3.5 py-2 rounded-xl glass text-white/35 hover:text-white/70 hover:border-purple-500/30 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{s.icon}</span> {s.q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-sm shadow-lg shadow-purple-500/20"
                        : "glass text-white/70 rounded-bl-sm"
                    }`}>
                      <div className="whitespace-pre-wrap">{getMessageText(m)}</div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && messages.length > 0 && messages[messages.length - 1]?.role !== "assistant" && (
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                      <span className="typing-dot w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="typing-dot w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="typing-dot w-2 h-2 bg-cyan-400 rounded-full" />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <form onSubmit={submit} className="border-t border-white/5 p-4 flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my projects, skills, experience..."
                  className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 disabled:opacity-30 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                >
                  Send
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center relative overflow-hidden rounded-3xl p-12 md:p-16"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute top-0 left-[20%] w-64 h-64 rounded-full bg-pink-500/30 blur-3xl animate-float" />
            <div className="absolute bottom-0 right-[20%] w-48 h-48 rounded-full bg-cyan-400/30 blur-3xl animate-float-2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">Let&apos;s build something <br className="hidden sm:block" />together</h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto text-sm md:text-base">
                I want to sit with your customers, understand their problems, build the system, and ship it into production.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="mailto:mansianilpatil2425@gmail.com" className="px-7 py-3.5 rounded-2xl bg-white text-purple-600 font-bold text-sm hover:bg-white/90 transition shadow-xl hover:-translate-y-0.5">
                  Get in touch →
                </a>
                <a href="https://linkedin.com/in/mansipatil22" target="_blank" rel="noopener" className="px-7 py-3.5 rounded-2xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition border border-white/20 hover:-translate-y-0.5">
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="text-center py-10 border-t border-white/5 text-xs text-white/20">
          <p>Built with Next.js + Claude API + Framer Motion</p>
          <p className="mt-2">
            <a href="https://github.com/Mansi2221/ask-mansi" target="_blank" rel="noopener" className="hover:text-white/40 transition">View source ↗</a>
          </p>
        </footer>
      </main>
    </>
  );
}
