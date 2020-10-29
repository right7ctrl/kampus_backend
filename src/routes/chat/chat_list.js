const { ObjectId } = require('mongodb');
const ChatList = require('../schemes/chat/chat_list');
const Chat = require('../../schema/chat/chat');
const router = require('express').Router();
const User = require('../../schema/user/user');
const { send } = require('../../io/server');

router.post('/', (req, res) => {

    console.log('AWEEWQEQ');
    const { error, value } = ChatList.validate(req.body);
    try {
        console.log(error);
        if (error) {
            res.status(400).json({ response: 2, message: error });
        } else {
            const { id } = req.body;


           let x = Chat.aggregate([
                { $project: { lastFriend: { $arrayElemAt: ['$messages', -1] } } },
              ]);

              x.exec((e, d) => {
                  console.log(e);
                  console.log(d);
              });



            let query = Chat.find({ $or: [{ receiver_id: ObjectId(id) }, { sender_id: ObjectId(id) }] }).select('receiver_id sender_id _id created_at updated_at');
            query.exec(
                async (err, doc) => {
                    console.log(err);
                    if (err) {
                        res.status(500).json({
                            response: 2,
                            message: err
                        });
                    } else {
                        if (doc) {
                            console.log('doc', doc);
                            let returnArr = [];
                            for(let i of doc){
                                let userid = req.headers.parsedToken._id == i.sender_id ? i.receiver_id : i.sender_id;
                                console.log('userid', userid);
                                let user = await User.findOne({ _id: ObjectId(userid) }).select('name');
                                console.log(user);
    
    
                                let returnData = {
                                    _id: i._id,
                                    created_at: i.created_at,
                                    updated_at: i.updated_at,
                                    messages: i.messages
                                }
    
    
                                if (req.headers.parsedToken._id == i.sender_id) {
                                    //iseği atan
                                    returnData['sender'] = { id: i.sender_id, name: req.headers.parsedToken.name };
                                    returnData['receiver'] = { id: i.receiver_id, name: user.name };
    
                                } else {
                                    //karşı taraf
                                    returnData['receiver'] = { id: i.sender_id, name: req.headers.parsedToken.name };
                                    returnData['sender'] = { id: i.receiver_id, name: user.name };
                                }
                                returnArr.push(returnData);
                            }

                           
                            res.status(200).json({ response: 1, items: returnArr });
                        } else {
                            console.log('eee');
                            res.status(200).json({
                                response: 2,
                                message: "Bu id numarasına kayıtlı bir kullanıcı bulunamadı."
                            });
                        }
                    }
                }
            );
        }
    } catch (e) {
        console.log(e);
    }





});


module.exports = router;