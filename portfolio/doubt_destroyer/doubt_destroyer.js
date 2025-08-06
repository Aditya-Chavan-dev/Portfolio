// Enhanced Questions and Answers Data
const questionsData = {
    "Why Me?": {
        title: "Why Me?",
        answer: `For a company to move fast and build right, employees need two core competencies:

**1. Technical clarity** — a working knowledge of the product architecture: which languages are used (and why), which database structure backs the system, how API endpoints are designed, and how each component integrates.

**2. Team collaboration** — the ability to work cross-functionally, understand client requirements, debug collaboratively, and communicate solutions clearly without bottlenecks.

I've developed both.

Through my engineering coursework, a focused internship, and a freelance software project for a real-world industrial client, I've built fluency in both — codebase-level understanding and functional collaboration. At a fresher level, I know not just what to do, but how teams do it together.

**I'm not just trained — I'm field-tested. That's what makes me a strong hire.**`,
        keywords: ["why", "hire", "choose", "select", "candidate", "best", "suitable", "fit", "right", "pick", "good", "strong", "advantage", "benefit", "value", "worth", "recommend", "prefer"]
    },
    "Opportunities": {
        title: "What kind of opportunities are you looking for?",
        answer: `I'm aiming for development roles where I can genuinely build stuff — not just maintain legacy code or reset passwords. I enjoy solving real problems with clean, scalable code, and I want to keep pushing my technical ceiling higher.

That said, I don't mind stepping into support occasionally if the team needs it — but let's just say I'm more at home writing logic than logging tickets.

**I build. That's where I thrive.**`,
        keywords: ["opportunity", "role", "position", "job", "work", "looking", "seeking", "want", "prefer", "interest", "career", "development", "build", "create", "code", "programming", "software", "engineering", "developer", "tech", "technology"]
    },
    "Remote Work": {
        title: "Relocation & Remote Work",
        answer: `✅ I genuinely enjoy working from the office — the energy, the collaboration, it keeps me at my best.

✅ I'm open to remote and relocation opportunities.

✅ I'd happily consider relocating if:
  • The role offers meaningful, hands-on work (not just on-paper buzzwords).
  • The leadership and team culture are strong, growth-focused, and engaging.

✅ In short — I'm flexible and committed, especially when the opportunity feels worth investing in.`,
        keywords: ["remote", "relocation", "relocate", "office", "location", "move", "travel", "flexible", "work from home", "wfh", "hybrid", "onsite", "place", "where", "base", "city", "country", "willing", "open"]
    },
    "Handle Pressure": {
        title: "How do you handle pressure?",
        answer: `I perform at my peak when the pressure is high — it fuels my focus and problem-solving instincts.

**My default reaction is action:** I immediately start identifying solutions instead of dwelling on the problem.

I stay calm and composed, even in chaotic scenarios — no panic, just priority-based execution.

I often help others stay on track too, creating a constructive, not reactive, environment.`,
        keywords: ["pressure", "stress", "deadline", "handle", "manage", "cope", "difficult", "challenging", "tough", "crisis", "problem", "issue", "urgent", "rush", "fast", "quick", "emergency", "tight", "busy", "workload"]
    },
    "Experience": {
        title: "Experience & Background",
        answer: `6+ months software development experience in Python (Flask/FastAPI), Microsoft SQL Server, HTML, CSS, JS 
        Position: Software Engineer (Contract)
  Company: Autoteknic
  Location: Pune
  Duration: 1 April 2025 - 31 July 2025 (4 months)
Technologies: Python3,  FastAPI, REST APIs, SQL Server, Docker, CI/CD, Agile       _____________________________________________________________________________________________________________________
Position: Software Engineering Intern
Company: Kalyani Transmission Technologies Pvt. Ltd.
Location: Pune
Duration: 8 Jan 2024 - 7 May 2024 (4 months)
Technologies: Python3, Flask, REST APIs, Microsoft SQL Server, CI/CD, Agile
`,
        keywords: ["experience", "background", "skills", "projects", "work", "internship", "freelance", "portfolio", "history", "previous", "past", "qualification", "education", "training", "expertise", "knowledge", "capability", "ability", "competency"]
    }
};

