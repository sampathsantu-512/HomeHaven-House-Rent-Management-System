# 🏠 Home Haven – House Rent Management System

A full-stack MERN web application that allows property owners to list rental properties and tenants to search, book, and manage rental properties online. The system provides secure authentication, property management, booking management, and role-based access for Owners and Renters.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication
- Role-Based Access (Owner & Renter)

### 🏡 Owner Dashboard
- Add New Property
- Edit Property Details
- Delete Property
- View All Properties
- View Booking Requests
- Approve Bookings
- Mark Booking as Pending
- Automatic Property Status Updates
- Toast Notifications

### 🏠 Renter Dashboard
- Browse Available Properties
- Search Properties
- View Property Details
- Book Property
- View My Bookings
- Cancel Booking
- Automatic Property Availability Updates
- Responsive Property Cards

### 📊 Property Management
- Property Images
- Property Type
- Ad Type (Rent/Sale)
- Address
- Contact Information
- Price
- Description
- Property Availability

### 🔒 Security
- JWT Authentication
- Protected Routes
- Password Encryption using bcrypt
- Role-Based Authorization

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap 5
- React Toastify
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv

---

## 📁 Project Structure

```
Home-Haven/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/Home-Haven.git
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm start
```

---

## 🌐 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## 📷 Screenshots

Add screenshots of:

- Home Page
- Login
- Register
- Owner Dashboard
- Property Listing
- Booking Page
- My Bookings

---

## 🌍 Deployment

### Frontend
- Vercel

### Backend
- Render

### Database
- MongoDB Atlas

---

## 📌 Future Improvements

- Payment Gateway Integration
- Wishlist / Favorites
- Email Notifications
- Property Reviews & Ratings
- Advanced Search Filters
- Admin Dashboard
- Chat Between Owner & Renter

---

## 👨‍💻 Author

**Sidhanth Kumar Nayak**

GitHub:
https://github.com/sampathsantu-512

LinkedIn:
https://www.linkedin.com/in/sampad-kumar-nayak-01a743320/
---

## 📄 License

This project is developed for educational and internship purposes.