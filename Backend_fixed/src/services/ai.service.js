const {sampleInterviewReport, skillGaps, preparationPlan} = require ("./test.js")

const { GoogleGenAI } = require("@google/genai")
const {z} = require ("zod")
const {zodToJsonSchema} = require ("zod-to-json-schema")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
});


const interviewReportSchema= z.object({

    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of inteviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of inteviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, i.e., how important is this skill for the job")
    })).describe("List of skill gaps in the candidate's profile along with their severity."),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number int the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in preparation plan, eg. data structures, system design, mock interviews."),
        tasks: z.array(z.string()).describe("List of tasks to be doneon this day to follow the preparation plan, eg. read a specific book or")
    })).describe("A day wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated")
})
async function generateInterviewReport(sampleInterviewReport){

    const prompt = `Generate an interview report for a candidate with the following details:
    Resume: ${sampleInterviewReport.resume}
    Self Description: ${sampleInterviewReport.selfDescription}
    Job Description: ${sampleInterviewReport.jobDescription}
    
    CRITICAL INSTRUCTION:
    You MUST return ONLY a raw JSON object with EXACTLY the following structure. Do NOT include extra fields (like candidateName). Do NOT wrap in markdown.
    {
      "title": "<string>",
      "matchScore": <number from 0 to 100>,
      "technicalQuestions": [{"question": "<string>", "intention": "<string>", "answer": "<string>"}],
      "behavioralQuestions": [{"question": "<string>", "intention": "<string>", "answer": "<string>"}],
      "skillGaps": [{"skill": "<string>", "severity": "<low | medium | high>"}],
      "preparationPlan": [{"day": <number>, "focus": "<string>", "tasks": ["<string>"]}]
    }`;


const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

async function generateWithRetry(ai, params, maxRetries = 3) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await ai.models.generateContent(params);
        } catch (error) {
            const status = error.status || error.code;

            const retryable = [429, 500, 502, 503, 504].includes(
                Number(status)
            );

            if (!retryable || attempt === maxRetries) {
                throw error;
            }

            const delay = 1000 * Math.pow(2, attempt);

            console.log(
                `Gemini API temporary error. Retrying in ${delay}ms...`
            );

            await sleep(delay);
        }
    }
}

    const response = await generateWithRetry(ai, {
    model: "gemini-3.6-flash",
    contents: prompt
});

    const report = JSON.parse(response.text);
    // console.log(JSON.stringify(report, null, 2));
    return report;
}

module.exports = generateInterviewReport