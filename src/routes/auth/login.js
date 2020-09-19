const product = require('../schemes/test')
const router = require('express').Router();
const User = require('../../schema/user/user');

router.get('/', (req, res) => {
    
    User.find({}, (err, doc) => {
        if(err) throw Error;
        console.log(err);
        res.send(doc);
    });







    
});


module.exports = router;