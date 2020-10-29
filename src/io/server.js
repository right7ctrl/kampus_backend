var app = require('express')();
var http = require('http').createServer(app);
let io = require('socket.io').listen(http);
const User = require('../schema/user/user');
const Message = require('../schema/message/message');
const dotenv = require('dotenv');
const { ObjectId } = require('mongodb');
const db = require('../../src/conn/db');
const Chat = require('../schema/chat/chat');
dotenv.config();

let activeCount = 0;
let activeUsers = [];
let socketID;
let ioID;
let registered = [];

io.sockets.on('connect', (socket) => {
    socketID = socket.id;
    console.log(socketID);
    console.log(activeCount);

    socket.on('register', (user) => {
        ioID = user;
        console.log('IO: ', ioID);

        if (user) {
            let q = User.findOne(ObjectId(ioID)).select('_id name username mail created_at isOnline');
            q.exec((err, doc) => {
                if (err) throw err;

                if (doc) {
                    console.log(doc);
                    const found = activeUsers.find(element => element._id == ioID);
                    if (activeUsers.indexOf(found) == -1) {
                        doc.isOnline = true;
                        doc.save();
                        let user = {
                            _id: doc._id,
                            name: doc.name,
                            username: doc.username,
                            socketid: socketID
                        }
                    } else {
                        console.log('already connected' + activeUsers);
                    }
                    console.log(activeUsers);
                    registered[ioID] = socket.id;
                } else {
                    console.log('User not found');
                }

            });
            console.log(activeUsers);
        } else {
            console.log('yser ', user);
        }


    });



    socket.on('send_msg', (data) => {
        // TODO: if the receiver is offline, should get a push notification
        try {
            const { message, receiver_id, sender_id } = JSON.parse(data);
     

            if (receiver_id === sender_id) {
                console.log('cannot send message to its own');
                return;
            }


            let query = Chat.findOne({
                $or: [
                    { $and: [{ receiver_id: ObjectId(receiver_id) }, { sender_id: ObjectId(sender_id) }] },
                    { $and: [{ sender_id: ObjectId(receiver_id) }, { receiver_id: ObjectId(sender_id) }] },
                ]
            });

            query.exec((err, doc) => {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;

                if (err) throw err;
                if (!doc) {
                    const chat = Chat({
                        receiver_id: ObjectId(receiver_id),
                        sender_id: ObjectId(sender_id),
                        messages: [
                            { message: message, sender_id: sender_id, created_at: dateTime }
                        ]
                    });
                    chat.save();
                } else {
                    doc.messages.push({ message: message, sender_id: sender_id, created_at: dateTime });
                    doc.save();
                }

                console.log('SENDER_ID: ', sender_id);

                socket.to(registered[receiver_id]).emit('receive_msg', { message: message, sender_id: sender_id });
            });
        } catch (e) {
            console.log(e);
        }
    });


    socket.on('disconnect', (data) => {
        try {
            const found = activeUsers.find(element => element._id == ioID);
            if (activeUsers.indexOf(found) > -1) {
                activeUsers.splice(activeUsers.indexOf(found), 1);
            }
        } catch (e) {
            console.log(e);
        }
        console.log(activeUsers);
    });


});



http.listen(process.env.SOCKET_PORT, function () {
    console.log('listening on *:' + process.env.SOCKET_PORT);
});

module.exports = io;