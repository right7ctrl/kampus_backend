const product = require('../schemes/test')
const router = require('express').Router();
const User = require('../../schema/user/user');
const LoginValidator = require('../schemes/auth/login_validation');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

router.post('/', (req, res) => {
    
    try {
        const { error, value } = LoginValidator.validate(req.body);
        if (error) {
            res.status(400).json({ response: 2, message: "Eksik veri", error });
        } else {
            const { email, password } = req.body;
            var query = User.findOne({ email: email, password: password }).select('_id name username email phone bio avatar school');
            query.exec(
                (err, doc) => {
                    if (err) {
                        res.status(500).json({
                            response: 2,
                            message: err
                        });
                    } else {
                        if (doc) {
                            const d = new Date();
                            req.body.date = d.getTime();
                            const token = jwt.sign(JSON.stringify(doc), process.env.JWT_SECRET);
                            doc.token = token;
                            doc.save();
                            res.json({
                                response: 1,
                                token: doc.token
                            });
                        } else {
                            res.status(403).json({
                                response: 2,
                                message: "Kullanıcı adı ve/veya mail adresiniz eşleşmedi. Bilgilerinizi kontrol edip tekrar deneyin."
                            });
                        }
                    }
                }
            );
        }
    } catch (e) {
        res.status(502).json({
            response: 2,
            message: e
        });
    }

});


module.exports = router;