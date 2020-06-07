const express = require('express');

const app = express();

app.use(express.static('./dist/tpvAngular'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/tpvAngular/' }),
);

app.listen(process.env.PORT || 8080);