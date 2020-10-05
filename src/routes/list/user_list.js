const { ObjectId } = require('mongodb');
const User = require('../../schema/user/user')
const router = require('express').Router();

router.post('/', (req, res) => {
    try {
        let query = User.find({ _id: { "$ne": req.headers.parsedToken._id } }).select('_id name username school avatar').limit(25);
        query.exec((err, doc) => {
            try {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        response: 2,
                        message: err
                    });
                } else {
                    res.status(200).json({
                        response: 1,
                        total_count: doc.length,
                        items: doc
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