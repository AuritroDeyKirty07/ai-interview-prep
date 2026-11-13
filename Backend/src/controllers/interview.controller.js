
const { PDFParse } = require("pdf-parse");

const generateInterviewReport = require("../services/ai.service.js");
const interviewReportModel = require("../models/interviewReport.model.js");

/**
 * @description Generate interview report using resume,
 * self description and job description.
 */
async function generateInterviewReportController(req, res) {
    let parser;

    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF resume."
            });
        }

        const { selfDescription, jobDescription } = req.body;

        if (!selfDescription?.trim() || !jobDescription?.trim()) {
            return res.status(400).json({
                message: "Self description and job description are required."
            });
        }

        // Parse uploaded PDF
        parser = new PDFParse({
            data: req.file.buffer
        });

        const resumeContent = await parser.getText();
        const resumeText = resumeContent.text;

        if (!resumeText?.trim()) {
            return res.status(400).json({
                message: "Could not extract text from PDF."
            });
        }

        // Generate AI report
        const aiReport = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        // Convert skill strings into arrays for MongoDB schema
        const skillGaps = (aiReport.skillGaps || []).map(item => ({
            skill: Array.isArray(item.skill) ? item.skill : [item.skill],
            severity: item.severity
        }));

        // Save report
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            jobDescription,
            resume: resumeText,
            resumeFile: req.file.buffer,
resumeFileName: req.file.originalname,
resumeMimeType: req.file.mimetype,
            selfDescription,
            title: aiReport.title,
            matchScore: aiReport.matchScore,
            technicalQuestions: aiReport.technicalQuestions,
            behaviouralQuestions: aiReport.behavioralQuestions,
            skillGaps,
            preparationPlan: aiReport.preparationPlan
        });

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        console.error("Error generating interview report:", error);

        return res.status(500).json({
            message: "Failed to generate interview report.",
            error: error.message
        });

    } finally {
        if (parser) {
            await parser.destroy().catch(console.error);
        }
    }
}   


/**
 * @description Get interview report by ID.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        return res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        });

    } catch (error) {
        console.error("Error fetching interview report:", error);

        return res.status(500).json({
            message: "Failed to fetch interview report.",
            error: error.message
        });
    }
}


/**
 * @description Get all interview reports of logged-in user.
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select(
                "-resume -selfDescription -jobDescription -__v"
            );

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        });

    } catch (error) {
        console.error("Error fetching all reports:", error);

        return res.status(500).json({
            message: "Failed to fetch interview reports.",
            error: error.message
        });
    }
}

async function downloadResumeController(req, res) {
    try {
        const { interviewId } = req.params;

        const report = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        }).select("+resumeFile");

        if (!report || !report.resumeFile) {
            return res.status(404).json({
                message: "Original resume PDF not found."
            });
        }

        res.setHeader(
            "Content-Type",
            report.resumeMimeType || "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${encodeURIComponent(
                report.resumeFileName || "resume.pdf"
            )}"`
        );

        return res.send(report.resumeFile);

    } catch (error) {
        console.error("Resume download error:", error);

        return res.status(500).json({
            message: "Failed to download resume.",
            error: error.message
        });
    }
}


module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    downloadResumeController
};
