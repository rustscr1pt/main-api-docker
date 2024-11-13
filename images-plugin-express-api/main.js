const express = require('express');
const app = express();
const core_router = require('./routes/core_router');
const {static_path} = require("./structs/constants");
const fetch = require('node-fetch');
const {port} = require('./structs/constants');

app.use(express.json());

// Serve static files from the "public" directory
app.use(static_path);

// Add router
app.use(core_router);

// Route for keeping the module alive
app.get('/health/', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Images Plugin Express Api is running at http://localhost:${port}`);
});

// Keep alive mechanism
setInterval(() => {
    fetch(`http://localhost:${port}/health/`)
        .then(res => console.log('Keep-alive ping successful:', res.status))
        .catch(err => console.error('Keep-alive ping failed:', err));
}, 300000); // Every 5 minutes (300,000 ms)