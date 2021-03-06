const express = require('express');
const app = express();
const Login = require('./routes/auth/login');
const Register = require('./routes/auth/register');
const User = require('./schema/user/user');
const Message = require('./schema/message/message');
const ForgotPassword = require('./routes/auth/forgotPassword');
const ShowProfile = require('./routes/user/showProfile');
const UserList = require('./routes/list/user_list');
const ChatList = require('./routes/chat/chat_list');
const ChatDetail = require('./routes/chat/chat_detail');
const mongoose = require('mongoose');
const JwtMiddleware = require('./middlewares/auth_middleware');
require('dotenv').config()
app.set('port', process.env.PORT || 8080);
app.use(express.json());

//78.47.144.207
mongoose.connect("mongodb://-/myproject", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    console.log('REQ');

    next();
});


//auth routes
app.use('/auth/login', Login);
app.use('/auth/register', Register);
app.use('/auth/forgotPassword', ForgotPassword);

//user routes
app.use('/user/showProfile', JwtMiddleware, ShowProfile);

//list routes
app.use('/list/user', JwtMiddleware, UserList);

app.use('/chat/list', JwtMiddleware, ChatList);
app.use('/chat/detail', JwtMiddleware, ChatDetail);





// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
