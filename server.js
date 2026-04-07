const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const hostname = '127.0.0.1';

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const { jsonmiddleware, generateToken } = require("./Routes/jwt.js");
// Import routes
console.error('Internal Server Error');
res.status(500).send('Internal Server Error');
const router = require('./Routes/routes.js'); // Assuming you have a routes file for all user routes
const candidateRoutes = require('./Routes/croutes.js');
// Use routes
app.use('/user', router);
app.use("/candidate", candidateRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
