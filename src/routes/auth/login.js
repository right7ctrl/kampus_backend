const product = require('../schemes/test')
const router = require('express').Router();
const User = require('../../schema/user/user');
const LoginValidator = require('../schemes/auth/login_validation');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

router.post('/', (req, res) => {
    const { error, value } = LoginValidator.validate(req.body);
    if (error) {
        res.status(400).json({ response: 2 });
    } else {
        const { email, password } = req.body;
        User.findOne({ email: email, password: password }, (err, doc) => {
            if (err) {
                res.status(500).json({
                    response: 2,
                    message: err
                });
            } else {
                if (doc) {
                    const d = new Date();
                    req.body.date = d.getTime();
                    const token = jwt.sign(JSON.stringify(req.body), '3cfe170c');
                    doc.token = token;
                    doc.save();
                    res.json({
                        response: 1,
                        token: doc.token
                    });
                } else {
                    res.status(403).json({
                        response: 2,
                        message: "Kullanıcı adı veya mail adresi geçersiz."
                    });
                }

            }
        });



    }
});


module.exports = router;