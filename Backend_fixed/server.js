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


const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});