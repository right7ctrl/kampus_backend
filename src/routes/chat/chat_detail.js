const router = require('express').Router();
const detail = require('../schemes/chat/chat_detail');
const Chat = require('../../schema/chat/chat');
const { ObjectId } = require('mongodb');

router.post('/', (req, res) => {
    try {
        const { error, value } = detail.validate(req.body);
        if (error) throw error;
        const t = req.headers.parsedToken;
        let query = Chat.findOne({ $or: [{ sender_id: ObjectId(t._id), receiver_id: ObjectId(req.body.id) }, { receiver_id: ObjectId(t._id), sender_id: ObjectId(req.body.id) }] }).select('messages').limit(1);
        query.exec((err, doc) => {
            try {
                if (err) throw err;
                if (doc) {
                    res.status(200).json({
                        response: 1,
                        messages: doc.messages
                    });
                } else {
                    res.status(200).json({
                        response: 1,
                        messages: []
                    });
                }

            } catch (e) {
                console.log(e);
                res.status(502).json({ response: 2, message: e });
            }

        });
    } catch (e) {
        console.log(e);
        res.status(502).json({ response: 2, message: e });
    }

});


module.exports = router;