var app = require('express')();
var http = require('http').createServer(app);
let io = require('socket.io').listen(http);
const User = require('../schema/user/user');
const dotenv = require('dotenv');
dotenv.config();

io.sockets.on('connect', (socket) => {
    console.log("someone connected");
    let userid;

    //authorize user to get notify by socket server
    socket.on('register', (user) => {
        console.log('reg');
        try {
            console.log(user.id);
            User.findOne({ _id:  user._id}, (err, doc) => {
                console.log(user);
                if (err) {
                    console.log('query_error: ' + err);
                } else {
                    if (doc) {
                        doc.isOnline = true;
                        doc.save();
                    } else {
                        console.log('userid is invalid');
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    });


    socket.on('disconnect', (data) => {
        try {
            console.log('Disconnected: ' + data.uuid);

        } catch (e) {
            console.log(e);
        }

    });


});



http.listen(process.env.SOCKET_PORT, function () {
    console.log('listening on *:' + process.env.SOCKET_PORT);
});

module.exports = io;