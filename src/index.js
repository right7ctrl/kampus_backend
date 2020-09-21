const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Login = require('./routes/auth/login');
const Register = require('./routes/auth/register');
const User = require('./schema/user/user');
const ForgotPassword = require('./routes/auth/forgotPassword');
const ShowProfile = require('./routes/user/showProfile');
const UserList = require('./routes/list/user_list');
const mongoose = require('mongoose');
require('dotenv').config()
app.set('port', process.env.PORT);
app.use(express.json());
// swagger setup
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");



mongoose.connect("mongodb://localhost:27017/myproject", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});


// Routes

//auth routes
app.use('/auth/login', Login);
app.use('/auth/register', Register);
app.use('/auth/forgotPassword', ForgotPassword);

//user routes
app.use('/user/showProfile', ShowProfile);

//list routes
app.use('/list/user', UserList);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
// swagger route