const express = require("express")
const authMiddleware = require("../middleware/auth.middleware.js")
const interviewController = require("../controllers/interview.controller.js")
const upload = require("../middleware/file.middleware.js")


const interviewRouter = express.Router()


/**
 * @route POST /api/interview
 * @description Generate new interview on the basis of user self description, resume PDF and job description
 * @access Private
 */

interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)



/**
 * @route GET /api/report/interview:interviewId
 * @description Get interview report by interviewId
 * @access Private
 */

interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET api/interview/
 * @description Get all interview reports of logged in user
 * @access Private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)

module.exports = interviewRouter