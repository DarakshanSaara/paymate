## 🚀 Project Title
💸 PayMate — Peer-to-Peer Student Payment App (Powered by Stellar)

---

## 📌 Problem Statement
Problem Statement 6 - Better Finance For Everyone With Stellar

---

## 🎯 Objective
PayMate solves the problem of instant, secure, and simple money transfers among students.
It provides a blockchain-based wallet system, removing the hassle of cash and delayed payments, thus making campus transactions faster, safer, and smarter.

---

## 🧠 Team & Approach
Team Name: Solo Hacker (PayMate)

Team Members:

Saara Darakshan (GitHub: https://github.com/DarakshanSaara) [Frontend + Backend Developer]

# Approach:

Chose Stellar blockchain to ensure secure transactions and real-time payment verification.

Focused on student-first UX with simple login, send/receive, and live balance features.

Challenges: Backend setup, Authentication, Deployment

Breakthrough: Integrating Firebase Firestore for transaction history + Stellar payments.

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript, Google Fonts & Font Awesome |
| **Blockchain** | [Stellar SDK (Testnet)](https://developers.stellar.org/docs), Stellar Horizon API, StellarExpert |
| **Backend (Storage)** | [Firebase Firestore](https://firebase.google.com/docs/firestore), Firebase SDK (Web) |
| **Authentication** | Custom Password + CAPTCHA + 2FA |
| **Analytics** | [Chart.js](https://www.chartjs.org/) |
| **Data Persistence** | `localStorage` + Firestore |
| **Export** | Blob File API |

---

# Sponsor Technologies Used (if any):
 Groq: How you used Groq
 Monad: Your blockchain implementation
 Fluvio: Real-time data handling
 Base: AgentKit / OnchainKit / Smart Wallet usage
 Screenpipe: Screen-based analytics or workflows
 Stellar: Payments, identity, or token usage ✅

 ---
 
# 🧠 Architecture Overview

Frontend (HTML/CSS/JavaScript)
          │
          ▼
User Login (Password + CAPTCHA + 2FA)
          │
          ▼
 ┌────────────────┐       ┌─────────────────────┐
 │   Stellar SDK  │─────▶│   Stellar Testnet    │
 └────────────────┘       └─────────────────────┘
          │                        ▲
          ▼                        │
Real-Time Wallet Balance     View Blockchain History
  & Transaction Execution          via API
          │
          ▼
 ┌────────────────┐
 │  Firebase Firestore │◀─────────────────────────────┐
 └────────────────┘                                  │
   Stores Local Transaction Logs                     │
                                                     ▼
                                              Exportable History (JSON)

---

## ✨ Key Features

### 🔗 Blockchain-Based Transactions
- Built on the **Stellar Testnet** for fast, low-cost, and decentralized payments.
- Real-time wallet balance fetching.
- Transaction history from both **blockchain** and **Firebase**.
- View your blockchain transactions via [StellarExpert](https://stellar.expert/explorer/testnet/).

### 🔐 Secure Authentication
- **Password-protected login system** with custom credentials.
- **Two-Factor Authentication (2FA)** using an OTP-like verification step (expandable to email/phone auth).
- CAPTCHA integrated to prevent automated access.

### 📊 Transaction Analytics
- Weekly and Monthly analytics with **Chart.js**:
  - Spending trends
  - Top recipients
  - Payment frequency

### 🔁 Exportable History
- One-click download of blockchain transaction history in `.json` format.
- Offline backup and future restoration ready.

### 🌙 Theming Support
- Light/Dark theme toggle for better UX and accessibility.
- User preferences stored in `localStorage`.

### 🔧 Firebase Integration
- Firestore for storing transaction logs securely.
- Optional expansion for user profiles or real-time chat in future versions.

### 🔒 Privacy-Oriented
- Sensitive data (private keys, passwords) are never stored or exposed.
- Security-first design with modular expansion capability.

---

## 📽️ Demo & Deliverables
Demo Video Link: https://www.loom.com/share/e21cc84dcea04c85944700853f8b7e4e?sid=9507d1e1-0cdc-4554-9bec-48d43ad5beb5

PPT Link: https://drive.google.com/file/d/1IpMjU-E4gxaQuIv3tIVxsWaM0zs110ef/view?usp=drivesdk

---

✅ Tasks & Bonus Checklist
 All members of the team completed the mandatory task - Followed at least 2 of our social channels and filled the form (Details in Participant Manual) ✅
 All members of the team completed Bonus Task 1 - Sharing of Badges and filled the form (2 points) (Details in Participant Manual) ✅
 All members of the team completed Bonus Task 2 - Signing up for Sprint.dev and filled the form (3 points) (Details in Participant Manual) ✅

 ---

 ## 🧪 How to Run the Project

Requirements:

Node.js and npm installed
Firebase CLI installed (npm install -g firebase-tools)
A Stellar testnet account (for payments)

Local Setup:

# 1. Clone the repository
git clone https://github.com/DarakshanSaara/PayMate.git

# 2. Install Firebase CLI globally (if not already installed)
npm install -g firebase-tools

# 3. Move into the project directory
cd PayMate

# 4. Launch the Website:

Open index.html directly in your browser (Google Chrome / Edge recommended).
Important: Keep your internet connection ON as the app interacts live with Stellar Network and Firebase Firestore.

# Firebase Setup (Already done by us):

The project is pre-configured with Firebase Hosting and Firestore database.
No local server setup needed unless modifying backend — just open index.html!

# Stellar Setup:

PayMate is integrated with the Stellar Testnet for live transactions.
You don't need extra setup; the app uses Stellar's APIs internally for creating wallets, sending payments, and updating balances.

---

## 🧬 Future Scope
🔒 OAuth login or Google Auth
🖥️ Backend & Data
📲 Progressive Web App (PWA) version
📬 Email-based OTP for 2FA
🧾 Real-time notifications via Firebase Cloud Messaging
📱 Mobile responsive redesign
💬 Communication & Notifications
📈 Advanced Analytics
🌐 Miscellaneous (Multi-Currency Support, Language Localization)

---

## 📎 Resources / Credits

Stellar Blockchain SDK
Firebase Documentation
Open Source icons from FontAwesome

---

## 🔐 Security Note
This project uses **Stellar testnet credentials** (fake money).  
- Keys are intentionally visible for judge testing.  
- Get new testnet keys anytime from [Stellar Laboratory](https://laboratory.stellar.org).
- The Firebase API key exposed in the code is safe as it's required for client-side access. Proper Firestore security rules have been applied to prevent unauthorized access.

---

## 🏁 Final Words
Building PayMate was an exciting journey filled with learning blockchain technology and deploying a live financial application.
Grateful for the hackathon experience and excited for what’s ahead! 🚀

---

Crafted with purpose and passion 💡
By Saara Darakshan
As part of HackHazard Hackathon 2025 💙

---

📄 License
This project is licensed under the MIT License — feel free to use and contribute!
