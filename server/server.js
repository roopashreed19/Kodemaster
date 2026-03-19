
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// 1. Initialize App
const app = express();

// 2. Middleware (MUST come before routes)
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// 3. Debugging Logs
console.log("Checking URI...", process.env.MONGO_URI ? "found" : "NOT FOUND");

// 4. Database Connection
// Ensure your .env MONGO_URI includes /gamify_platform before the '?'
const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gamify_platform";

mongoose.connect(dbURI)
  .then(() => console.log("🔥 Database Connected: Ready for Quests!"))
  .catch(err => console.error("❌ DB Connection Error:", err.message));

// 5. Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/judge', require('./routes/judge'));
app.use('/api/user', require('./routes/user'));
app.use('/api/challenges', require('./routes/challenges'));
app.use('/api/aptitude', require('./routes/Aptitude'));
app.use('/api/cn', require('./routes/cn'));
app.use('/api/oops', require('./routes/oops'));
app.use('/api/dbms', require('./routes/dbms'));
// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));