// Advanced Smart Chatbot System
const smartChatbot = {
    conversationContext: [],
    
    // Enhanced keyword and context matching
    contextualResponses: {
        "Salary expectations": {
            title: "Salary Expectations",
            answer: "I'm open to discussing competitive compensation that reflects the role's requirements and market standards. My focus is on finding the right opportunity where I can contribute meaningfully and grow professionally. I believe in fair compensation that aligns with the value I bring to the team and the impact of the work we'll be doing together."
        },
        
        "Availability": {
            title: "Availability & Start Date",
            answer: "I'm available to start as soon as needed, respecting standard notice periods for any current commitments. I'm excited about the opportunity and can be flexible with timelines to ensure a smooth transition. For immediate roles, I can typically start within 2 weeks, and I'm happy to discuss specific scheduling requirements."
        },
        
        "Tech stack": {
            title: "Technical Stack & Skills",
            answer: "I work with modern development technologies and frameworks including JavaScript, HTML/CSS, Python,Flask, FastAPI, databases.Eager to learn new tools and technologies based on project needs. My experience spans full-stack development with a focus on writing scalable, maintainable code. I adapt quickly to new tech stacks and enjoy working with cutting-edge technologies."
        },
        
        "Team fit": {
            title: "Team Collaboration & Culture Fit",
            answer: "I thrive in collaborative environments where ideas flow freely and everyone works toward shared goals. I believe great software comes from diverse perspectives, constructive feedback, and strong team dynamics. I communicate clearly, share knowledge openly, and always focus on what's best for the project and the team's success."
        },
        
        "Weakness": {
            title: "Areas for Growth",
            answer: "I believe in continuous growth and actively seek areas to improve. I focus on expanding my expertise in emerging technologies and refining skills that directly impact project success. I'm always learning, whether it's through online courses, contributing to open source, or seeking feedback from experienced developers."
        },
        
        "goals": {
            title: "Career Goals & Vision",
            answer: "My goal is to become a well-rounded developer who can architect scalable solutions and lead technical initiatives. I want to work on impactful projects that solve real problems and eventually mentor other developers while driving innovation. I'm committed to continuous learning and staying at the forefront of technology."
        },
        
        "culture": {
            title: "Work Culture & Environment",
            answer: "I value environments that balance innovation with execution, where both individual growth and collective success are priorities. I appreciate teams that celebrate achievements and learn from challenges together. I work best in cultures that encourage creativity, maintain high standards, and foster open communication."
        }
    },

    // Semantic similarity matching
    findBestMatch: function(userQuestion) {
        const question = userQuestion.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;
        
        // Check contextual responses first
        for (const [key, response] of Object.entries(this.contextualResponses)) {
            if (question.includes(key.toLowerCase()) || key.toLowerCase().includes(question)) {
                return { 
                    isContextual: true, 
                    title: response.title,
                    answer: response.answer,
                    score: 10
                };
            }
        }
        
        // Check predefined questions
        Object.entries(questionsData).forEach(([questionKey, data]) => {
            let score = 0;
            
            data.keywords.forEach(keyword => {
                if (question.includes(keyword.toLowerCase())) {
                    score += 2;
                }
            });
            
            if (score > highestScore) {
                highestScore = score;
                bestMatch = { 
                    key: questionKey, 
                    data: data, 
                    score: score,
                    isContextual: false
                };
            }
        });
        
        return bestMatch;
    },

    // Generate intelligent response
    generateResponse: function(userQuestion) {
        const match = this.findBestMatch(userQuestion);
        
        if (match && match.score > 0) {
            if (match.isContextual) {
                return {
                    title: match.title,
                    answer: match.answer,
                    type: 'contextual'
                };
            } else {
                return {
                    title: match.data.title,
                    answer: match.data.answer,
                    type: 'predefined'
                };
            }
        }
        
        // Fallback response
        return {
            title: "Great Question!",
            answer: "Thanks for that thoughtful question! Based on my experience and approach to work, I focus on delivering quality results while maintaining strong collaborative relationships. I believe in clear communication, attention to detail, and a problem-solving mindset in everything I do. I'd love to discuss this specific aspect in more detail during our conversation!",
            type: 'fallback'
        };
    }
};

let currentActiveCard = null;
let typewriterTimeout = null;
let isTyping = false;

