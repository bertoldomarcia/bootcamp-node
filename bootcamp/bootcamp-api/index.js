const express = require('express');
const port = 3000;
const app = express();

app.listen(port, () => {
    console.log(`bootcamp API - porta ${port}`);
});

app.get('/', (req, res) => {
    res.json({status: 'Bootcamp API Ok!'});
});