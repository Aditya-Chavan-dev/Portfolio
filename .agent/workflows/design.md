---
description: Create a new Design Document (PRD or ADR)
---

1. Ask the user what they want to create: "PRD" or "ADR".
2. Ask for the "Name" of the feature or decision.
3. If PRD:
   - Copy content from `.agent/templates/PRD_Template.md`.
   - Create new file at `docs/design/PRD-[Name].md`.
   - Ask user to fill in the "Critical Analysis" section first.
4. If ADR:
   - Determine the next ADR number (check `docs/design` folder).
   - Copy content from `.agent/templates/ADR_Template.md`.
   - Create new file at `docs/design/ADR-[Number]-[Name].md`.
5. Open the new file for the user.
