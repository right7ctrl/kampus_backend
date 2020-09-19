const product = require('../schemes/test')
const User = require('../../schema/user/user')
const RegisterValidation = require('../schemes/auth/register_validation');


const router = require('express').Router();

router.post('/', (req, res) => {
    const { error, value } = RegisterValidation.validate(req.body);
    if (error) {
        res.status(400).json({ response: 2, valu: value });
    } else {
        const { name, username, mail, password, school } = req.body;
        const user = User({
            name,
            username,
            mail,
            password,
            school
        });

        user.save((err, a) => {
            console.log(err);
            if (err) {
                res.status(500).json({ response: 2 });
            } else {
                res.status(200).json({ response: 1, msg: "kayıt" });
            }
        });

    }





});

module.exports = router;