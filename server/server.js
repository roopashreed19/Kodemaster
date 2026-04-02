
const path = require('path');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.frontendurl,process.env.backendurl],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


console.log("Checking URI...", process.env.MONGO_URI ? "found" : "NOT FOUND");


const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => console.log("Database Connected: Ready for Quests!"))
  .catch(err => console.error("DB Connection Error:", err.message));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/judge', require('./routes/judge'));
app.use('/api/user', require('./routes/user'));
app.use('/api/challenges', require('./routes/challenges'));
app.use('/api/aptitude', require('./routes/Aptitude'));
app.use('/api/cn', require('./routes/cn'));
app.use('/api/oops', require('./routes/oops'));
app.use('/api/dbms', require('./routes/dbms'));
app.use('/api/os', require('./routes/os'));

 
const PORT = process.env.PORT||5000;
app.get('/', (req, res) => {
  res.json({
    msg:"Backend is running"
  })
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));