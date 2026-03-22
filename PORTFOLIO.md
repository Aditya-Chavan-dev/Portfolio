# 📋 Portfolio Metadata Guidelines

To sync a GitHub repository with your portfolio automatically, create a `portfolio.json` file in the **root** of the repository.

---

## 📖 Schema Guidelines

### 1. 🌟 Flagship Features
* **Rule**: Whenever you make a **really great decision** or implement a **unique feature** that no other project has, log it here.
* **JSON Mapping**: `flagshipFeatures`

### 2. 🧠 Learnings & Solved Issues
* **Rule**: Whenever you face a **really big issue** (one that holds real-world or market value), log it here with how you solved it.
* **JSON Mapping**: `learningsIssues`

---

## 📄 `portfolio.json` Template

```json
{
  "shortDescription": "A short brief describing what the project is about.",
  "startDate": "Jan 2024",
  "endDate": "Mar 2024",
  "techStack": ["React", "TypeScript", "Tailwind"],
  
  "flagshipFeatures": [
    {
      "title": "Unique Cache Pipeline",
      "description": "Implemented zero-latency nodes mesh that no other setup uses."
    }
  ],
  
  "learningsIssues": [
    {
      "title": "Viewport Scale Deadlocks",
      "description": "Resolved 100vh scaling overflow locks by switching to flex grid buffers."
    }
  ]
}
```

*Place this file inside the main branch of your repo to go live.*

---

## 🧠 The Golden Habit Rule

To make loading your portfolio a natural habit with **every technical decision**:

1. **Log it instantly**: Do not wait for project completion. The exact moment you overcome a breaking bug or invent a novel layout technique, open `portfolio.json` and type it down.
2. **Commit correlation**: Standardize your process: *"If it's worth a git commit, it is likely worth logging in flagshipFeatures or learningsIssues."*
3. **Value Phrasing**: Phrase your titles with **market weight**. Use absolute action words like *"Engineered streams"*, *"Resolved deadlocks"*, *"Buffered overflows"*. This ensures your project view dashboard sells your skills effortlessly on render.
