const product = require('../schemes/test')
const user = require('../../schema/user/user')


const router = require('express').Router();

router.get('/', (req, res) => {
    user.find({}, (err, doc) => {
        if (err) {
            res.status(500).json({
                response: 2,
                msg: err
            });
        } else {
            res.status(200).json({
                response: 1,
                data: doc,
            });
        }
    });
});


module.exports = router;


// User.findOne({mail: req.body.email, password: req.body.password}, (err, doc) => {
//     if (err) {
//         res.status(500).json({
//             response: 2,
//             msg: err
//         });
//     } else {
//        doc.token = "qweqeqqweqw";
//        doc.save();

//        res.json(doc);
//     }
// });