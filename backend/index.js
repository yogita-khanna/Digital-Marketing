const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const User = require('./models/userSchema')
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8585;

const dotenv = require('dotenv');
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(session({
  secret: 'asdfghjtrewsdfg xcvbnghj',
  resave: false,
  saveUninitialized: true
}));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware


app.use(cors());

app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/contactDetails'));
app.use('/api', require('./routes/Feedback'));
app.use('/api/services', require('./routes/services'));

app.get('*', (req, res) => {
  res.send('Backend is running');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
