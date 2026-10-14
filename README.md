# 🚀 Secure Full-Stack Internship Portal (Production-Ready Capstone)

An enterprise-grade, secure full-stack web application for managing internship listings, built with Node.js, Express, and SQLite3.

## 🛡️ Key Features & Security Enhancements

- **Security Headers (`helmet`)**: Configured strict CSP headers to protect against XSS and clickjacking.
- **Rate Limiting (`express-rate-limit`)**: Prevents Brute-Force and Denial-of-Service (DoS) attacks on API endpoints.
- **Input Validation & Sanitization (`express-validator`)**: Prevents SQL Injection and Cross-Site Scripting (XSS).
- **Parameterized Queries**: All database mutations use SQL parameterized prepared statements.
- **Health Check Endpoint**: Includes `/health` route for uptime monitoring and diagnostic checks.
- **Structured Request Logging**: Live console logger for all inbound server HTTP requests.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3 (Persistent file-based database)
- **Frontend**: HTML5, CSS3, Modern JavaScript (ES6+)
- **Security Tools**: Helmet, Express-Rate-Limit, Express-Validator, CORS

## 🚀 Getting Started

### Prerequisites
- Node.js installed (v18+)

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/muskhankumari246-cyber/Secure-Application-Integration.git](https://github.com/muskhankumari246-cyber/Secure-Application-Integration.git)
   cd Secure-Application-Integration