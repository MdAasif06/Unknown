import React, { useRef, useState } from "react";
import { useInterview } from "../hooks/useInterview.js";
import {useNavigate} from "react-router-dom"
const HomeInterview = () => {
  const { loading, generateReport } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [preparationDays, setPreparationDays] = useState(7);
  const resumeInputRef = useRef();
  const navigate=useNavigate()


  const handleGenerateReport=async()=>{
    const resumeFile=resumeInputRef.current.files[0];
    const data=await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
      preparationDays,
    })
    navigate(`/interview/${data._id}`)
  }
  if (loading) {
    return (
      <main className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200 text-center">
          <div className="mx-auto mb-5 h-14 w-14 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
          <h1 className="text-2xl font-bold text-gray-800">Generating Report...</h1>
          <p className="mt-2 text-gray-600">Please wait while we prepare your interview insights.</p>
        </div>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6 bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-6 border border-gray-200">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Job Description</h2>

          <textarea
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
            name="jobDescription"
            placeholder="Paste job description here..."
            className="w-full h-[350px] p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-gray-700"
          ></textarea>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-gray-800">
            Candidate Details
          </h2>

          {/* Resume Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-medium">
              Upload Resume (PDF)
            </label>

            <input
              ref={resumeInputRef}
              type="file"
              name="resume"
              accept=".pdf"
              className="file:bg-indigo-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 file:cursor-pointer cursor-pointer border border-gray-300 rounded-xl p-2"
            />
          </div>

          {/* Self Description */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-medium">
              Self Description
            </label>

            <textarea
              onChange={(e) => {
                setSelfDescription(e.target.value);
              }}
              name="selfDescription"
              placeholder="Tell about yourself..."
              className="w-full h-[150px] p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-gray-700"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-medium">
              Minimum Preparation Days
            </label>
            <input
              type="number"
              min={7}
              max={60}
              step={1}
              value={preparationDays}
              onChange={(e) => {
                const nextValue = Number(e.target.value);
                setPreparationDays(Number.isNaN(nextValue) ? 7 : Math.max(7, nextValue));
              }}
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Button */}
          <button onClick={handleGenerateReport} className="cursor-pointer mt-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            Generate Interview Report
          </button>
        </div>
      </div>
    </main>
  );
};

export default HomeInterview;
