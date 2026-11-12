const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service.js")
const interviewReportModel = require("../models/interviewReport.model.js")




/**
 * @description Controller to generate interview report based on user self description, resume and job description
 */




async function generateInterviewReportController(req, res){
    const resumeFile = req.file

    
    try {
        const resumeContent = await(new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const {selfDescription, jobDescription} = req.body;
        
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });
        
        const interViewReport = await interviewReportModel.create({
            user: req.user.id, 
            jobDescription,
            resume: resumeContent.text,
            selfDescription,
            title: interviewReportByAi.title,
            matchScore: interviewReportByAi.matchScore,
            technicalQuestions: interviewReportByAi.technicalQuestions,
            behaviouralQuestions: interviewReportByAi.behavioralQuestions, 
            skillGaps: interviewReportByAi.skillGaps,
            preparationPlan: interviewReportByAi.preparationPlan
        });

        return res.status(200).json(interViewReport);
    } catch (error) {
        console.error("Error generating report:", error);
        return res.status(500).json({ message: "Failed to generate interview report", error: error.message });
    }
}




async function getInterviewReportByIdController(req, res){
    const {interviewId} = req.params
    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found."
        })
    }
    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}



/**
 * @description Controller to get all interview reports of logged in user.
 */

async function getAllInterviewReportsController(req, res){
    try {
        const interviewReports = await interviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationPlan")
        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (error) {
        console.error("Error fetching all reports:", error);
        res.status(500).json({ message: "Failed to fetch interview reports", error: error.message });
    }
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController }