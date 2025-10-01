# AdventureQuest – Booking Platform (Backend API)

AdventureQuest is a backend prototype for a booking platform, built with **Node.js, Express, and MongoDB**.  
It provides APIs for **user authentication**, **city management**, **adventure management**, and **reservations**, with role-based authorization.  
All routes are tested with **Postman**, ensuring validation and error handling.

---

## 🚀 Features
- **Authentication:** User signup & signin
- **City Management:** Add, update, list all cities (Admin only for add/update)
- **Adventure Management:** Add adventures & adventure details
- **Reservation System:** Customers can create reservations
- **Role-based Authorization:** Admin & Customer middleware
---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Auth:** JWT with middleware (Admin & Customer)  
- **Testing:** Postman  

---
## 📌 API Endpoints

### 🔑 Authentication
- `POST /auth/signup` → Register a new user  
- `POST /auth/signin` → User login  

### 🌍 City
- `POST /city/add` → Add a new city (Admin only)  
- `GET /city/all` → Get all cities  
- `PUT /city/update` → Update city details (Admin only)  

### 🏞️ Adventure
- `POST /adventure/add` → Add a new adventure  
- `POST /adventure-detail/add` → Add adventure details  

### 📅 Reservation
- `POST /reservation/add` → Create a new reservation (Customer only)  

---
## ▶️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/nishikasingh31/AdventureQuest-Booking-Platform.git
cd AdventureQuest-Booking-Platform
```
2. Install dependencies
```bash
Copy code
npm install
```
3. Setup environment variables
Create a .env file:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
4. Start the server
```bash
npm start
