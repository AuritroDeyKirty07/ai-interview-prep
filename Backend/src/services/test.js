const sampleInterviewReport = {
  jobDescription: `
We are looking for a Full Stack MERN Developer Intern.

Requirements:
- Strong knowledge of JavaScript
- React.js
- Node.js
- Express.js
- MongoDB
- REST APIs
- Git & GitHub
- Data Structures & Algorithms
- Good communication skills
`,

  resume: `
Auritro Dey Kirty
B.Tech CSE

Skills:
- HTML
- CSS
- JavaScript
- React.js
- Node.js
- Express.js
- MongoDB
- Firebase
- Git
- C++
- DSA

Projects:
- Live Web Tracker
- Pokemon KO Battle
- Weather App

LeetCode:
190+ Problems Solved
`,

  selfDescription:
    "I am a second-year Computer Science student passionate about full-stack development and problem solving. I enjoy building scalable web applications and regularly practice DSA on LeetCode.",

  matchScore: 87,

  technicalQuestions: [
    {
      question: "What is the Event Loop in JavaScript?",
      intention: "Test JavaScript fundamentals.",
      answer:
        "The Event Loop continuously checks the call stack and executes callbacks from the callback queue when the stack becomes empty."
    },
    {
      question: "Explain the difference between SQL and MongoDB.",
      intention: "Evaluate database knowledge.",
      answer:
        "SQL databases are relational and use tables, while MongoDB is a NoSQL document database that stores data as BSON documents."
    },
    {
      question: "What is JWT and why is it used?",
      intention: "Check authentication concepts.",
      answer:
        "JWT is a signed token used for stateless authentication between the client and server."
    }
  ],

  behaviouralQuestions: [
    {
      question: "Tell me about yourself.",
      intention: "Evaluate communication skills.",
      answer:
        "I enjoy solving DSA problems, building MERN applications, and continuously learning new technologies."
    },
    {
      question: "Describe a challenging project.",
      intention: "Assess problem-solving ability.",
      answer:
        "While building a Live Web Tracker, I implemented real-time location updates using Firebase and optimized synchronization between users."
    }
  ],

  skillGaps: [
    {
      skill: ["Docker", "Containerization"],
      severity: "medium"
    },
    {
      skill: ["AWS", "Cloud Deployment"],
      severity: "high"
    },
    {
      skill: ["System Design"],
      severity: "high"
    },
    {
      skill: ["Unit Testing", "Jest"],
      severity: "low"
    }
  ],

  preparationPlan: [
    {
      day: 1,
      focus: "JavaScript Fundamentals",
      tasks: [
        "Closures",
        "Promises",
        "Async/Await",
        "Event Loop"
      ]
    },
    {
      day: 2,
      focus: "React",
      tasks: [
        "Hooks",
        "Context API",
        "React Router",
        "Performance Optimization"
      ]
    },
    {
      day: 3,
      focus: "Node.js & Express",
      tasks: [
        "REST APIs",
        "JWT Authentication",
        "Middleware",
        "Error Handling"
      ]
    },
    {
      day: 4,
      focus: "MongoDB",
      tasks: [
        "Aggregation",
        "Populate",
        "Indexes",
        "Schema Design"
      ]
    },
    {
      day: 5,
      focus: "DSA Revision",
      tasks: [
        "Binary Trees",
        "Graphs",
        "Dynamic Programming",
        "Binary Search"
      ]
    }
  ]
};

module.exports = sampleInterviewReport