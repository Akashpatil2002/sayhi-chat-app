# 💬 SayHi — Real-Time Chat Application

> **"SayHi — Connect instantly, chat seamlessly 💬"**

SayHi is a full-stack real-time chat application built using the MERN stack. It features secure authentication, Google login, email-based password recovery, and a modern UI with smooth animations.

---

## 🚀 Features

### 🔐 Authentication
- Email & Password Login
- Google OAuth Login
- JWT-based Authentication
- Secure Logout

### 🔑 Password Recovery
- Forgot Password via Email
- Reset Password using secure token
- Token expiry for enhanced security

### 💬 Real-Time Chat
- Instant messaging using Socket.io
- Online users indicator
- One-to-one chat system

### 👤 User Profile
- Profile image (Google + custom upload)
- Update profile functionality

### 🎨 UI/UX
- Modern UI with Tailwind CSS
- Smooth animations using Framer Motion
- Fully responsive design

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io

### Authentication:
- JWT (JSON Web Token)
- Google OAuth (`@react-oauth/google`)

### Email Service:
- Nodemailer (Gmail SMTP)

---

## 📁 Project Structure

SayHi/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── lib/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── store/
│ └── main.jsx
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

---

### 2️⃣ Backend Setup

cd backend
npm install

Create a `.env` file inside `backend/`:

PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password


Run backend server:

---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

---

## 🔐 Environment Variables

| Variable | Description |
|--------|------------|
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | JWT secret key |
| GOOGLE_CLIENT_ID | Google OAuth client ID |
| GOOGLE_CLIENT_SECRET | Google OAuth secret |
| EMAIL_USER | Gmail address |
| EMAIL_PASS | Gmail app password |

---

## 🌐 API Endpoints

### 🔑 Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `POST /api/auth/logout`

### 🔁 Password Reset
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password/:token`

---

## 📸 Screenshots

> Add screenshots of your app here (Login, Chat UI, Profile, etc.)

---

## 🚀 Future Improvements

- 🔔 Notifications system  
- 📱 Mobile app (React Native)  
- 🔐 Two-factor authentication (OTP)  
- 🌍 Deployment (AWS / Vercel / Render)  

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Akash Sonawane**

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
