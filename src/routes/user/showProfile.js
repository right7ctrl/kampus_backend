const router = require('express').Router();
const User = require('../../schema/user/user');
const showprofile = require('../schemes/auth/showprofile_validation');
const { json } = require('body-parser');
const { ObjectId } = require('mongodb');

router.post('/', (req, res) => {
    const { error, value } = showprofile.validate(req.body);
    try {
        console.log(error);
        if (error) {
            res.status(400).json({ response: 2, message: error });
        } else {
            const { id } = req.body;
            let query = User.findOne(ObjectId(id)).select('_id username name mail avatar school bio grade department').limit(1);
            query.exec(
                (err, doc) => {
                    console.log(err);
                    if (err) {
                        res.status(500).json({
                            response: 2,
                            message: err
                        });
                    } else {
                        if (doc) {
                            res.status(200).json({ response: 1, items: [doc] });
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


//5f664fc49a963c1f74a13bad