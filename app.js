const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/view', (req, res) => {
    res.render('user-view');
});

const user = require('./routes/user_route');
app.use(user);
app.use(morgan('dev'));
app.use(cors());

app.get('/hello', (req, res) => {
    return res.status(200).json({ success: true, status: 200, msg: "express request" });
});

app.listen(3000, () => {
    console.log('App Running Successfully 1');
})