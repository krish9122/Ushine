# Beauty Parlour Web App - Markdown Documentation Files

This document contains multiple `.md` file templates for your Beauty Parlour Web Application project.

---

# 1. README.md

```md
# Beauty Parlour Web Application

A modern full-stack Beauty Parlour booking web application built using:

- React + Vite
- Tailwind CSS
- Node.js + Express.js
- MongoDB Atlas
- Firebase Hosting
- Firebase Storage
- JWT Authentication
- Groq AI Chatbot

---

# Features

## User Features
- User Authentication
- Dynamic Slot Booking
- Multiple Service Selection
- Booking History
- Favorite Services
- Profile Picture Upload
- Dark/Light Theme Toggle
- AI Chatbot Assistant
- Email & SMS Notifications

## Admin Features
- Service Management
- Appointment Approval
- Appointment Cancellation
- Working Hours Management
- Analytics Dashboard

---

# Tech Stack

## Frontend
- React + Vite
- Tailwind CSS
- React Router
- Axios

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

## Hosting
- Firebase Hosting

---

# Installation

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Backend Setup

```bash
cd server
npm install
npm run dev
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
TWILIO_SID=your_sid
TWILIO_TOKEN=your_token
GROQ_API_KEY=your_groq_api_key
```

---

# Folder Structure

```bash
client/
server/
```

---

# Deployment

## Frontend
Deploy on Firebase Hosting.

## Backend
Deploy on Render/Railway.

---

# License
MIT
```

---

# 2. PROJECT_STRUCTURE.md

```md
# Project Structure

```bash
beauty-parlour-app/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── utils/
│   ├── services/
│   ├── app.js
│   └── server.js
│
└── README.md
```
```

---

# 3. DATABASE_SCHEMA.md

```md
# Database Schema

# User Schema

```js
{
  name: String,
  email: String,
  password: String,
  profileImage: String,
  favorites: [],
  role: String
}
```

---

# Service Schema

```js
{
  name: String,
  description: String,
  price: Number,
  duration: Number,
  image: String,
  category: String
}
```

---

# Appointment Schema

```js
{
  user: ObjectId,
  services: [],
  appointmentDate: Date,
  startTime: String,
  endTime: String,
  totalDuration: Number,
  status: String,
  approved: Boolean
}
```

---

# Admin Schema

```js
{
  email: String,
  password: String,
  role: 'admin'
}
```
```

---

# 4. API_DOCUMENTATION.md

```md
# API Documentation

# Authentication APIs

## Register User
POST `/api/auth/register`

## Login User
POST `/api/auth/login`

---

# Service APIs

## Get All Services
GET `/api/services`

## Create Service
POST `/api/services`

## Update Service
PUT `/api/services/:id`

## Delete Service
DELETE `/api/services/:id`

---

# Booking APIs

## Create Appointment
POST `/api/bookings`

## Get Available Slots
GET `/api/bookings/slots`

## Cancel Appointment
PUT `/api/bookings/cancel/:id`

---

# Admin APIs

## Approve Booking
PUT `/api/admin/approve/:id`

## Get All Users
GET `/api/admin/users`
```

---

# 5. BOOKING_LOGIC.md

```md
# Booking Logic

# Step 1
User selects services.

# Step 2
System calculates total duration.

Example:
- Haircut = 30 mins
- Facial = 60 mins
- Total = 90 mins

# Step 3
System checks existing bookings.

# Step 4
If overlapping booking exists:
- Slot becomes unavailable.

# Step 5
Admin manually approves appointment.

---

# Overlapping Logic

Example:

Existing booking:
- 2:00 PM → 3:30 PM

Blocked slots:
- 2:00 PM
- 2:30 PM
- 3:00 PM

---

# Real-Time Availability

Use:
- Polling
- Auto refresh API calls

Avoid WebSockets for beginner simplicity.
```

---

# 6. UI_UX_GUIDELINES.md

```md
# UI/UX Guidelines

# Theme

## Default Theme
- Soft pink gradients
- Feminine design
- White cards
- Rounded corners

## Dark Theme
- Dark pink accents
- Purple gradients
- Luxury salon feel

---

# Design Principles

- Responsive Design
- Minimal Layout
- Smooth Animations
- Glassmorphism Effects
- Elegant Typography

---

# Required Sections

- Hero Section
- Featured Services
- Testimonials
- Booking Section
- Footer
- Contact Form
```

---

# 7. FIREBASE_SETUP.md

```md
# Firebase Hosting Setup

# Install Firebase CLI

```bash
npm install -g firebase-tools
```

---

# Login

```bash
firebase login
```

---

# Initialize Firebase

```bash
firebase init
```

Select:
- Hosting

---

# Build React App

```bash
npm run build
```

---

# Deploy

```bash
firebase deploy
```
```

---

# 8. MONGODB_SETUP.md

```md
# MongoDB Atlas Setup

# Step 1
Create MongoDB Atlas account.

# Step 2
Create new cluster.

# Step 3
Create database user.

# Step 4
Whitelist IP address.

# Step 5
Copy connection string.

---

# Example Connection String

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
```
```

---

# 9. CHATBOT_INTEGRATION.md

```md
# Groq AI Chatbot Integration

# Features

- Beauty service suggestions
- Booking help
- Salon assistant chatbot
- Friendly responses

---

# Backend API

POST `/api/chat`

---

# Required Environment Variable

```env
GROQ_API_KEY=your_api_key
```

---

# Frontend Features

- Floating chat button
- Chat popup
- Responsive chatbot UI
```

---

# 10. DEPLOYMENT_GUIDE.md

```md
# Deployment Guide

# Frontend Deployment

Platform:
- Firebase Hosting

Commands:

```bash
npm run build
firebase deploy
```

---

# Backend Deployment

Platform:
- Render
- Railway

---

# Environment Variables

Set:
- MONGO_URI
- JWT_SECRET
- GROQ_API_KEY
- EMAIL_USER
- EMAIL_PASS
```

