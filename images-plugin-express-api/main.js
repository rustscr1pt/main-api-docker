const express = require('express');
const cors = require('cors');
const app = express();
const core_router = require('./routes/core_router');
const {static_path} = require("./structs/constants");
const {port} = require('./structs/constants');

// // Enabled CORS for all origins! Needs fixing before moving to product.
// app.use(cors());

app.use(express.json());

// Serve static files from the "public" directory
app.use(static_path);

// Add router
app.use(core_router)

app.listen(port, () => {
    console.log(`Images Plugin Express Api is running at http://localhost:${port}`);
});