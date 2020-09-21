const product = require('../schemes/test')
const router = require('express').Router();
const User = require('../../schema/user/user');
const showprofile = require('../schemes/auth/showprofile_validation');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

router.post('/', (req, res) => {
    const { error, value } = showprofile.validate(req.body);
    try {
        if (error) {
            res.status(400).json({ response: 2, message: error });
        } else {
            const { id, } = req.body;

            // let query = user.findOne({ id: id }).select('_id name username school avatar');
            user.insert({ x: 1 });
            let query = user.find((ObjectId("5f664fc49a963c1f74a13bad")), { "_id": ObjectId("5f664fc49a963c1f74a13bad"), "x": 1 }).select('id name username school avatar');
            //select('_id name username school avatar');
            query.exec(
                (err, doc) => {
                    if (err) {
                        res.status(500).json({
                            response: 2,
                            message: err
                        });
                    } else {
                        if (doc) {
                            res.status(500).json({
                                response: 2,
                                message: "Bu id numarasına kayıtlı bir kullanıcı bulunamadı."
                            });
                        } else {
                            res.status(200).json({ response: 1, message: doc });
                        }
                    }
                }
            );
        }

    } catch (e) {
        res.status(502), json({ response: 2, message: e });
    }


});

module.exports = router;


//5f664fc49a963c1f74a13bad