// Fixed Typewriter Effect
function typewriterEffect(element, text, speed = 25) {
    return new Promise((resolve) => {
        // Clear any existing timeout
        if (typewriterTimeout) {
            clearTimeout(typewriterTimeout);
        }
        
        // Clear the element and set typing state
        element.innerHTML = '';
        isTyping = true;
        let i = 0;
        
        // Convert markdown to HTML first
        let processedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '\n')
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => {
                if (line.startsWith('• ') || line.startsWith('✅')) {
                    return `<p>${line}</p>`;
                } else {
                    return `<p>${line}</p>`;
                }
            })
            .join('');
        
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = processedText;
        
        // Get plain text for typing
        const plainText = tempDiv.textContent || tempDiv.innerText || "";
        
        function type() {
            if (i < plainText.length && isTyping) {
                element.innerHTML = processedText.substring(0, getHTMLPosition(i + 1)) + '<span class="typewriter-cursor"></span>';
                i++;
                typewriterTimeout = setTimeout(type, speed);
            } else {
                // Remove cursor and show final content
                element.innerHTML = processedText;
                isTyping = false;
                resolve();
            }
        }
        
        function getHTMLPosition(plainPos) {
            let htmlPos = 0;
            let plainCount = 0;
            
            while (htmlPos < processedText.length && plainCount < plainPos) {
                if (processedText[htmlPos] === '<') {
                    // Skip HTML tag
                    while (htmlPos < processedText.length && processedText[htmlPos] !== '>') {
                        htmlPos++;
                    }
                    htmlPos++; // Skip '>'
                } else {
                    plainCount++;
                    htmlPos++;
                }
            }
            
            return htmlPos;
        }
        
        type();
    });
}

// Initialize the application
function init() {
    populateQuestionCards();
}

// Populate question cards with shorter design
function populateQuestionCards() {
    const container = document.getElementById('questionCards');
    
    Object.keys(questionsData).forEach((question, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.onclick = () => showAnswer(question, card);
        
        // Use the display names directly from questionsData keys
        card.innerHTML = `<div class="question-text">${question}</div>`;
        container.appendChild(card);
    });
}

// Show answer with typewriter effect
async function showAnswer(question, cardElement, isCustom = false) {
    // Stop any ongoing typing
    isTyping = false;
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
    
    // Remove active state from previous card
    if (currentActiveCard) {
        currentActiveCard.classList.remove('active');
    }
    
    // Add active state to current card if it exists
    if (cardElement) {
        cardElement.classList.add('active');
        currentActiveCard = cardElement;
    }
    
    // Hide placeholder and show answer
    document.getElementById('answerPlaceholder').style.display = 'none';
    
    const answerContent = document.getElementById('answerContent');
    const answerTitle = document.getElementById('answerTitle');
    const answerText = document.getElementById('answerText');
    const typingIndicator = document.getElementById('typingIndicator');
    
    // Show typing indicator
    answerContent.classList.add('active');
    typingIndicator.style.display = 'flex';
    answerText.innerHTML = '';
    
    // Wait a moment to show typing indicator
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Hide typing indicator and show content
    typingIndicator.style.display = 'none';
    
    if (isCustom) {
        answerTitle.innerHTML = `<span class="smart-indicator">🤖 Smart Answer</span> ${question}`;
    } else {
        answerTitle.textContent = questionsData[question].title;
    }
    
    // Start typewriter effect
    const answerContentText = isCustom ? questionsData[question].answer : questionsData[question].answer;
    await typewriterEffect(answerText, answerContentText, 25);
}

// Handle chat question with enhanced AI
async function handleChatQuestion() {
    const input = document.getElementById('chatInput');
    const userQuestion = input.value.trim();
    
    if (!userQuestion) return;
    
    // Generate response using smart chatbot
    const response = smartChatbot.generateResponse(userQuestion);
    
    // Create temporary question object for display
    const customQuestionKey = userQuestion;
    questionsData[customQuestionKey] = {
        title: response.title,
        answer: response.answer
    };
    
    // Show the answer
    await showAnswer(customQuestionKey, null, true);
    input.value = '';
    
    // Clean up temporary question
    setTimeout(() => {
        delete questionsData[customQuestionKey];
    }, 1000);
}

// Updated function to directly show answer when suggestion is clicked
async function fillSuggestion(suggestion) {
    // Clear the input field
    const input = document.getElementById('chatInput');
    input.value = '';
    
    // Generate response using smart chatbot for the suggestion
    const response = smartChatbot.generateResponse(suggestion);
    
    // Create temporary question object for display
    const customQuestionKey = suggestion;
    questionsData[customQuestionKey] = {
        title: response.title,
        answer: response.answer
    };
    
    // Directly show the answer with typewriter effect
    await showAnswer(customQuestionKey, null, true);
    
    // Clean up temporary question
    setTimeout(() => {
        delete questionsData[customQuestionKey];
    }, 1000);
}

// Initialize app and add event listeners
document.addEventListener('DOMContentLoaded', function() {
    init();
    
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleChatQuestion();
        }
    });
});
