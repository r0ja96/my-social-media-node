const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const port = 4400;

app.use(cors());

app.use(express.json());

app.use(routes);

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mySocialMedia').then(() => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}).catch((e) => {
    console.log('Error: ' + e)
});

