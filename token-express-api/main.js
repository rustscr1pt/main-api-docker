const express = require('express');
const app = express();
const routes = require('./routes/routes');
const fetch = require('node-fetch');

const port = process.env.DEPLOY_PORT || 8002;

// Route for keeping the module alive
app.get('/health/', (req, res) => {
    res.status(200).send('OK');
});

app.use(express.json());
app.use(routes);

app.listen(port, function() {
    console.log(`Express token API started at http://localhost:${port}`)
});

// Keep alive mechanism
setInterval(() => {
    fetch(`http://localhost:${port}/health`)
        .then(res => console.log('Keep-alive ping successful:', res.status))
        .catch(err => console.error('Keep-alive ping failed:', err));
}, 300000); // Every 5 minutes (300,000 ms)