var app = require('express')();
var http = require('http').createServer(app);
let io = require('socket.io').listen(http);
const User = require('../schema/user/user');
const dotenv = require('dotenv');
const { ObjectId } = require('mongodb');
const db = require('../../src/conn/db');
dotenv.config();

let activeCount = 0;

io.sockets.on('connect', (socket) => {
    let userid;
    console.log(activeCount);

    socket.on('register', (user) => {
        activeCount += 1;
        userid = user;
        let q = User.findOne(ObjectId(user)).select('_id name username mail created_at isOnline');
        q.exec((err, doc) => {
            if (err) {
                console.log(err);
            } else {
                if (doc) {
                    console.log(doc);
                    doc.isOnline = true;
                    doc.save();
                } else {
                    console.log('Doc empty');
                }
            }
        });
    });


    socket.on('disconnect', (data) => {
        activeCount -= 1;
        try {
            let q = User.findOne(ObjectId(userid)).select('_id name username mail created_at isOnline');
            q.exec((err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    if (doc) {
                        console.log(doc);
                        doc.isOnline = false;
                        doc.save();
                    } else {
                        console.log('Doc empty');
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }

        console.log(activeCount);

    });


});



http.listen(process.env.SOCKET_PORT, function () {
    console.log('listening on *:' + process.env.SOCKET_PORT);
});

module.exports = io;