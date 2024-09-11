const express = require('express');
const app = express();
const routes = require('./routes/routes');

const port = process.env.DEPLOY_PORT || 8002;

app.use(express.json());
app.use(routes);

app.listen(port, function() {
    console.log(`Express token API started at http://localhost:${port}`)
});