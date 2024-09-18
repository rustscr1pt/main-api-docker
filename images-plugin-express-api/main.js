const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const app = express();
const core_router = require('./routes/core_router');
const {static_path} = require("./structs/constants");

const port = process.env.DEPLOY_PORT || 8004;

// Enabled CORS for all origins! Needs fixing before moving to product.
app.use(cors());

// Serve static files from the "public" directory
app.use(static_path);

// Add router
app.use(core_router)

app.listen(port, () => {
    console.log(`Images Plugin Express Api is running at http://localhost:${port}`);
});