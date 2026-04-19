import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
  preparationDays = 7,
}) {
  const minPreparationDays = Math.max(7, Number(preparationDays) || 7);
  // 🔹 Strong prompt (force JSON output)
  const prompt = `
Generate an interview report.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
Minimum preparation days required by user: ${minPreparationDays}

STRICT RULES:
- Return ONLY valid JSON
- No explanation, no text
- No markdown
- preparationPlan must include at least ${minPreparationDays} day entries
- Every day must have practical and non-repeating tasks

FORMAT:
{
 "title": string,
 "matchScore": number,
 "technicalQuestions": [
   { "question": string, "intention": string, "answer": string }
 ],
 "behavioralQuestions": [
   { "question": string, "intention": string, "answer": string }
 ],
 "skillGaps": [
   { "skill": string, "severity": "low" | "medium" | "high" }
 ],
 "preparationPlan": [
   { "day": number, "focus": string, "tasks": string[] }
 ]
}
`;

  // 🔹 API call
  const res = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are an AI interview preparation assistant.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.3, // 🔹 stable output
  });

  // 🔹 get raw text
  const text = res?.choices?.[0]?.message?.content || "";
  // console.log("RAW 👉", text);

  // 🔹 remove markdown if present
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // console.log("CLEANED 👉", cleaned);

  // 🔹 extract JSON part only (important fix)
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    console.log(" No JSON found");
    return null;
  }

  let parsed;

  // 🔹 safe JSON parse
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error(" JSON Parse Error:", err);
    return null;
  }

  // 🔹 validate using Zod
  const validated = interviewReportSchema.safeParse(parsed);

  if (!validated.success) {
    console.log("Schema error:", validated.error.format());
    return null;
  }

  const data = validated.data;
  const plan = Array.isArray(data.preparationPlan) ? data.preparationPlan : [];

  if (plan.length < minPreparationDays) {
    const fallbackPlan = [...plan];
    const lastFocus =
      fallbackPlan[fallbackPlan.length - 1]?.focus || "Revision and mock interview";

    for (let day = fallbackPlan.length + 1; day <= minPreparationDays; day += 1) {
      fallbackPlan.push({
        day,
        focus: `${lastFocus} - Day ${day}`,
        tasks: [
          "Revise core role-specific concepts and notes",
          "Practice 5 technical and 3 behavioral questions",
          "Run one timed mock interview and review weak points",
        ],
      });
    }

    data.preparationPlan = fallbackPlan;
  }

  // 🔹 final valid data
  return data;
}

export default generateInterviewReport;
