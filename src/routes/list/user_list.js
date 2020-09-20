const product = require('../schemes/test')
const user = require('../../schema/user/user')
const router = require('express').Router();

router.post('/', (req, res) => {
    let query = user.find({}).select('_id name username school avatar').limit(25);

    query.exec((err, doc) => {
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
    });

});


module.exports = router;