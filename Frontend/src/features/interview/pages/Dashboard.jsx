import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import AppHeader from "../components/AppHeader";
import "../style/dashboard.scss";

const formatDate = (value) => {
    if (!value) return "Date unavailable";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "Date unavailable"
        : date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};

const getScoreTone = (score) => {
    if (score >= 80) return "score-high";
    if (score >= 60) return "score-medium";
    return "score-low";
};

const Dashboard = () => {
    const navigate = useNavigate();
    const { reports, getAllReports, loading } = useInterview();
    const [error, setError] = useState("");

    const loadReports = async () => {
        setError("");
        try {
            await getAllReports();
        } catch (err) {
            setError(err.response?.data?.message || "Couldn't load your interview history. Please try again.");
        }
    };

    useEffect(() => {
        loadReports();
        // Load once when the dashboard opens.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stats = useMemo(() => {
        const scores = reports.map((item) => Number(item.matchScore)).filter(Number.isFinite);
        return {
            total: reports.length,
            average: scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0,
            best: scores.length ? Math.max(...scores) : 0,
        };
    }, [reports]);

    return (
        <div className="dashboard-page">
            <AppHeader active="dashboard" />
            <main className="dashboard-main">
                <section className="dashboard-welcome">
                    <div>
                        <p className="dashboard-eyebrow">YOUR PREPARATION WORKSPACE</p>
                        <h1>Your interview dashboard</h1>
                        <p className="dashboard-subtitle">Track your role-fit scores and pick up where you left off.</p>
                    </div>
                    <button className="dashboard-primary" onClick={() => navigate("/new-interview")}>
                        <span aria-hidden="true">＋</span> New interview
                    </button>
                </section>

                <section className="dashboard-stats" aria-label="Interview statistics">
                    <article className="dashboard-stat">
                        <span className="dashboard-stat__label">Total reports</span>
                        <strong>{stats.total}</strong>
                        <span className="dashboard-stat__hint">Saved to your account</span>
                    </article>
                    <article className="dashboard-stat">
                        <span className="dashboard-stat__label">Average match score</span>
                        <strong>{stats.total ? `${stats.average}%` : "—"}</strong>
                        <span className="dashboard-stat__hint">Across your reports</span>
                    </article>
                    <article className="dashboard-stat">
                        <span className="dashboard-stat__label">Best match score</span>
                        <strong>{stats.total ? `${stats.best}%` : "—"}</strong>
                        <span className="dashboard-stat__hint">Your highest role fit</span>
                    </article>
                </section>

                <section className="dashboard-history">
                    <div className="dashboard-section-heading">
                        <div>
                            <div className="dashboard-eyebrow">
                            <p>YOUR ACTIVITY</p>
                            </div>
                            <h2>Previous interview reports</h2>
                        </div>
                        <span className="dashboard-count">{stats.total} {stats.total === 1 ? "report" : "reports"}</span>
                    </div>

                    {error && (
                        <div className="dashboard-message dashboard-message--error" role="alert">
                            <span>{error}</span>
                            <button onClick={loadReports} disabled={loading}>Try again</button>
                        </div>
                    )}

                    {loading && reports.length === 0 && <div className="dashboard-message">Loading your reports…</div>}

                    {!loading && !error && reports.length === 0 && (
                        <div className="dashboard-empty">
                            <div className="dashboard-empty__icon">✦</div>
                            <h3>Your first interview report starts here</h3>
                            <p>Upload your resume and add a job description to get a personalised match score, interview questions and preparation roadmap.</p>
                            <button className="dashboard-primary" onClick={() => navigate("/new-interview")}>Create your first report</button>
                        </div>
                    )}

                    {reports.length > 0 && (
                        <div className="report-list">
                            {reports.map((report) => (
                                <button
                                    type="button"
                                    className="report-row"
                                    key={report._id}
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <span className="report-row__icon">↗</span>
                                    <span className="report-row__main">
                                        <strong>{report.title || "Interview preparation report"}</strong>
                                        <small>Created {formatDate(report.createdAt)}</small>
                                    </span>
                                    <span className={`report-row__score ${getScoreTone(Number(report.matchScore) || 0)}`}>
                                        {Number.isFinite(Number(report.matchScore)) ? `${report.matchScore}%` : "—"}
                                        <small>match</small>
                                    </span>
                                    <span className="report-row__arrow" aria-hidden="true">→</span>
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
