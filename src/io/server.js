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
        console.log(user);
        User.findOne({ _id: "5f67563f77366967dc7f73e3" }, (err, doc) => {
                if (err) {
                    console.log('query_error: ' + err);
                } else {
                    if (doc) {
                        console.log(doc);
                        doc.isOnline = true;
                        doc.save();
                    } else {
                        console.log('userid is invalid');
                    }
                }
            });
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