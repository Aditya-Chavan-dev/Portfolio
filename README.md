# 🧠 Aditya Chavan – Technical Portfolio Platform

Welcome to the **Engineering Portfolio Platform** of Aditya Chavan. This repository is an advanced, microservices-based system architected to not only **showcase software projects** but also **demonstrate production-level backend engineering**, UI design, system thinking, and deployment readiness.

---

## 🔧 Tech Stack

| Layer         | Tools / Frameworks                    |
|---------------|----------------------------------------|
| Frontend      | HTML, CSS, JavaScript                 |
| Backend       | Flask (REST APIs), FastAPI            |
| Database      | SQL Server (SSMS)                     |
| Infra (Planned) | Docker, Render, GitHub Actions         |
| Dev Tools     | VS Code, DevTunnels, Postman, Telegram Bot |

---

## 📁 Folder Structure

```

aditya-portfolio/
├── venv/                       # Universal virtual environment (shared by all services)
├── shared/                     # Shared utilities and modules
├── frontend/                   # Static HTML/CSS/JS frontend
│   ├── index.html
│   ├── recruiter-landing.html
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
├── project-service/            # Project metadata and gallery microservice
│   ├── app/
│   │   ├── **init**.py
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── db.py
│   ├── run.py
│   ├── .env
│   └── tests/
├── resume-service/             # Real-time resume API + PDF endpoint
│   ├── app/
│   │   ├── routes.py
│   │   └── resume\_data.json
│   ├── run.py
│   └── .env
├── tracker-service/            # Recruiter tracking + Telegram alert service Pings me when recruiter visits my portfolio
│   ├── app/
│   │   ├── routes.py
│   │   └── telegram\_bot.py
│   ├── run.py
│   └── .env
├── feedback-service/           # Recruiter feedback capture backend
│   ├── app/
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── db.py
│   ├── run.py
│   └── .env
├── faq-service/                # FAQ resolver (FastAPI-based)
│   ├── app/
│   │   ├── main.py
│   │   └── logic.py
│   └── tests/
├── requirements.txt            # Master list of dependencies
├── .gitignore                  # venv, pycache, .env, etc.
└── README.md                   # You're here

````

---

## 🧩 Folder-by-Folder Breakdown

### 🔁 `venv/`
- Isolated Python environment.
- Shared across all microservices to maintain consistent dependency versions.
- Do **not** commit this folder.

---

### 🔧 `shared/`
- Shared modules like:
  - Logging configuration
  - Input validation logic
  - Authentication middleware (optional)

---

### 🎨 `frontend/`
- Fully static UI with recruiter-focused design.
- Includes:
  - `index.html` → Homepage
  - `recruiter-landing.html` → Direct CTA page for recruiters
  - `assets/css/` → Styling rules
  - `assets/js/` → Interactive features
  - `assets/images/` → Logos, screenshots, icons

---

### 📁 `project-service/`
- Handles:
  - Project listing
  - Filtering/sorting
  - Detail pages
- Uses SQLAlchemy for ORM and SQL Server as backend.
- **Endpoints:**
  - `GET /projects`
  - `GET /projects/<id>`
  - `POST /projects`

---

### 📄 `resume-service/`
- Exposes your resume as:
  - JSON API (`/resume/json`)
  - PDF (`/resume/download`)
- Makes it accessible programmatically and via UI.

---

### 👁 `tracker-service/`
- Tracks visits using query parameters.
- Sends instant recruiter notifications via Telegram bot.
- **Endpoints:**
  - `GET /track?source=linkedin`

---

### 💬 `feedback-service/`
- Lightweight backend to store anonymous recruiter feedback.
- Future enhancement: include sentiment analysis or keyword tagging.

---

### ❓ `faq-service/`
- FastAPI microservice to respond to pre-defined FAQ queries.
- Could be upgraded to semantic search or simple RAG system.

---

## 🚀 Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/adityachavan/portfolio.git
cd aditya-portfolio

# 2. Create universal virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start any service (example: project-service)
cd project-service
python run.py
````

> ⚠️ Ensure SSMS is running and `.env` files are configured for each service

---

## 🧪 Testing

```bash
# Run tests for project-service
cd project-service
pytest

# Run FAQ logic tests
cd ../faq-service
pytest
```

---


## 🤝 Contact

* 📧 [adityachavan@email.com](mailto:adityachavan3@email.com)
* 💼 [LinkedIn]([https://linkedin.com/in/adityachavan](https://www.linkedin.com/in/aditya-chavan-6974ab27b/))

---

## 🔐 License

This project is licensed under the MIT License.

---

## 🧠 Philosophy

This isn’t just a portfolio—it’s an **engineering narrative**.
Every line of code is intentional. Every service is modular. Every pixel has a job.
Built for **clarity, credibility, and conversion.**
