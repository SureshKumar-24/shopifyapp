const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swaggerConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/view', (req, res) => {
    res.render('user-view');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const user = require('./routes/user_route');
app.use(user);
app.use(morgan('dev'));
// app.use(cors());
app.use(cors({
    origin: ['https://76dd-2405-201-5023-4823-80f5-7861-7db8-d40c.ngrok-free.app','https://shopsyncservices.myshopify.com','https://shopsyncservices.myshopify.com/account/register'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // You might want to change '*' to the specific origin you want to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.get('/hello', (req, res) => {
    return res.status(200).json({ success: true, status: 200, msg: "App running Successfully" });
});

app.listen(3000, () => {
    console.log('App Running Successfully 1');
})