"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";

const SUGGESTED_QUESTIONS = [
  "What production AI systems has Mansi built?",
  "Tell me about her RAG and multi-agent experience",
  "What open source contributions has she made?",
  "Why should we hire Mansi as an FDE?",
  "What's her tech stack?",
  "Show me her most complex project",
];

const PROJECTS = [
  {
    name: "Forge",
    desc: "AI Agent Evaluation & Orchestration",
    tags: ["FastAPI", "Claude", "LangGraph", "Next.js"],
    live: "https://web-lyart-gamma-37.vercel.app",
    code: "https://github.com/Mansi2221/forge",
  },
  {
    name: "DeployKit",
    desc: "Production Readiness Scanner",
    tags: ["Python", "CLI", "Next.js", "52 tests"],
    live: "https://deploykit.vercel.app",
    code: "https://github.com/Mansi2221/deploykit",
  },
  {
    name: "Eligible",
    desc: "Clinical Trial Matching",
    tags: ["LangGraph", "dbt", "FHIR", "FastAPI"],
    code: "https://github.com/Mansi2221/eligible",
  },
  {
    name: "TalentRAG",
    desc: "Hybrid RAG for Recruiting",
    tags: ["FAISS", "FastAPI", "Streamlit"],
    code: "https://github.com/Mansi2221/talent-rag",
  },
  {
    name: "Clarify",
    desc: "AI Business Analyst Agent",
    tags: ["Next.js 16", "Vercel AI SDK"],
    live: "https://clarify-alpha.vercel.app",
    code: "https://github.com/Mansi2221/clarify",
  },
  {
    name: "TravelMind",
    desc: "Real-time Travel Agent",
    tags: ["Groq", "Tavily", "Tool Calling"],
    live: "https://travelmind-ten.vercel.app",
    code: "https://github.com/Mansi2221/travelmind",
  },
];

const STATS = [
  { label: "Projects", value: "8" },
  { label: "Open Source PRs", value: "11" },
  { label: "Live Demos", value: "5" },
  { label: "Tests Written", value: "120+" },
];

function getMessageText(message: { parts: Array<{ type: string; text?: string }> }): string {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export default function Home() {
  const { messages, sendMessage, status } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function askQuestion(q: string) {
    setShowChat(true);
    sendMessage({ text: q });
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    setShowChat(true);
    sendMessage({ text: inputValue });
    setInputValue("");
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-[var(--card-border)] sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
              MP
            </div>
            <div>
              <h1 className="text-base font-semibold">Mansi Patil</h1>
              <p className="text-xs text-[var(--muted)]">
                Forward Deployed Engineer
              </p>
            </div>
          </div>
          <div className="flex gap-3 text-sm">
            <a
              href="https://github.com/Mansi2221"
              target="_blank"
              rel="noopener"
              className="text-[var(--muted)] hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/mansipatil22"
              target="_blank"
              rel="noopener"
              className="text-[var(--muted)] hover:text-white transition"
            >
              LinkedIn
            </a>
            <a
              href="mailto:mansianilpatil2425@gmail.com"
              className="text-[var(--muted)] hover:text-white transition"
            >
              Email
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <p className="text-[var(--accent)] text-sm font-medium mb-2 tracking-wide uppercase">
            Interactive AI Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Ask me anything about
            <br />
            <span className="text-[var(--accent)]">my engineering work</span>
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
            Powered by Claude. Every answer grounded in real projects, real
            code, and real contributions.
          </p>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-[var(--accent)]">
                {s.value}
              </div>
              <div className="text-sm text-[var(--muted)]">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl overflow-hidden">
            <div className="border-b border-[var(--card-border)] px-5 py-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-[var(--muted)]">
                AI assistant — grounded in real work
              </span>
            </div>

            <div className="h-[400px] overflow-y-auto p-5 space-y-4">
              {!showChat && messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center">
                  <p className="text-[var(--muted)] mb-6 text-center">
                    Ask a question or pick one below
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => askQuestion(q)}
                        className="text-sm px-3 py-1.5 rounded-full border border-[var(--card-border)] text-[var(--muted)] hover:text-white hover:border-[var(--accent)] transition cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`animate-fade-in flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--input-bg)] text-[var(--foreground)]"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {getMessageText(m)}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading &&
                messages.length > 0 &&
                messages[messages.length - 1]?.role !== "assistant" && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-[var(--input-bg)] rounded-lg px-4 py-3 flex gap-1">
                      <span className="typing-dot w-2 h-2 bg-[var(--muted)] rounded-full inline-block"></span>
                      <span className="typing-dot w-2 h-2 bg-[var(--muted)] rounded-full inline-block"></span>
                      <span className="typing-dot w-2 h-2 bg-[var(--muted)] rounded-full inline-block"></span>
                    </div>
                  </div>
                )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="border-t border-[var(--card-border)] p-4 flex gap-3"
            >
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about my projects, skills, experience..."
                className="flex-1 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-[var(--accent)] hover:bg-blue-600 disabled:opacity-40 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer disabled:cursor-not-allowed"
              >
                Ask
              </button>
            </form>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-5 hover:border-[var(--accent)]/50 transition group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold group-hover:text-[var(--accent)] transition">
                    {p.name}
                  </h4>
                  <div className="flex gap-2 text-xs text-[var(--muted)]">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener"
                        className="hover:text-[var(--accent)]"
                      >
                        Live
                      </a>
                    )}
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noopener"
                      className="hover:text-[var(--accent)]"
                    >
                      Code
                    </a>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)] mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">
            Open Source — 11 PRs across 3 repos
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { repo: "anthropics/anthropic-cookbook", count: 7 },
              { repo: "run-llama/llama_index", count: 3 },
              { repo: "microsoft/agent-governance-toolkit", count: 1 },
            ].map((r) => (
              <div
                key={r.repo}
                className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-4"
              >
                <a
                  href={`https://github.com/${r.repo}`}
                  target="_blank"
                  rel="noopener"
                  className="text-sm font-medium hover:text-[var(--accent)] transition"
                >
                  {r.repo}
                </a>
                <p className="text-2xl font-bold text-[var(--accent)] mt-1">
                  {r.count} PR{r.count > 1 ? "s" : ""}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center py-8 border-t border-[var(--card-border)] text-sm text-[var(--muted)]">
          <p>
            Built with Next.js + Claude API — every answer grounded in real
            work.
          </p>
          <p className="mt-1">
            <a
              href="https://github.com/Mansi2221/ask-mansi"
              target="_blank"
              rel="noopener"
              className="hover:text-[var(--accent)] transition"
            >
              View source
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
