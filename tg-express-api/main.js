const express = require('express');
const app = express();
const core_router = require('./routes/core_router');
const port = process.env.DEPLOY_PORT || 8001;

app.use(express.json());
app.use(core_router);

// Route for keeping the module alive
app.get('/health/', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, function() {
    console.log(`Express notifications API started at http://localhost:${port}`)
});

// Keep alive mechanism
setInterval(async () => {
    const fetch = (await import('node-fetch')).default;
    fetch(`http://localhost:${port}/health`)
        .then(res => console.log('Keep-alive ping successful:', res.status))
        .catch(err => console.error('Keep-alive ping failed:', err));
}, 300000); // Every 5 minutes (300,000 ms)
