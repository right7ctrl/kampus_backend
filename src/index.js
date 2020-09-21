const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Login = require('./routes/auth/login');
const Register = require('./routes/auth/register');
const User = require('./schema/user/user');
const ForgotPassword = require('./routes/auth/forgotPassword');
const ShowProfile = require('./routes/user/showProfile');
const UserList = require('./routes/list/user_list');
const AuthMw = require('./middlewares/auth_middleware');
require('dotenv').config()
app.set('port', process.env.PORT);
app.use(express.json());
app.use(bodyParser.json())
// swagger setup
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");

// Routes

//auth routes
app.use('/auth/login', Login);
app.use('/auth/register', Register);
app.use('/auth/forgotPassword', ForgotPassword);

//user routes
app.use('/user/showProfile', AuthMw, ShowProfile);

//list routes
app.use('/list/user', AuthMw, UserList);

app.get('/', (req, res) => {

    const user = User({
        name: "aliveli",
        username: "@veliali",
        mail: "aliveli@mail.com",
        password: "aliveli",
        school: "erü"

    });

    user.save((err, a) => {
        console.log(err);
    });



    res.send('Index');
});

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


// swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));