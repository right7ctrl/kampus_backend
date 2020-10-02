var app = require('express')();
var http = require('http').createServer(app);
let io = require('socket.io').listen(http);
const User = require('../schema/user/user');
const Message = require('../schema/message/message');
const dotenv = require('dotenv');
const { ObjectId } = require('mongodb');
const db = require('../../src/conn/db');
dotenv.config();

let activeCount = 0;
let activeUsers = [];
let socketID;

io.sockets.on('connect', (socket) => {
    socketID = socket.id;
    console.log(socketID);
    let ioID;
    console.log(activeCount);

    socket.on('register', (user) => {
        ioID = user;
        let q = User.findOne(ObjectId(ioID)).select('_id name username mail created_at isOnline');
        q.exec((err, doc) => {
            console.log(doc);
            if (err) {
                console.log(err);
            } else {
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
                        activeUsers.push(user);
                        console.log(activeUsers);
                    } else {
                        console.log('already connected' + activeUsers);
                    }
                    console.log(activeUsers);
                } else {
                    console.log('User not found');
                }
            }
        });
        console.log(activeUsers);
    });



    socket.on('send_msg', (data) => {
        /**
 *  
 *  Message payload should be like below
 * { message: "message here", receiver_id: ObjectId(...) }
 * {"message": "message here", "receiver_id": "5f66435c6170cf3aeaf1ab7b"}
 */
        // TODO: user can not send message to its own
        // TODO: if the receiver is offline, should get a push notification
        try {
            const { message, receiver_id } = JSON.parse(data);
            const messageItem = Message({
                room_id: ioID + '-' + receiver_id,
                message: message,
                sender_id: ObjectId(ioID),
                receiver_id: ObjectId(receiver_id)
            });
            messageItem.save();
            console.log('received. ' + { message: message, sender_id: ioID });
            socket.to(socketID).emit('receive_msg', { message: message, sender_id: ioID });

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