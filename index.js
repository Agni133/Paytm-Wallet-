const express = require('express');
const cors = require('cors');
const rootrouter = require('./routes/index'); // Ensure the path is correct

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON request bodies

// Routes
app.use("/api/v1", rootrouter);  // Prefix all routes with '/api/v1'

// Start the server
app.listen(3000);

