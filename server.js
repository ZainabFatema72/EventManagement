// server.js .............npm start..............
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//frontend
const cors = require('cors');
dotenv.config(); // Load .env file
connectDB();     // Connect to MongoDB
const app = express();
//middleware
app.use(cors({
  origin: 'https://eventlyhubb.netlify.app' 
})); 

app.use(express.json()); // Body parser for JSON

// Models
const Event = require('./model/eventModel');
const Booking = require('./model/bookingModel');
const User= require('./model/userModel')
// Import Routes
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const notificationRoutes = require("./routes/notificationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");


// Mount your route files here
app.use("/api/auth", authRoutes);//GET /api/auth/profile
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/notifications", notificationRoutes);
// Optional default route
app.get("/", (req, res) => {
  res.send("Welcome to Event Booking API");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
/*/| Route          | Method | URL                  | Description       |
| -------------- | ------ | -------------------- | ------------------- |
| Register       | POST   | `/api/auth/register` | Register a new user |
| Login          | POST   | `/api/auth/login`    | Login and get token |
| Get Profile    | GET    | `/api/auth/profile`  | Get current user    |
| Update Profile | PUT    | `/api/auth/profile`  | Update current user |
*/
//net start MongoDB
// to start the mongodb to fetching the data