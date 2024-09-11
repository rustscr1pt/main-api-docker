const express = require('express');
const app = express();
const core_router = require('./routes/core_router');

const port = process.env.DEPLOY_PORT || 8001;

app.use(express.json());
app.use(core_router);

app.listen(port, function() {
    console.log(`Express notifications API started at http://localhost:${port}`)
});
