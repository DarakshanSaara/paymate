# 💸 PayMate — Peer-to-Peer Student Payment App (Powered by Stellar)

**PayMate** is a decentralized peer-to-peer payment app designed for students to securely transfer funds using the Stellar blockchain. With features like real-time balance tracking, transaction history, 2FA, and analytics, PayMate aims to provide a fast, secure, and user-friendly platform for managing payments in a peer-to-peer environment.

---

## 🚀 Features

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

## 🔧 Tech Stack

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

## 🧠 Architecture Overview

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

## 📂 Folder Structure

/PayMate │ ├── index.html # Main dashboard ├── home.html/2fa.html # Login + Captcha + 2FA ├── style.css # Theming and UI ├── login.js # Handles login + 2FA ├── common.js # Stellar, Firestore, balance, history, export ├── analytics.js # Spending analytics ├── assets/ # Images, logos, etc. └── README.md # You're here!

---

## 🔐 Firebase Setup (Firestore)

To use Firebase:
1. Create a Firebase project [here](https://console.firebase.google.com).
2. Add a web app and get your config snippet.
3. Replace the placeholder config in `common.js` with:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  ...
};
```
firebase.initializeApp(firebaseConfig);
const myDb = firebase.firestore();
Firestore will auto-create the transactions collection.

🌐 Stellar Wallet Info
You can generate test wallets at: https://laboratory.stellar.org/#account-creator?network=test

Faucet for free test XLM: https://laboratory.stellar.org/#account-creator?network=test

Test Wallets used in this project:

Wallet A (sender): G...

Wallet B (receiver): G...

---

🧪 Running Locally

git clone https://github.com/your-username/PayMate.git
cd PayMate
# Open index.html or login.html in your browser
Ensure you're connected to the internet since it depends on Stellar and Firebase APIs.

---

### 🎬 Demo

# Login:
![Screenshot 2025-04-27 230056](https://github.com/user-attachments/assets/a4874ce7-5a86-4f7a-93c0-c4827929f1d3)
# Dashboard:
![Screenshot 2025-04-27 200829](https://github.com/user-attachments/assets/6f25193a-0724-481d-b9d8-58aeb7521926)
![Screenshot 2025-04-27 200959](https://github.com/user-attachments/assets/05778bc8-190c-4865-bc47-00b288a737cc)
# Features:
![Screenshot 2025-04-27 205721](https://github.com/user-attachments/assets/981c9329-89d3-4f73-bc3e-9b51be79ab4b)
![Screenshot 2025-04-27 205750](https://github.com/user-attachments/assets/83ac47b1-a4e8-4652-b63b-e94fe8f1bae3)
![Screenshot 2025-04-27 205222](https://github.com/user-attachments/assets/c468a174-389e-4206-847b-8758d5d3918b)

---

📦 Future Enhancements
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

🙌 Made With Love
By Saara Darakshan
For HackHazard Hackathon 2025 💙
