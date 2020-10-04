const router = require('express').Router();
const User = require('../../schema/user/user');
const showprofile = require('../schemes/auth/showprofile_validation');
const { json } = require('body-parser');
const { ObjectId } = require('mongodb');

router.post('/', (req, res) => {
    const { error, value } = showprofile.validate(req.body);

    if (error) {
        res.status(400).json({ response: 2, message: error });
    } else {
        const { id } = req.body;
        let query = User.findOne(ObjectId(id)).select('_id name username mail avatar school');
        query.exec(
            (err, doc) => {
                if (err) {
                    res.status(500).json({
                        response: 2,
                        message: err
                    });
                } else {
                    if (doc) {
                        res.status(200).json({ response: 1, message: doc });
                    } else {
                        res.status(500).json({
                            response: 2,
                            message: "Bu id numarasına kayıtlı bir kullanıcı bulunamadı."
                        });
                    }
                }
            }
        );
    }


});

module.exports = router;


//5f664fc49a963c1f74a13bad