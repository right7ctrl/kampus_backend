const product = require('../schemes/test')
const router = require('express').Router();
const User = require('../../schema/user/user');
const forgotPassword = require('../schemes/auth/forgotpassword_validation');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

router.post('/', (req, res) => {
    const { error, value } = forgotPassword.validate(req.body);
    if (error) {
        res.status(400).json({ response: 2, message: error });
    } else {
        const { email, } = req.body;
        var query = User.findOne({ email: email, }).select('email');
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
                            message: "Bu mail adresine kayıtlı bir kullanıcı bulunamadı."
                        });
                    } else {
                        res.status(200).json({ response: 1, message: "Mail adresinize şifre sıfırlama maili gönderildi." });
                    }
                }
            }
        );
    }
});

module.exports = router;