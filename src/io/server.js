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

let registered = [];

io.sockets.on('connect', (socket) => {
    let ioID;
    socketID = socket.id;

    if (!socket.handshake.query._id) return;
    ioID = socket.handshake.query._id;

    let q = User.findOne(ObjectId(ioID)).select('isOnline');
    q.exec((err, doc) => {
        if (err) throw err;
        if (doc) {
            if (!registered[ioID]) {
                registered[ioID] = socket.id
                doc.isOnline = true;
                doc.save();
            } else {
                console.log('Handshake failed, user already connected: ', ioID);
            }
        } else {
            console.log('Handshake failed, user not found: ', ioID);
        }
        console.log('REGISTERED_CON: ', registered);
    });


    /* 
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
                        if (!registered[ioID])  registered[ioID] = socket.id;
                    } else {
                        console.log('User not found');
                    }
    
                });
                console.log(activeUsers);
            } else {
                console.log('yser ', user);
            }
    
            io.emit('registered', registered);
    
    
        });
    
     */

    socket.on('send_msg', (data) => {
        // TODO: if the receiver is offline, should get a push notification
        try {
            const { message, receiver_id, sender_id } = JSON.parse(data);
            if (!registered[sender_id]) {
                console.log('register first');
                return;
            }
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
                            { message: message, sender_id: sender_id, created_at: dateTime, seen_by: [sender_id] }
                        ]
                    });
                    chat.save();
                } else {
                    doc.messages.push({ message: message, sender_id: sender_id, created_at: dateTime, seen_by: [sender_id] });
                    doc.save();
                }
                socket.to(registered[receiver_id]).emit('receive_msg', { message: message, sender_id: sender_id });
            });
        } catch (e) {
            console.log(e);
        }
    });

    //data içinde receiver_id var
    socket.on('seen', (data) => {
        let receiver_id = data.receiver_id;
        let sender_id = ioID;

        if (!receiver_id || !sender_id) { console.log('eksik'); return; }

        let query = Chat.findOne({
            $or: [
                { $and: [{ receiver_id: ObjectId(receiver_id) }, { sender_id: ObjectId(sender_id) }] },
                { $and: [{ sender_id: ObjectId(receiver_id) }, { receiver_id: ObjectId(sender_id) }] },
            ]
        });

        query.exec(async (err, chat) => {
            console.log(err);
            console.log(chat);
            chat.messages.forEach( async (f) => {
                if (f.seen_by) {
                    f.seen_by.push('qweqwe');
                    await chat.save();
                }
            });



        });

    });


    socket.on('disconnect', async (data) => {
        console.log('Client disconnected: ', ioID);
        delete registered[ioID];
        console.log('REGISTERED_DC', registered);
        try {
            let q = User.findOne(ObjectId(ioID)).select('isOnline');
            q.exec((err, doc) => {
                if (err) throw Error;
                doc.isOnline = false;
                doc.save();
                console.log(doc);
            });
        } catch (e) {
            console.log(e);
        }
    });
});



http.listen(process.env.SOCKET_PORT, function () {
    console.log('listening on *:' + process.env.SOCKET_PORT);
});

module.exports = io;