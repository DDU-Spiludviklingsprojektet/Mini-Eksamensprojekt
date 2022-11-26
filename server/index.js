const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;
let server;

// middleware

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(bodyParser.json({ limit: '20mb' }));

app.use('/api/users', userRoutes);


mongoose.connect(process.env.DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() =>  console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB', err));

server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

