const product = require('../schemes/test')
const router = require('express').Router();
const User = require('../../schema/user/user');
const LoginValidator = require('../schemes/auth/login_validation');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

router.post('/', (req, res) => {
    const { error, value } = LoginValidator.validate(req.body);
    if (error) {
        res.status(400).json({ response: 2, token: token });
    } else {
        //const token = jwt.sign(JSON.stringify(req.body), '3cfe170c');
        User.findOne({mail: req.body.email, password: req.body.password}, (err, doc) => {
            if (err) {
                res.status(500).json({
                    response: 2,
                    msg: err
                });
            } else {
               doc.token = "qweqeqqweqw";
               doc.save();

               res.json(doc);
            }
        });



    }
});


module.exports = router;