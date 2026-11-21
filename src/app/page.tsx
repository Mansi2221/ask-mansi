"use client";

import { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const SUGGESTED = [
  { q: "What production AI systems has she built?", icon: "🔧" },
  { q: "Tell me about her RAG and multi-agent experience", icon: "🤖" },
  { q: "What open source contributions has she made?", icon: "🌍" },
  { q: "Why should we hire Mansi as an FDE?", icon: "💡" },
  { q: "What's her tech stack?", icon: "⚡" },
  { q: "Show me her most complex project", icon: "🏗️" },
];

const PROJECTS = [
  {
    name: "Forge",
    desc: "AI Agent Evaluation & Orchestration Platform — multi-agent workflows, RAG, LLM eval, guardrails, cost tracking",
    tags: ["FastAPI", "Claude API", "LangGraph", "Next.js", "Docker"],
    live: "https://web-lyart-gamma-37.vercel.app",
    code: "https://github.com/Mansi2221/forge",
    color: "#6366f1",
    emoji: "🛡️",
  },
  {
    name: "DeployKit",
    desc: "Production readiness scanner — paste a repo URL, get instant deploy/no-deploy verdict across 6 categories",
    tags: ["Python", "Click", "Rich", "Next.js", "52 tests"],
    live: "https://deploykit.vercel.app",
    code: "https://github.com/Mansi2221/deploykit",
    color: "#10b981",
    emoji: "📊",
  },
  {
    name: "Eligible",
    desc: "Clinical trial matching — OMOP harmonization, agentic matching with LangGraph, PHI redaction, FHIR output",
    tags: ["LangGraph", "dbt", "FHIR", "FastAPI", "Next.js"],
    code: "https://github.com/Mansi2221/eligible",
    color: "#f59e0b",
    emoji: "🏥",
  },
  {
    name: "TalentRAG",
    desc: "Hybrid retrieval (sparse + dense), cross-encoder reranking, LLM judge evaluation suite",
    tags: ["FAISS", "FastAPI", "Streamlit", "Docker"],
    code: "https://github.com/Mansi2221/talent-rag",
    color: "#ec4899",
    emoji: "🎯",
  },
  {
    name: "Clarify",
    desc: "AI Business Analyst — brief in, full deliverable pack out: requirements, RTM, test cases, RACI",
    tags: ["Next.js 16", "Vercel AI SDK", "React 19"],
    live: "https://clarify-alpha.vercel.app",
    code: "https://github.com/Mansi2221/clarify",
    color: "#f97316",
    emoji: "📋",
  },
  {
    name: "TravelMind",
    desc: "5 parallel tool calls, real-time web search, structured travel briefings in under 10 seconds",
    tags: ["Groq", "Tavily", "Next.js", "Vercel"],
    live: "https://travelmind-ten.vercel.app",
    code: "https://github.com/Mansi2221/travelmind",
    color: "#14b8a6",
    emoji: "✈️",
  },
];

const STATS = [
  { label: "Live Projects", value: 8, suffix: "", icon: "🚀" },
  { label: "Open Source PRs", value: 11, suffix: "", icon: "🔀" },
  { label: "Live Demos", value: 5, suffix: "", icon: "🌐" },
  { label: "Tests Written", value: 120, suffix: "+", icon: "✅" },
];

const OSS = [
  { repo: "anthropics/anthropic-cookbook", count: 7, desc: "Bug fixes in financial models, eval prompts, session browser" },
  { repo: "run-llama/llama_index", count: 3, desc: "Triplet parser fix, Colab badges, OpenAILike docs" },
  { repo: "microsoft/agent-governance-toolkit", count: 1, desc: "PII false positive reduction in MCP Security Gateway" },
];

function getMessageText(message: { parts: Array<{ type: string; text?: string }> }): string {
  return message.parts.filter((p) => p.type === "text").map((p) => p.text ?? "").join("");
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const { messages, sendMessage, status } = useChat();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function askQuestion(q: string) {
    sendMessage({ text: q });
    chatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage({ text: inputValue });
    setInputValue("");
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gradient-1)] to-[var(--gradient-2)] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              MP
            </div>
            <span className="font-semibold text-sm">Mansi Patil</span>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <a href="#projects" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition font-medium">Projects</a>
            <a href="#chat" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition font-medium">Ask AI</a>
            <a href="#oss" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition font-medium">Open Source</a>
            <a href="https://github.com/Mansi2221" target="_blank" rel="noopener" className="text-[var(--text-secondary)] hover:text-[var(--text)] transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/mansipatil22" target="_blank" rel="noopener" className="text-[var(--text-secondary)] hover:text-[var(--text)] transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-bg pt-28 pb-20 px-6 relative">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-32 right-[15%] w-56 h-56 bg-purple-200/20 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute bottom-10 left-[40%] w-40 h-40 bg-pink-200/20 rounded-full blur-3xl animate-float-delay-2"></div>

        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent)] text-sm font-medium border border-[var(--accent-border)]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-ring"></span>
              Open to FDE roles
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Hi, I&apos;m <span className="gradient-text">Mansi</span>
            <br />
            <span className="text-3xl md:text-4xl font-medium text-[var(--text-secondary)]">
              I take AI from prototype to production
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Forward Deployed Engineer @ IBM. I build multi-agent systems, RAG pipelines,
            and guardrail engines — then deploy them into real customer environments.
            <br />
            <strong className="text-[var(--text)]">MS Business Analytics, Purdue &apos;26</strong>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <a
              href="#chat"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              💬 Ask My AI Portfolio
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[var(--border)] text-[var(--text)] font-medium shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              View Projects →
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-6 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="bg-white rounded-xl p-5 text-center shadow-sm border border-[var(--border)] hover:shadow-md transition"
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-3xl font-bold text-[var(--text)]">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-[var(--text-secondary)] mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Chat */}
      <section id="chat" ref={chatRef} className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-8"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-2">
              Ask <span className="gradient-text">anything</span> about my work
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-secondary)]">
              Powered by Claude — every answer grounded in real code and real contributions
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-[var(--border)] shadow-lg overflow-hidden"
          >
            <div className="border-b border-[var(--border)] px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <span className="text-sm font-medium text-[var(--text-secondary)]">AI Portfolio Assistant</span>
              </div>
              <span className="text-xs text-[var(--text-secondary)] bg-[var(--tag-bg)] px-2 py-0.5 rounded-full">Claude</span>
            </div>

            <div className="h-[420px] overflow-y-auto p-5 space-y-4 bg-[var(--bg-chat)]">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-[var(--text-secondary)] mb-6 text-center text-sm">
                    Pick a question or type your own
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                    {SUGGESTED.map((s) => (
                      <button
                        key={s.q}
                        onClick={() => askQuestion(s.q)}
                        className="text-sm px-3.5 py-2 rounded-xl bg-white border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)] transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white rounded-br-sm"
                      : "bg-white text-[var(--text)] border border-[var(--border)] rounded-bl-sm"
                  }`}>
                    <div className="whitespace-pre-wrap">{getMessageText(m)}</div>
                  </div>
                </motion.div>
              ))}

              {isLoading && messages.length > 0 && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 border border-[var(--border)] shadow-sm flex gap-1.5">
                    <span className="typing-dot w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                    <span className="typing-dot w-2 h-2 bg-[var(--accent-light)] rounded-full"></span>
                    <span className="typing-dot w-2 h-2 bg-purple-300 rounded-full"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleFormSubmit} className="border-t border-[var(--border)] p-4 flex gap-3 bg-white">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about my projects, skills, experience..."
                className="flex-1 bg-[var(--bg-chat)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)] transition"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] hover:opacity-90 disabled:opacity-40 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer disabled:cursor-not-allowed shadow-sm"
              >
                Send
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-20 bg-gradient-to-b from-white to-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-2">
              What I&apos;ve <span className="gradient-text">Built</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-secondary)]">
              End-to-end — from data layer to UI to deployment
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {PROJECTS.map((p) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{p.emoji}</span>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                  </div>
                  <div className="flex gap-2 text-xs font-medium">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener" className="text-green-600 hover:underline">Live ↗</a>
                    )}
                    <a href={p.code} target="_blank" rel="noopener" className="text-[var(--text-secondary)] hover:underline">Code ↗</a>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[var(--tag-bg)] text-[var(--tag-text)] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="h-1 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Source */}
      <section id="oss" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-2">
              Open <span className="gradient-text">Source</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-secondary)]">
              11 PRs to the AI infrastructure I actually deploy with
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {OSS.map((o) => (
              <motion.a
                key={o.repo}
                variants={fadeUp}
                href={`https://github.com/${o.repo}`}
                target="_blank"
                rel="noopener"
                whileHover={{ y: -4 }}
                className="block bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-sm font-medium text-[var(--accent)] mb-1">{o.repo}</div>
                <div className="text-4xl font-bold mb-2">{o.count} <span className="text-lg font-normal text-[var(--text-secondary)]">PR{o.count > 1 ? "s" : ""}</span></div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{o.desc}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-20 bg-gradient-to-b from-[var(--bg)] to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-8 text-center">
              Tech <span className="gradient-text">Stack</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { cat: "AI / ML", items: "Claude API · LangGraph · LangChain · Vercel AI SDK · FAISS · HuggingFace" },
                { cat: "Backend", items: "FastAPI · Node.js · Supabase · PostgreSQL · Redis" },
                { cat: "Frontend", items: "Next.js · React · Tailwind CSS · shadcn/ui" },
                { cat: "Languages", items: "Python · TypeScript · SQL" },
                { cat: "Infra", items: "Docker · Vercel · AWS · GitHub Actions" },
                { cat: "Specialization", items: "Multi-agent · RAG · Guardrails · LLM Eval · Production AI" },
              ].map((s) => (
                <div key={s.cat} className="bg-white rounded-xl p-5 border border-[var(--border)] shadow-sm">
                  <div className="text-sm font-semibold text-[var(--accent)] mb-2">{s.cat}</div>
                  <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.items}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-r from-[var(--gradient-1)] via-[var(--gradient-2)] to-[var(--gradient-3)] rounded-3xl p-12 text-white shadow-xl animate-gradient"
        >
          <h2 className="text-3xl font-bold mb-3">Let&apos;s build something together</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            I want to sit with your customers, understand their problems, build the system, and ship it into their environment.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:mansianilpatil2425@gmail.com" className="px-6 py-3 rounded-xl bg-white text-[var(--accent)] font-medium hover:bg-white/90 transition shadow-lg">
              Get in touch →
            </a>
            <a href="https://linkedin.com/in/mansipatil22" target="_blank" rel="noopener" className="px-6 py-3 rounded-xl bg-white/15 text-white font-medium hover:bg-white/25 transition border border-white/20">
              LinkedIn
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-[var(--border)] text-sm text-[var(--text-secondary)]">
        <p>Built with Next.js + Claude API + Framer Motion</p>
        <p className="mt-1">
          <a href="https://github.com/Mansi2221/ask-mansi" target="_blank" rel="noopener" className="hover:text-[var(--accent)] transition">
            View source ↗
          </a>
        </p>
      </footer>
    </main>
  );
}
