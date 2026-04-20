import React, { useMemo, useRef, useState } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router-dom";

const HomeInterview = () => {
  const { loading, generateReport, reports = [] } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const safeReports = useMemo(
    () => (Array.isArray(reports) ? reports : []),
    [reports],
  );

  const formatDate = (value) => {
    if (!value) return "Unknown date";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "Unknown date";
    return parsed.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const normalizeScore = (rawScore) => {
    if (!Number.isFinite(rawScore)) return 0;
    const candidate = rawScore <= 1 ? rawScore * 100 : rawScore;
    return Math.max(0, Math.min(100, Math.round(candidate)));
  };

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0];
    if (!resumeFile) {
      alert("Please upload your resume (PDF) first.");
      return;
    }

    const data = await generateReport({ jobDescription, selfDescription, resumeFile });
    if (data?._id) {
      navigate(`/interview/${data._id}`);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200 text-center">
          <div className="mx-auto mb-5 h-14 w-14 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
          <h1 className="text-2xl font-bold text-gray-800">
            Generating Report...
          </h1>
          <p className="mt-2 text-gray-600">
            Please wait while we prepare your interview insights.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 p-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="grid gap-6 rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-2xl backdrop-blur-lg md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Job Description</h2>
            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              name="jobDescription"
              placeholder="Paste job description here..."
              className="h-87.5 w-full resize-none rounded-2xl border border-gray-300 p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-gray-800">Candidate Details</h2>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-600">Upload Resume (PDF)</label>
              <input
                ref={resumeInputRef}
                type="file"
                name="resume"
                accept=".pdf"
                className="cursor-pointer rounded-xl border border-gray-300 p-2 file:cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-600">Self Description</label>
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                name="selfDescription"
                placeholder="Tell about yourself..."
                className="h-37.5 w-full resize-none rounded-2xl border border-gray-300 p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              onClick={handleGenerateReport}
              className="mt-4 cursor-pointer rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Generate Interview Report
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white/75 p-6 shadow-xl backdrop-blur-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Recent Reports</h2>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              {safeReports.length} total
            </span>
          </div>

          {safeReports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-600">
              No reports yet. Generate your first interview report.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {safeReports.map((reportItem) => {
                const score = normalizeScore(reportItem?.matchScore);
                const scoreTone =
                  score >= 80
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : score >= 60
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-rose-50 text-rose-700 border-rose-200";

                return (
                  <button
                    key={reportItem?._id}
                    type="button"
                    onClick={() => navigate(`/interview/${reportItem._id}`)}
                    className="rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h3 className="line-clamp-2 text-base font-semibold text-gray-800">
                      {reportItem?.title || "Untitled Position"}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500">
                      Generated on {formatDate(reportItem?.createdAt)}
                    </p>
                    <div className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${scoreTone}`}>
                      Match Score: {score}%
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default HomeInterview;
