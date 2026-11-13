
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import "../style/home.scss";
import AppHeader from "../components/AppHeader";

const Home = () => {
    const navigate = useNavigate();
    const { generateReport, loading } = useInterview();

    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [error, setError] = useState("");

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0];

        setError("");

        if (!file) {
            setResumeFile(null);
            return;
        }

        if (file.type !== "application/pdf") {
            setError("Please upload a valid PDF resume.");
            e.target.value = "";
            setResumeFile(null);
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            setError("Resume size must be less than 3 MB.");
            e.target.value = "";
            setResumeFile(null);
            return;
        }

        setResumeFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!resumeFile) {
            setError("Please upload your resume first.");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please enter the job description.");
            return;
        }

        if (!selfDescription.trim()) {
            setError("Please enter your self description.");
            return;
        }

        try {
            const generatedReport = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile,
            });

            if (generatedReport?._id) {
                navigate(`/interview/${generatedReport._id}`);
            } else {
                setError("Report generated, but report ID was not returned.");
            }
        } catch (err) {
            console.error(err);

            if (!err.response) {
                setError(
                    "Cannot connect to the backend. Please ensure your server is running."
                );
            } else {
                setError(
                    err.response.data?.message ||
                    "Failed to generate interview report."
                );
            }
        }
    };

    return (
        <div className="new-interview-page">
            <AppHeader active="new" />
            <main className="home">
            <div className="interview-container">

                <div className="header">
                    <h1>AI Interview Prep</h1>
                    <p>
                        Generate a customized preparation plan based on
                        your resume and the job description.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="interview-input-group">

                        <div className="left">
                            <div className="input-group full-height">
                                <label htmlFor="jobDescription">
                                    Job Description
                                </label>

                                <textarea
                                    id="jobDescription"
                                    placeholder="Paste the complete job description here..."
                                    value={jobDescription}
                                    onChange={(e) =>
                                        setJobDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="right">

                            <div className="input-group">
                                <label htmlFor="resume">
                                    Upload Resume (PDF)
                                </label>

                                <label
                                    className="file-label"
                                    htmlFor="resume"
                                >
                                    {resumeFile
                                        ? resumeFile.name
                                        : "Choose Resume (PDF only)"}
                                </label>

                                <input
                                    hidden
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    accept="application/pdf,.pdf"
                                    onChange={handleResumeChange}
                                />

                                {resumeFile && (
                                    <small>
                                        Selected: {resumeFile.name}
                                    </small>
                                )}
                            </div>

                            <div className="input-group">
                                <label htmlFor="selfDescription">
                                    Self Description
                                </label>

                                <textarea
                                    id="selfDescription"
                                    placeholder="Briefly describe your background, skills, and current goals..."
                                    value={selfDescription}
                                    onChange={(e) =>
                                        setSelfDescription(e.target.value)
                                    }
                                />
                            </div>

                            {error && (
                                <p style={{ color: "#ff6b6b" }}>
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="button primary-button generate-btn"
                            >
                                {loading
                                    ? "Generating Report..."
                                    : "Generate Interview Report"}
                            </button>

                        </div>
                    </div>
                </form>
            </div>
            </main>
        </div>
    );
};

export default Home;
