# Analytics & Engagement Schema

This document defines the metrics and events we will track to measure the portfolio's effectiveness and user journey.

## 📊 1. Primary Metrics
- **Total Visits**: All-time unique visitor count.
- **Concurrent Users**: Real-time "Active Now" count (RTDB).
- **Avg. Journey Duration**: Time spent from "Start Journey" to "Final Hub".
- **Conversion Rate**: Percentage of users who click a "Contact CTA" or "Let's Talk".

## 🛣️ 2. Journey Funnel Tracking
We will track the following events in the Interactive Journey:
1. `journey_started`
2. `slide_viewed` (param: `slide_id`)
3. `journey_completed`
4. `journey_skipped`

## 🔎 3. Section Engagement
- **Project Clicks**: Which projects get the most attention.
- **Tech Cloud Interaction**: Which technologies are being hovered/clicked.
- **Resume Views**: How many times the PDF preview is opened.

## 🛡️ 4. Security Metrics
- **Rate Limit Hits**: Number of blocked requests per IP.
- **Bot Detections**: Count of "Shadow-ban" redirects.
- **Admin Access Attempts**: Tracking unauthorized attempts to reach the dashboard.
