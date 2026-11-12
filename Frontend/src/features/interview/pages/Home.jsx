import React from 'react'
import "../style/home.scss"

const Home = () => {
  return (
    <main className='home'>
        <div className="interview-container">
            <div className="header">
                <h1>AI Interview Prep</h1>
                <p>Generate a customized preparation plan based on your resume and the job description.</p>
            </div>
            
            <div className="interview-input-group">
                <div className="left">
                    <div className="input-group full-height">
                        <label htmlFor="jobDescription">Job Description</label>
                        <textarea name="job-description" id="jobDescription" placeholder='Paste the complete job description here...'></textarea>
                    </div>
                </div>
                <div className="right">
                    <div className="input-group">
                        <label className="file-label" htmlFor="resume">
                            <span className="upload-icon">📄</span> Upload Resume (PDF)
                        </label>
                        <input hidden type="file" name="resume" id="resume" accept=".pdf"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="selfDescription">Self Description</label>
                        <textarea name="selfDescription" id="selfDescription" placeholder='Briefly describe your background, skills, and current goals...'></textarea>
                    </div>
                    <button className='button primary-button generate-btn'>Generate Interview Report</button>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Home