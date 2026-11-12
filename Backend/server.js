const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require("dotenv").config()

const connectToDB = require("./src/config/database.js")
const app = require ("./src/app")
const { connect } = require("mongoose")
const generateInterviewReport = require("./src/services/ai.service.js")
const interviewReportModel = require("./src/services/test.js")

connectToDB()
// generateInterviewReport(interviewReportModel)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})