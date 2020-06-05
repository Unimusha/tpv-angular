const express = require('express');

const app = express();

app.use(express.static('./dist/tpv-angular'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/tpv-angular/' }),
);

app.listen(process.env.PORT || 8080);