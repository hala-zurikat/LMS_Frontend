# 🎓 LMS Frontend – React.js

This is the frontend of the **Online Learning Management System (LMS)** developed using React.js. It provides an intuitive and responsive interface for students, instructors, and admins to interact with the system.

## 🚀 Features

* 🔐 Google OAuth 2.0 login
* 👨‍🏫 Role-based dashboards (Student, Instructor, Admin)
* 📚 Course browsing, enrollment, and progress tracking
* 📝 Quizzes and assignment submission
* 📱 Responsive design for all devices
* 📡 Integrated with backend REST API

## 🧰 Tech Stack

* **React.js** with functional components
* **React Router** for client-side routing
* **CSS Modules** for scoped styling
* **Axios** for API calls
* **Custom Hooks** for auth and course logic
* **Modular structure** for scalability

## 📁 Project Structure

```bash
src/
├── assets/               # Images, icons, styles (CSS)
│   ├── images/
│   └── styles/
├── components/
│   ├── common/           # Reusable UI (Buttons, Cards)
│   ├── layout/           # Navbar, Sidebar, etc.
│   └── auth/             # Login form, etc.
├── features/
│   ├── courses/          # Course-specific logic
│   └── auth/             # Auth-specific logic
├── hooks/               # Custom React hooks (e.g., useAuth)
├── pages/               # Route views (Login, Dashboard, etc.)
│   ├── Auth/
│   ├── Student/
│   └── Teacher/
├── services/            # API calls to backend
├── utils/               # Helper functions
├── App.jsx              # Main app with routing
└── main.jsx             # Entry point
```

## 🔑 Authentication & Routing

* Uses **Google OAuth 2.0** (via backend) for login
* Protected routes for:

  * Students: `/student/*`
  * Instructors: `/teacher/*`
  * Admins: (if applicable)
* Session stored using cookies/localStorage

## 🧩 Core Pages

| Path               | Role       | Description                   |
| ------------------ | ---------- | ----------------------------- |
| `/login`           | Public     | Google sign-in                |
| `/student/courses` | Student    | Browse & enroll in courses    |
| `/teacher/create`  | Instructor | Create and manage own courses |
| `/dashboard`       | All Roles  | Custom dashboard after login  |

## 🧪 API Integration

* Integrated with backend via `Axios` from `/services/`
* Token/auth header handled in `authService.js`
* Uses `.env` for backend base URL

## ⚙️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## ✅ Minimum Requirements Met

* [x] 3+ responsive pages
* [x] Google OAuth login flow
* [x] Role-based dashboard routing
* [x] Axios integrated with backend API
* [x] State management via custom hooks

## 📝 Notes

* Frontend only – backend hosted separately in `/server`
* Future enhancements: form validation, loading states, better error handling
