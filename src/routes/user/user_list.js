const product = require('../schemes/test')
const router = require('express').Router();
const User = require('../../schema/user/test');

router.get('/', (req, res) => {


    User.find({}, (err, doc) => {

        if(err) console.log(err);
        res.send({
            doc: doc
        });
    })


    
});


module.exports = router;