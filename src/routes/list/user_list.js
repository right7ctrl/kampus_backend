const product = require('../schemes/test')
const user = require('../../schema/user/user')
const router = require('express').Router();

router.post('/', (req, res) => {
    try {
        let query = user.find({}).select('_id name username school avatar').limit(25);
        query.exec((err, doc) => {
            try {
                if (err) {
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
                res.status(502).json({ response: 2, message: e });
            }

        });
    } catch (e) {
        res.status(502).json({ response: 2, message: e });
    }


});


module.exports = router;