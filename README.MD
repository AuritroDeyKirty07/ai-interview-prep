<div align="center">

# AI Interview Prep

### Full-Stack AI Resume Analyser, Matched Against Any Job Description

Upload your resume, paste a job description, and get an instant AI-powered match score, skill-gap analysis, and actionable suggestions to land the interview.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-interview-prep-pi-ochre.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/AuritroDeyKirty07/ai-interview-prep)

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![AI Powered](https://img.shields.io/badge/AI-Powered-8A2BE2?style=flat-square&logo=openai&logoColor=white)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)
![Stars](https://img.shields.io/github/stars/AuritroDeyKirty07/ai-interview-prep?style=flat-square&logo=github)
![Forks](https://img.shields.io/github/forks/AuritroDeyKirty07/ai-interview-prep?style=flat-square&logo=github)
![Last Commit](https://img.shields.io/github/last-commit/AuritroDeyKirty07/ai-interview-prep?style=flat-square)

[**Live Demo**](https://ai-interview-prep-pi-ochre.vercel.app/) | [**Report Bug**](https://github.com/AuritroDeyKirty07/ai-interview-prep/issues) | [**Request Feature**](https://github.com/AuritroDeyKirty07/ai-interview-prep/issues)

</div>

---

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About the Project

Most resumes get rejected before a human ever reads them, usually because they don't align with the job description. **AI Interview Prep** closes that gap.

It is a full-stack web application that analyses your resume against a specific job description (JD) using AI. It evaluates how well you match, highlights missing skills and keywords, and gives concrete suggestions so you can tailor your resume and prepare for the interview with confidence.

---

## Key Features

- **Resume Upload and Parsing:** Upload your resume and extract its content automatically.
- **JD Matching:** Paste any job description to compare against your resume.
- **Match Score:** Get an overall compatibility score between your profile and the role.
- **Skill Gap Analysis:** See which required skills and keywords are present and which are missing.
- **AI Suggestions:** Receive actionable feedback on improving your resume for the role.
- **Interview Prep Insights:** Get preparation direction based on the role's requirements.
- **Fast and Responsive UI:** Clean, modern interface that works across devices.
- **Fully Deployed:** Frontend and backend are live and production-ready.

---

## How It Works

```
Upload Resume  ->  Paste JD  ->  AI Analysis  ->  Score + Gaps + Suggestions
  (PDF/Text)                      (Backend)
```

1. The user uploads a resume and pastes a job description on the frontend.
2. The backend extracts and cleans the resume text.
3. Resume and JD are sent to the AI model with a structured prompt.
4. The AI returns a match score, skill gaps, strengths, and suggestions.
5. The frontend renders the results in a clear, readable dashboard.

---

## Tech Stack

| Layer        | Technologies                          |
| ------------ | ------------------------------------- |
| **Frontend** | React, JavaScript, HTML5, CSS3        |
| **Backend**  | Node.js, Express.js                   |
| **AI**       | LLM API for resume and JD analysis    |
| **Deploy**   | Vercel                                |
| **Tools**    | Git, GitHub, npm                      |

---

## Project Structure

```
ai-interview-prep/
|-- client/                # Frontend (React)
|   |-- public/
|   `-- src/
|       |-- components/
|       |-- pages/
|       `-- App.jsx
|-- server/                # Backend (Node + Express)
|   |-- routes/
|   |-- controllers/
|   `-- server.js
|-- .env.example
|-- .gitignore
|-- package.json
`-- README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm or yarn
- An API key for the AI provider used

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/AuritroDeyKirty07/ai-interview-prep.git
cd ai-interview-prep
```

**2. Install dependencies**

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

**3. Configure environment variables**

Create a `.env` file in the `server/` directory (see below).

**4. Run the application**

```bash
# Start backend
cd server
npm start

# Start frontend (new terminal)
cd client
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

---

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
AI_API_KEY=your_api_key_here
```

> **Note:** Never commit your `.env` file. Keep your API keys private.

---

## Usage

1. Open the [live app](https://ai-interview-prep-pi-ochre.vercel.app/).
2. Upload your resume.
3. Paste the job description of the role you are targeting.
4. Click **Analyse**.
5. Review your match score, missing skills, and improvement suggestions.
6. Update your resume and re-run to track your improvement.

---

## Roadmap

- [x] Resume vs JD analysis
- [x] Match score and skill gap detection
- [x] Production deployment
- [ ] User authentication and saved history
- [ ] AI-generated mock interview questions
- [ ] Resume export with suggested improvements
- [ ] ATS-friendliness score
- [ ] Multi-resume comparison

---

## Contributing

Contributions are what make the open-source community great. Any contribution you make is **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "Add: AmazingFeature"`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

**Auritro Dey Kirty**

GitHub: [@AuritroDeyKirty07](https://github.com/AuritroDeyKirty07)

Project Link: [https://github.com/AuritroDeyKirty07/ai-interview-prep](https://github.com/AuritroDeyKirty07/ai-interview-prep)

---

<div align="center">

### If you liked the repo, consider giving it a ⭐

**Created with ❤️ by Auritro Dey Kirty**

</div>