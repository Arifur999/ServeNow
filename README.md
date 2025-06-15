# ServeNow - Volunteer Management Platform

ServeNow is a web-based Volunteer Management Platform that connects organizations with potential volunteers. It allows users to view volunteer opportunities, post their own needs, and join causes that matter to them.

🔗 **Live URL**: [https://serve-now-ac6f5.web.app/]

---

## 🚀 Purpose

The purpose of this project is to create a responsive and feature-rich application that streamlines the process of:
- Creating and managing volunteer need posts
- Viewing and joining volunteer opportunities
- Managing personal posts and volunteer actions
- Ensuring authentication and secure access to protected resources

---

## ✨ Key Features

- 🔐 **Firebase Authentication**: Google and Email/Password login
- 🧑‍🤝‍🧑 **Post Management**: Add, update, and delete volunteer posts
- ✅ **Private Routes**: Restrict access to sensitive pages
- 🔍 **Search Functionality**: Search posts by title or category
- 📅 **Deadline & Volunteer Count**: Set deadlines and required volunteer slots
- 💡 **Theme Toggle**: Light/Dark theme support with icon switching
- 🍭 **Beautiful UI**: TailwindCSS-based responsive design
- 🚫 **404 Error Page**: Custom error handling for unknown routes
- 🌍 **Deployment**: Hosted live using Firebase Hosting

---

## 📦 NPM Packages Used

| Package | Purpose |
|--------|---------|
| **react-router-dom** | Routing and navigation |
| **firebase** | Authentication and hosting |
| **sweetalert2** | Alert modals for success/errors |
| **react-icons** | Icon library |
| **react-helmet-async** | Dynamic document titles and meta tags |
| **aos** | Animate on scroll effects |
| **react-countup** | Count up animation for statistics |
| **react-tooltip** | Tooltip support |
| **clsx** | Conditional class names |

---

## 🛠️ Project Setup

```bash
# Install dependencies
npm install

# Run locally
npm run dev
