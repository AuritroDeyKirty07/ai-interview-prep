
import { useContext } from "react";
import {
    getAllInterviewReports,
    getInterviewReportById,
    generateInterviewReport,
    getResumePdf as fetchResumePdf
} from "../services/interview.api";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports,
    } = context;

    const generateReport = async (formData) => {
        try {
            setLoading(true);

            const data = await generateInterviewReport(formData);

            setReport(data.interviewReport || data);

            return data.interviewReport || data;
        } catch (error) {
            console.error("GENERATE REPORT FAILED");
            console.error("Status:", error.response?.status);
            console.error("Backend response:", error.response?.data);
            console.error("Full error:", error);

            throw error;
        } finally {
            setLoading(false);
        }
    };



    const getReportById = async (interviewId) => {
        try {
            setLoading(true);

            const data = await getInterviewReportById(interviewId);

            setReport(data.interviewReport || data);

            return data.interviewReport || data;
        } catch (error) {
            console.error("Get report error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getAllReports = async () => {
        try {
            setLoading(true);

            const data = await getAllInterviewReports();

            setReports(data.interviewReports || []);

            return data.interviewReports || [];
        } catch (error) {
            console.error("Get all reports error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const downloadResume = async (interviewId) => {
    try {
        const blob = await fetchResumePdf(interviewId);

        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = downloadUrl;
        link.download = "resume.pdf";

        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
        console.error("Resume download failed:", error);
        throw error;
    }
};

    return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getAllReports,
    getResumePdf: downloadResume
};
};
