import React, { useState } from "react";
import { useInterview } from "../hooks/useInterview.js";

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const { report, loading } = useInterview();

  if (loading || !report) {
    return (
      <main className="min-h-screen bg-[#070d1b] p-6 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6">
          <h1 className="text-xl font-bold">Loading your interview report...</h1>
        </div>
      </main>
    );
  }

  const {
    matchScore,
    title,
    technicalQuestions = [],
    behavioralQuestions = [],
    skillGaps = [],
    preparationPlan = [],
  } = report;

  const tabs = [
    { key: "technical", label: "Technical" },
    { key: "behavioral", label: "Behavioral" },
    { key: "roadmap", label: "Preparation" },
  ];

  const severityStyles = {
    low: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
    medium: "border-amber-400/40 bg-amber-500/15 text-amber-200",
    high: "border-rose-400/40 bg-rose-500/15 text-rose-200",
  };

  const normalizedScore = Number.isFinite(matchScore)
    ? matchScore <= 1
      ? matchScore * 100
      : matchScore
    : 0;
  const score = Math.max(0, Math.min(100, Math.round(normalizedScore)));

  const renderEmptyState = (message) => (
    <div className="rounded-2xl border border-slate-700/70 bg-slate-800/60 p-5 text-sm text-slate-300">
      {message}
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070d1b] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(45,212,191,0.15),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.2),transparent_30%),radial-gradient(circle_at_90%_70%,rgba(232,121,249,0.14),transparent_26%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl gap-4 px-4 py-5 md:px-6 lg:grid-cols-[230px_minmax(0,1fr)_260px]">
        <aside className="h-fit rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 shadow-2xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Sections
          </p>

          <div className="mt-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-linear-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                    : "bg-slate-800/60 text-slate-200 hover:bg-slate-700/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Candidate Snapshot
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {title || "Interview report"}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {technicalQuestions.length} technical and {behavioralQuestions.length} behavioral interview prompts.
            </p>
          </div>
        </aside>

        <main className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-4 shadow-xl backdrop-blur sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black tracking-tight">
              {activeTab === "technical" && "Technical Interview Prep"}
              {activeTab === "behavioral" && "Behavioral Interview Prep"}
              {activeTab === "roadmap" && "Preparation Plan"}
            </h2>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
              Match score {score}%
            </span>
          </div>

          {activeTab === "technical" && (
            <div className="space-y-4">
              {technicalQuestions.length === 0
                ? renderEmptyState("No technical questions were generated for this report.")
                : technicalQuestions.map((q, i) => (
                    <article
                      key={i}
                      className="group rounded-2xl border border-slate-700/70 bg-linear-to-br from-slate-800/90 to-slate-900/90 p-5 transition hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                      <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-xs font-bold text-cyan-300">
                        Q{i + 1}
                      </span>
                      <h4 className="mt-3 text-base font-semibold leading-7 text-slate-100">
                        {q.question}
                      </h4>
                      <p className="mt-3 text-sm text-slate-300">
                        <span className="font-semibold text-cyan-300">Intention:</span> {q.intention}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        <span className="font-semibold text-emerald-300">Answer:</span> {q.answer}
                      </p>
                    </article>
                  ))}
            </div>
          )}

          {activeTab === "behavioral" && (
            <div className="space-y-4">
              {behavioralQuestions.length === 0
                ? renderEmptyState("No behavioral questions were generated for this report.")
                : behavioralQuestions.map((q, i) => (
                    <article
                      key={i}
                      className="group rounded-2xl border border-slate-700/70 bg-linear-to-br from-slate-800/90 to-slate-900/90 p-5 transition hover:border-fuchsia-400/40 hover:shadow-lg hover:shadow-fuchsia-500/10"
                    >
                      <span className="rounded-md bg-fuchsia-500/15 px-2 py-0.5 text-xs font-bold text-fuchsia-300">
                        Q{i + 1}
                      </span>
                      <h4 className="mt-3 text-base font-semibold leading-7 text-slate-100">
                        {q.question}
                      </h4>
                      <p className="mt-3 text-sm text-slate-300">
                        <span className="font-semibold text-fuchsia-300">Intention:</span> {q.intention}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        <span className="font-semibold text-emerald-300">Answer:</span> {q.answer}
                      </p>
                    </article>
                  ))}
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="space-y-4">
              {preparationPlan.length === 0
                ? renderEmptyState("No preparation plan was generated for this report.")
                : preparationPlan.map((day, i) => (
                    <article
                      key={i}
                      className="rounded-2xl border border-slate-700/70 bg-linear-to-br from-slate-800/90 to-slate-900/90 p-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-8 w-8 place-content-center rounded-full bg-linear-to-r from-cyan-500 to-teal-500 text-xs font-bold text-slate-900">
                          {day.day}
                        </div>
                        <h4 className="text-base font-bold text-slate-100">
                          {day.focus}
                        </h4>
                      </div>
                      <ul className="mt-4 space-y-2 pl-11 text-sm text-slate-300">
                        {(day.tasks || []).map((task, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-cyan-300">✓</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
            </div>
          )}
        </main>

        <aside className="h-fit rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 shadow-2xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Match Score
          </p>
          <div className="mt-4 flex items-center justify-center">
            <div
              className="grid h-28 w-28 place-content-center rounded-full"
              style={{
                background: `conic-gradient(#2dd4bf ${score * 3.6}deg, #1e293b ${score * 3.6}deg 360deg)`,
              }}
            >
              <div className="grid h-20 w-20 place-content-center rounded-full bg-slate-950 text-center">
                <p className="text-2xl font-black text-white">{score}</p>
                <p className="text-[10px] font-semibold tracking-wider text-slate-400">
                  PERCENT
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-emerald-300">
            Strong fit for this role
          </p>

          <div className="mt-6 border-t border-slate-700 pt-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-400">
              Skill Gaps
            </h3>
            <div className="mt-3 space-y-2">
              {skillGaps.length === 0
                ? renderEmptyState("No skill gaps were returned for this report.")
                : skillGaps.map((s, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold ${severityStyles[s.severity] || "border-slate-600 bg-slate-700/40 text-slate-200"}`}
                    >
                      {s.skill}
                    </div>
                  ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
