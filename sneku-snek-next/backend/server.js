const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();
const connectDB = require('./config/db');

// Connect to the database
connectDB();
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  

// Middleware to parse JSON requests
app.use(express.json());

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.get('/test', (req, res) => {
    res.json({ message: 'CORS is working!' });
});


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
