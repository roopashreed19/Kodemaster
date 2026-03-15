const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration - allowing credentials for cookies
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));

// Debugging
console.log("Checking URI...", process.env.MONGO_URI ? "found" : "NOT FOUND");
console.log("Checking JWT Secret...", process.env.JWT_SECRET ? "found" : "NOT FOUND");

// Database Connection
const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gamify_platform";

mongoose.connect(dbURI)
  .then(() => console.log("🔥 Database Connected: Ready for Quests!"))
  .catch(err => console.error("❌ DB Connection Error:", err.message));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/judge', require('./routes/judge'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));