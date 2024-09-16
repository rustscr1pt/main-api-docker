const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

const port = process.env.DEPLOY_PORT || 8004;

app.use(cors()); // Enabled CORS for all origins! Needs fixing before moving to product.

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const directoryPath = path.join(__dirname, 'public/images');

app.get('/image-plugin/extract_images/', (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        else {
            let returnable_array = [];
            files.forEach((file_path) => {
                if (!file_path.includes('.svg')) {
                    returnable_array.push(`https://new-api.space/images/${file_path}`)
                }
            })
            res.json({
                extracted : returnable_array
            });
        }
    })
});

app.get('/image-plugin/extract_buttons/', (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        else {
            let returnable_array = [];
            files.forEach((file_path) => {
                if (!file_path.includes('.jpg')) {
                    returnable_array.push(`https://new-api.space/images/${file_path}`)
                }
            })
            res.json({
                extracted : returnable_array
            });
        }
    })
});


app.listen(port, () => {
    console.log(`Images Plugin Express Api is running at http://localhost:${port}`);
});