const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Login = require('./routes/auth/login');
const User = require('./schema/user/test');
const db = require('./connection/connection');
const UserList = require('./routes/user/user_list');
app.set('port', 3008);
app.use(express.json());
app.use(bodyParser.json())

// Routes
app.use('/auth/login', Login);
app.use('/user', UserList);

app.get('/', (req, res) => {

    const user = User({
        name: "aliveli",
        username: "@veliali"
    });
    
    user.save((err, a)=>{
        console.log(err);
    });
    


    res.send('Index');
});

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});