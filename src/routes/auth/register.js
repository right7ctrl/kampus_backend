const product = require('../schemes/test')
const User = require('../../schema/user/user')
const RegisterValidation = require('../schemes/auth/register_validation');
const router = require('express').Router();

router.post('/', (req, res) => {
    const { error, value } = RegisterValidation.validate(req.body);


    try {
        if (error) {
            res.status(400).json({ response: 2, message: error });
        } else {
            const { name, username, email, password, school } = req.body;
            //check user's email or username, if its already taken
            User.findOne({ email: email }, (err, doc) => {
                if (err) {
                    res.status(500).json({ response: 2, message: err });
                } else {
                    if (!doc) {

                        User.findOne({ username: username }, (err, doc) => {
                            if (err) {
                                res.status(500).json({ response: 2, message: err });
                            } else {
                                if (!doc) {
                                    //no such user, just register it
                                    const user = User({ name, username, email, password, school });

                                    user.save((err, doc) => {
                                        if (err) {
                                            res.status(500).json({ response: 2, message: err });
                                        } else {
                                            res.status(200).json({ response: 1, message: "Kayıt Başarılı." });
                                        }
                                    });
                                } else {
                                    //usrname
                                    res.status(500).json({ response: 2, message: "Bu kullanıcı kullanıcı adı daha önce alınmış." });
                                }

                            }

                        });
                    } else {
                        //there is a user which is took the username or email before
                        res.status(500).json({ response: 2, message: "Bu kullanıcı mail adresi daha önce alınmış." });
                    }
                }
            });
        }

    } catch (e) {
        res.status(502).json({ response: 2, message: e });
    }

});

module.exports = router;