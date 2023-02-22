require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use(routes);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE).then(() => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}).catch((e) => {
    console.log('Error: ' + e)
});

