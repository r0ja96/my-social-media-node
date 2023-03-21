require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(cookieParser());

app.use(express.json({ limit: '50mb' }));
//app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE).then(() => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}).catch((e) => {
    console.log('Error: ' + e)
});

