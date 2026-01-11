const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const AuthRouter = require('./Routers/AuthRouter');
const ProfileRouter = require('./Routers/ProfileRouter');
const cors = require('cors');
require('dotenv').config();
require('./Models/database');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/profile', ProfileRouter);

app.get('/', (req, res) => {
  res.send('Welcome to IndianLingo Backend!');
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});